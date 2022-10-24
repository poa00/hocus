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
import type { RateLimiter } from './RateLimiter';
import {
    RateLimiterFromJSON,
    RateLimiterFromJSONTyped,
    RateLimiterToJSON,
} from './RateLimiter';

/**
 * Defines a partial network interface structure, used to update the rate limiters for that interface, after microvm start.
 * @export
 * @interface PartialNetworkInterface
 */
export interface PartialNetworkInterface {
    /**
     * 
     * @type {string}
     * @memberof PartialNetworkInterface
     */
    ifaceId: string;
    /**
     * 
     * @type {RateLimiter}
     * @memberof PartialNetworkInterface
     */
    rxRateLimiter?: RateLimiter;
    /**
     * 
     * @type {RateLimiter}
     * @memberof PartialNetworkInterface
     */
    txRateLimiter?: RateLimiter;
}

/**
 * Check if a given object implements the PartialNetworkInterface interface.
 */
export function instanceOfPartialNetworkInterface(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "ifaceId" in value;

    return isInstance;
}

export function PartialNetworkInterfaceFromJSON(json: any): PartialNetworkInterface {
    return PartialNetworkInterfaceFromJSONTyped(json, false);
}

export function PartialNetworkInterfaceFromJSONTyped(json: any, ignoreDiscriminator: boolean): PartialNetworkInterface {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'ifaceId': json['iface_id'],
        'rxRateLimiter': !exists(json, 'rx_rate_limiter') ? undefined : RateLimiterFromJSON(json['rx_rate_limiter']),
        'txRateLimiter': !exists(json, 'tx_rate_limiter') ? undefined : RateLimiterFromJSON(json['tx_rate_limiter']),
    };
}

export function PartialNetworkInterfaceToJSON(value?: PartialNetworkInterface | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'iface_id': value.ifaceId,
        'rx_rate_limiter': RateLimiterToJSON(value.rxRateLimiter),
        'tx_rate_limiter': RateLimiterToJSON(value.txRateLimiter),
    };
}

