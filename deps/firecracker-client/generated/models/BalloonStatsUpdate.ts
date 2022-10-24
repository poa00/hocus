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
/**
 * Update the statistics polling interval, with the first statistics update scheduled immediately. Statistics cannot be turned on/off after boot.
 * @export
 * @interface BalloonStatsUpdate
 */
export interface BalloonStatsUpdate {
    /**
     * Interval in seconds between refreshing statistics.
     * @type {number}
     * @memberof BalloonStatsUpdate
     */
    statsPollingIntervalS: number;
}

/**
 * Check if a given object implements the BalloonStatsUpdate interface.
 */
export function instanceOfBalloonStatsUpdate(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "statsPollingIntervalS" in value;

    return isInstance;
}

export function BalloonStatsUpdateFromJSON(json: any): BalloonStatsUpdate {
    return BalloonStatsUpdateFromJSONTyped(json, false);
}

export function BalloonStatsUpdateFromJSONTyped(json: any, ignoreDiscriminator: boolean): BalloonStatsUpdate {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'statsPollingIntervalS': json['stats_polling_interval_s'],
    };
}

export function BalloonStatsUpdateToJSON(value?: BalloonStatsUpdate | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'stats_polling_interval_s': value.statsPollingIntervalS,
    };
}

