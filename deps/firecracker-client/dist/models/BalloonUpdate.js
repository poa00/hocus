"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.BalloonUpdateToJSON = exports.BalloonUpdateFromJSONTyped = exports.BalloonUpdateFromJSON = exports.instanceOfBalloonUpdate = void 0;
/**
 * Check if a given object implements the BalloonUpdate interface.
 */
function instanceOfBalloonUpdate(value) {
    let isInstance = true;
    isInstance = isInstance && "amountMib" in value;
    return isInstance;
}
exports.instanceOfBalloonUpdate = instanceOfBalloonUpdate;
function BalloonUpdateFromJSON(json) {
    return BalloonUpdateFromJSONTyped(json, false);
}
exports.BalloonUpdateFromJSON = BalloonUpdateFromJSON;
function BalloonUpdateFromJSONTyped(json, ignoreDiscriminator) {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        'amountMib': json['amount_mib'],
    };
}
exports.BalloonUpdateFromJSONTyped = BalloonUpdateFromJSONTyped;
function BalloonUpdateToJSON(value) {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        'amount_mib': value.amountMib,
    };
}
exports.BalloonUpdateToJSON = BalloonUpdateToJSON;
