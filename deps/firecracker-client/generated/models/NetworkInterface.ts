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
 * Defines a network interface.
 * @export
 * @interface NetworkInterface
 */
export interface NetworkInterface {
    /**
     * 
     * @type {string}
     * @memberof NetworkInterface
     */
    guestMac?: string;
    /**
     * Host level path for the guest network interface
     * @type {string}
     * @memberof NetworkInterface
     */
    hostDevName: string;
    /**
     * 
     * @type {string}
     * @memberof NetworkInterface
     */
    ifaceId: string;
    /**
     * 
     * @type {RateLimiter}
     * @memberof NetworkInterface
     */
    rxRateLimiter?: RateLimiter;
    /**
     * 
     * @type {RateLimiter}
     * @memberof NetworkInterface
     */
    txRateLimiter?: RateLimiter;
}

/**
 * Check if a given object implements the NetworkInterface interface.
 */
export function instanceOfNetworkInterface(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "hostDevName" in value;
    isInstance = isInstance && "ifaceId" in value;

    return isInstance;
}

export function NetworkInterfaceFromJSON(json: any): NetworkInterface {
    return NetworkInterfaceFromJSONTyped(json, false);
}

export function NetworkInterfaceFromJSONTyped(json: any, ignoreDiscriminator: boolean): NetworkInterface {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'guestMac': !exists(json, 'guest_mac') ? undefined : json['guest_mac'],
        'hostDevName': json['host_dev_name'],
        'ifaceId': json['iface_id'],
        'rxRateLimiter': !exists(json, 'rx_rate_limiter') ? undefined : RateLimiterFromJSON(json['rx_rate_limiter']),
        'txRateLimiter': !exists(json, 'tx_rate_limiter') ? undefined : RateLimiterFromJSON(json['tx_rate_limiter']),
    };
}

export function NetworkInterfaceToJSON(value?: NetworkInterface | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'guest_mac': value.guestMac,
        'host_dev_name': value.hostDevName,
        'iface_id': value.ifaceId,
        'rx_rate_limiter': RateLimiterToJSON(value.rxRateLimiter),
        'tx_rate_limiter': RateLimiterToJSON(value.txRateLimiter),
    };
}

