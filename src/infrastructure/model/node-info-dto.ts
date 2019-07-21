// tslint:disable
/// <reference path="../custom.d.ts" />
/**
 * Catapult REST Endpoints
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 0.7.16
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import { RolesTypeEnum } from './roles-type-enum';

/**
 * 
 * @export
 * @interface NodeInfoDTO
 */
export interface NodeInfoDTO {
    /**
     * The public key used to identify the node.
     * @type {string}
     * @memberof NodeInfoDTO
     */
    publicKey: string;
    /**
     * The port used for the communication.
     * @type {number}
     * @memberof NodeInfoDTO
     */
    port: number;
    /**
     * 
     * @type {number}
     * @memberof NodeInfoDTO
     */
    networkIdentifier: number;
    /**
     * The version of the application.
     * @type {number}
     * @memberof NodeInfoDTO
     */
    version: number;
    /**
     * 
     * @type {RolesTypeEnum}
     * @memberof NodeInfoDTO
     */
    roles: RolesTypeEnum;
    /**
     * The IP address of the endpoint.
     * @type {string}
     * @memberof NodeInfoDTO
     */
    host: string;
    /**
     * The name of the node.
     * @type {string}
     * @memberof NodeInfoDTO
     */
    friendlyName: string;
}

