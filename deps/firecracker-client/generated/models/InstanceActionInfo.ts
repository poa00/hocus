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
 * Variant wrapper containing the real action.
 * @export
 * @interface InstanceActionInfo
 */
export interface InstanceActionInfo {
    /**
     * Enumeration indicating what type of action is contained in the payload
     * @type {string}
     * @memberof InstanceActionInfo
     */
    actionType: InstanceActionInfoActionTypeEnum;
}


/**
 * @export
 */
export const InstanceActionInfoActionTypeEnum = {
    FlushMetrics: 'FlushMetrics',
    InstanceStart: 'InstanceStart',
    SendCtrlAltDel: 'SendCtrlAltDel'
} as const;
export type InstanceActionInfoActionTypeEnum = typeof InstanceActionInfoActionTypeEnum[keyof typeof InstanceActionInfoActionTypeEnum];


/**
 * Check if a given object implements the InstanceActionInfo interface.
 */
export function instanceOfInstanceActionInfo(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "actionType" in value;

    return isInstance;
}

export function InstanceActionInfoFromJSON(json: any): InstanceActionInfo {
    return InstanceActionInfoFromJSONTyped(json, false);
}

export function InstanceActionInfoFromJSONTyped(json: any, ignoreDiscriminator: boolean): InstanceActionInfo {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'actionType': json['action_type'],
    };
}

export function InstanceActionInfoToJSON(value?: InstanceActionInfo | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'action_type': value.actionType,
    };
}

