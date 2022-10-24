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
 * Balloon device descriptor.
 * @export
 * @interface BalloonUpdate
 */
export interface BalloonUpdate {
    /**
     * Target balloon size in MiB.
     * @type {number}
     * @memberof BalloonUpdate
     */
    amountMib: number;
}
/**
 * Check if a given object implements the BalloonUpdate interface.
 */
export declare function instanceOfBalloonUpdate(value: object): boolean;
export declare function BalloonUpdateFromJSON(json: any): BalloonUpdate;
export declare function BalloonUpdateFromJSONTyped(json: any, ignoreDiscriminator: boolean): BalloonUpdate;
export declare function BalloonUpdateToJSON(value?: BalloonUpdate | null): any;
