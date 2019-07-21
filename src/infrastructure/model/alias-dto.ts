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


import { AliasTypeEnum } from './alias-type-enum';

/**
 * 
 * @export
 * @interface AliasDTO
 */
export interface AliasDTO {
    /**
     * 
     * @type {AliasTypeEnum}
     * @memberof AliasDTO
     */
    type: AliasTypeEnum;
    /**
     * 
     * @type {Array<number>}
     * @memberof AliasDTO
     */
    mosaicId?: Array<number>;
    /**
     * The aliased address in hexadecimal.
     * @type {string}
     * @memberof AliasDTO
     */
    address?: string;
}


