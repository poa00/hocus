/* tslint:disable */
/* eslint-disable */
/**
 * Firecracker API
 * RESTful public-facing API. The API is accessible through HTTP calls on specific URLs carrying JSON modeled data. The transport medium is a Unix Domain Socket.
 *
 * The version of the OpenAPI document: 1.1.2
 * Contact: compute-capsule@amazon.com
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
import type { MemoryBackend } from './MemoryBackend';
import {
    MemoryBackendFromJSON,
    MemoryBackendFromJSONTyped,
    MemoryBackendToJSON,
} from './MemoryBackend';

/**
 * Defines the configuration used for handling snapshot resume. Exactly one of the two `mem_*` fields must be present in the body of the request.
 * @export
 * @interface SnapshotLoadParams
 */
export interface SnapshotLoadParams {
    /**
     * Enable support for incremental (diff) snapshots by tracking dirty guest pages.
     * @type {boolean}
     * @memberof SnapshotLoadParams
     */
    enableDiffSnapshots?: boolean;
    /**
     * Path to the file that contains the guest memory to be loaded. This parameter has been deprecated and is only allowed if `mem_backend` is not present.
     * @type {string}
     * @memberof SnapshotLoadParams
     */
    memFilePath?: string;
    /**
     * 
     * @type {MemoryBackend}
     * @memberof SnapshotLoadParams
     */
    memBackend?: MemoryBackend;
    /**
     * Path to the file that contains the microVM state to be loaded.
     * @type {string}
     * @memberof SnapshotLoadParams
     */
    snapshotPath: string;
    /**
     * When set to true, the vm is also resumed if the snapshot load is successful.
     * @type {boolean}
     * @memberof SnapshotLoadParams
     */
    resumeVm?: boolean;
}

/**
 * Check if a given object implements the SnapshotLoadParams interface.
 */
export function instanceOfSnapshotLoadParams(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "snapshotPath" in value;

    return isInstance;
}

export function SnapshotLoadParamsFromJSON(json: any): SnapshotLoadParams {
    return SnapshotLoadParamsFromJSONTyped(json, false);
}

export function SnapshotLoadParamsFromJSONTyped(json: any, ignoreDiscriminator: boolean): SnapshotLoadParams {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'enableDiffSnapshots': !exists(json, 'enable_diff_snapshots') ? undefined : json['enable_diff_snapshots'],
        'memFilePath': !exists(json, 'mem_file_path') ? undefined : json['mem_file_path'],
        'memBackend': !exists(json, 'mem_backend') ? undefined : MemoryBackendFromJSON(json['mem_backend']),
        'snapshotPath': json['snapshot_path'],
        'resumeVm': !exists(json, 'resume_vm') ? undefined : json['resume_vm'],
    };
}

export function SnapshotLoadParamsToJSON(value?: SnapshotLoadParams | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'enable_diff_snapshots': value.enableDiffSnapshots,
        'mem_file_path': value.memFilePath,
        'mem_backend': MemoryBackendToJSON(value.memBackend),
        'snapshot_path': value.snapshotPath,
        'resume_vm': value.resumeVm,
    };
}

