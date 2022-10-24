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


/**
 * The CPU Template defines a set of flags to be disabled from the microvm so that the features exposed to the guest are the same as in the selected instance type. Works only on Intel.
 * @export
 */
export const CpuTemplate = {
    C3: 'C3',
    T2: 'T2',
    T2S: 'T2S',
    None: 'None'
} as const;
export type CpuTemplate = typeof CpuTemplate[keyof typeof CpuTemplate];


export function CpuTemplateFromJSON(json: any): CpuTemplate {
    return CpuTemplateFromJSONTyped(json, false);
}

export function CpuTemplateFromJSONTyped(json: any, ignoreDiscriminator: boolean): CpuTemplate {
    return json as CpuTemplate;
}

export function CpuTemplateToJSON(value?: CpuTemplate | null): any {
    return value as any;
}

