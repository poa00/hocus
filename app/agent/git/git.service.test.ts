import type { Prisma } from "@prisma/client";
import { SshKeyPairType } from "@prisma/client";
import { DefaultLogger } from "@temporalio/worker";
import { provideDb } from "~/test-utils/db.server";
import { Token } from "~/token";

import { createAgentInjector } from "../agent-injector";
import { PRIVATE_SSH_KEY, PUBLIC_SSH_KEY, TESTS_REPO_URL } from "../test-constants";

import type { GitRemoteInfo } from "./git.service";

const provideInjector = (
  testFn: (args: { injector: ReturnType<typeof createAgentInjector> }) => Promise<void>,
): (() => Promise<void>) => {
  const injector = createAgentInjector({
    [Token.Logger]: function () {
      return new DefaultLogger("ERROR");
    } as unknown as any,
  });
  return async () => await testFn({ injector });
};

const provideInjectorAndDb = (
  testFn: (args: {
    injector: ReturnType<typeof createAgentInjector>;
    db: Prisma.NonTransactionClient;
  }) => Promise<void>,
): (() => Promise<void>) => {
  return provideInjector(({ injector }) => provideDb((db) => testFn({ injector, db }))());
};

test.concurrent(
  "getRemotes",
  provideInjector(async ({ injector }) => {
    const gitService = injector.resolve(Token.GitService);
    const remotesLinux = await gitService.getRemotes(
      "git@github.com:torvalds/linux.git",
      PRIVATE_SSH_KEY,
    );
    const linuxMaster = remotesLinux.find((r) => r.name === "refs/heads/master");
    expect(linuxMaster).toBeDefined();

    const remotes = await gitService.getRemotes(TESTS_REPO_URL, PRIVATE_SSH_KEY);
    const testRemote = remotes.find(
      (r) =>
        r.name === "refs/heads/git-service-test" &&
        r.hash === "6aa1af1afb061b67d22e6bcd8a1d8d5bbec64987",
    );
    expect(testRemote).toBeDefined();
  }),
);

test.concurrent(
  "findRemoteUpdates",
  provideInjector(async ({ injector }) => {
    const gitService = injector.resolve(Token.GitService);
    const remotes = [
      {
        name: "remote0",
        hash: "0",
      },
      {
        name: "remote1",
        hash: "1",
      },
      {
        name: "remote2",
        hash: "2",
      },
      {
        name: "remote3",
        hash: "3",
      },
    ];
    const oldRemotes: GitRemoteInfo[] = [0, 1, 3].map((i) => ({ ...remotes[i] }));
    const newRemotes: GitRemoteInfo[] = [1, 2, 3].map((i) => ({ ...remotes[i] }));
    newRemotes[0].hash = "1.1";
    const result = await gitService.findRemoteUpdates(oldRemotes, newRemotes);
    const expectedResult: typeof result = [
      {
        remoteInfo: remotes[0],
        state: "deleted",
      },
      {
        remoteInfo: newRemotes[0],
        state: "updated",
      },
      {
        remoteInfo: remotes[2],
        state: "new",
      },
    ];
    result.sort((a, b) => a.remoteInfo.name.localeCompare(b.remoteInfo.name));
    expect(result).toMatchObject(expectedResult);
  }),
);

test.concurrent(
  "createSshKeyPair, generateSshKeyPair, addGitRepository",
  provideInjectorAndDb(async ({ injector, db }) => {
    const gitService = injector.resolve(Token.GitService);
    const pair = await gitService.createSshKeyPair(
      db,
      PRIVATE_SSH_KEY,
      SshKeyPairType.SSH_KEY_PAIR_TYPE_SERVER_CONTROLLED,
    );
    expect(pair.publicKey).toEqual(PUBLIC_SSH_KEY);
    expect(pair.type).toEqual(SshKeyPairType.SSH_KEY_PAIR_TYPE_SERVER_CONTROLLED);
    const repo = await gitService.addGitRepository(db, TESTS_REPO_URL, pair.id);
    expect(repo.url).toEqual(TESTS_REPO_URL);
    expect(repo.sshKeyPairId).toEqual(pair.id);

    const pair2 = await gitService.generateSshKeyPair(
      db,
      SshKeyPairType.SSH_KEY_PAIR_TYPE_USER_SUPPLIED,
    );
    expect(pair2.publicKey).toBeDefined();
    expect(pair2.privateKey).toBeDefined();
    expect(pair2.type).toEqual(SshKeyPairType.SSH_KEY_PAIR_TYPE_USER_SUPPLIED);
  }),
);

test.concurrent(
  "getOrCreateServerControlledSshKeyPair",
  provideInjectorAndDb(async ({ injector, db }) => {
    const gitService = injector.resolve(Token.GitService);
    const tasks = new Array(25)
      .fill(0)
      .map(() => db.$transaction((tdb) => gitService.getOrCreateServerControlledSshKeyPair(tdb)));
    const keyPairs = await Promise.all(tasks);
    const keyPairId = keyPairs[0].id;
    expect(keyPairs.every((kp) => kp.id === keyPairId)).toBe(true);
  }),
);

test.concurrent(
  "updateBranches",
  provideInjectorAndDb(async ({ injector, db }) => {
    const gitService = injector.resolve(Token.GitService);
    const pair = await gitService.createSshKeyPair(
      db,
      PRIVATE_SSH_KEY,
      SshKeyPairType.SSH_KEY_PAIR_TYPE_SERVER_CONTROLLED,
    );
    const repo = await gitService.addGitRepository(db, TESTS_REPO_URL, pair.id);

    const { newGitBranches, updatedGitBranches } = await db.$transaction((tdb) =>
      gitService.updateBranches(tdb, repo.id),
    );
    expect(updatedGitBranches.length).toEqual(0);
    expect(newGitBranches.length).not.toEqual(0);
    const repo2 = await db.gitRepository.findUniqueOrThrow({
      where: { id: repo.id },
    });
    expect(repo2.lastBranchUpdateAt.getTime() > repo.lastBranchUpdateAt.getTime()).toBe(true);

    const mockRemotes = newGitBranches.map((b) => ({
      name: b.name,
      hash: b.gitObject.hash,
    }));
    const mockHash = "abc";
    mockRemotes[0].hash = mockHash;
    gitService.getRemotes = jest.fn().mockResolvedValue(mockRemotes);

    const { newGitBranches: newGitBranches2, updatedGitBranches: updatedGitBranches2 } =
      await db.$transaction((tdb) => gitService.updateBranches(tdb, repo.id));

    expect(updatedGitBranches2.length).toEqual(1);
    expect(newGitBranches2.length).toEqual(0);
    expect(updatedGitBranches2[0].gitObject.hash).toEqual(mockHash);

    const updatedGitBranch = await db.gitBranch.findUniqueOrThrow({
      where: {
        id: updatedGitBranches2[0].id,
      },
      include: {
        gitObject: true,
      },
    });
    expect(updatedGitBranch.gitObject.hash).toEqual(mockHash);
  }),
);
