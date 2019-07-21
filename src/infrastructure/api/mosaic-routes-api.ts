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


import * as globalImportUrl from 'url';
import globalAxios, { AxiosPromise, AxiosInstance } from 'axios';
import { Configuration } from '../configuration';
import { BASE_PATH, COLLECTION_FORMATS, RequestArgs, BaseAPI, RequiredError } from '../base';

import { MosaicIds } from '../model';
import { MosaicInfoDTO } from '../model';
import { MosaicNamesDTO } from '../model';
/**
 * MosaicRoutesApi - axios parameter creator
 * @export
 */
export const MosaicRoutesApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * Gets the mosaic definition for a given mosaicId.
         * @summary Get mosaic information
         * @param {string} mosaicId The mosaic identifier.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getMosaic(mosaicId: string, options: any = {}): RequestArgs {
            // verify required parameter 'mosaicId' is not null or undefined
            if (mosaicId === null || mosaicId === undefined) {
                throw new RequiredError('mosaicId','Required parameter mosaicId was null or undefined when calling getMosaic.');
            }
            const localVarPath = `/mosaic/{mosaicId}`
                .replace(`{${"mosaicId"}}`, encodeURIComponent(String(mosaicId)));
            const localVarUrlObj = globalImportUrl.parse(localVarPath, true);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


                localVarUrlObj.query = {...localVarUrlObj.query, ...localVarQueryParameter, ...options.query};
            // fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
            delete localVarUrlObj.search;
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...options.headers};

            return {
                url: globalImportUrl.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Gets an array of mosaic definition.
         * @summary Get mosaics information for an array of mosaics
         * @param {MosaicIds} mosaicIds 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getMosaics(mosaicIds: MosaicIds, options: any = {}): RequestArgs {
            // verify required parameter 'mosaicIds' is not null or undefined
            if (mosaicIds === null || mosaicIds === undefined) {
                throw new RequiredError('mosaicIds','Required parameter mosaicIds was null or undefined when calling getMosaics.');
            }
            const localVarPath = `/mosaic`;
            const localVarUrlObj = globalImportUrl.parse(localVarPath, true);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


                localVarHeaderParameter['Content-Type'] = 'application/json';

            localVarUrlObj.query = {...localVarUrlObj.query, ...localVarQueryParameter, ...options.query};
            // fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
            delete localVarUrlObj.search;
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...options.headers};
            const needsSerialization = (<any>"MosaicIds" !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
            localVarRequestOptions.data =  needsSerialization ? JSON.stringify(mosaicIds !== undefined ? mosaicIds : {}) : (mosaicIds || "");

            return {
                url: globalImportUrl.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Returns friendly names for mosaics.
         * @summary Get readable names for a set of mosaics
         * @param {MosaicIds} mosaicIds 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getMosaicsNames(mosaicIds: MosaicIds, options: any = {}): RequestArgs {
            // verify required parameter 'mosaicIds' is not null or undefined
            if (mosaicIds === null || mosaicIds === undefined) {
                throw new RequiredError('mosaicIds','Required parameter mosaicIds was null or undefined when calling getMosaicsNames.');
            }
            const localVarPath = `/mosaic/names`;
            const localVarUrlObj = globalImportUrl.parse(localVarPath, true);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


                localVarHeaderParameter['Content-Type'] = 'application/json';

            localVarUrlObj.query = {...localVarUrlObj.query, ...localVarQueryParameter, ...options.query};
            // fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
            delete localVarUrlObj.search;
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...options.headers};
            const needsSerialization = (<any>"MosaicIds" !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
            localVarRequestOptions.data =  needsSerialization ? JSON.stringify(mosaicIds !== undefined ? mosaicIds : {}) : (mosaicIds || "");

            return {
                url: globalImportUrl.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * MosaicRoutesApi - functional programming interface
 * @export
 */
export const MosaicRoutesApiFp = function(configuration?: Configuration) {
    return {
        /**
         * Gets the mosaic definition for a given mosaicId.
         * @summary Get mosaic information
         * @param {string} mosaicId The mosaic identifier.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getMosaic(mosaicId: string, options?: any): (axios?: AxiosInstance, basePath?: string) => AxiosPromise<MosaicInfoDTO> {
            const localVarAxiosArgs = MosaicRoutesApiAxiosParamCreator(configuration).getMosaic(mosaicId, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * Gets an array of mosaic definition.
         * @summary Get mosaics information for an array of mosaics
         * @param {MosaicIds} mosaicIds 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getMosaics(mosaicIds: MosaicIds, options?: any): (axios?: AxiosInstance, basePath?: string) => AxiosPromise<Array<MosaicInfoDTO>> {
            const localVarAxiosArgs = MosaicRoutesApiAxiosParamCreator(configuration).getMosaics(mosaicIds, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * Returns friendly names for mosaics.
         * @summary Get readable names for a set of mosaics
         * @param {MosaicIds} mosaicIds 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getMosaicsNames(mosaicIds: MosaicIds, options?: any): (axios?: AxiosInstance, basePath?: string) => AxiosPromise<Array<MosaicNamesDTO>> {
            const localVarAxiosArgs = MosaicRoutesApiAxiosParamCreator(configuration).getMosaicsNames(mosaicIds, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
    }
};

/**
 * MosaicRoutesApi - factory interface
 * @export
 */
export const MosaicRoutesApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    return {
        /**
         * Gets the mosaic definition for a given mosaicId.
         * @summary Get mosaic information
         * @param {string} mosaicId The mosaic identifier.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getMosaic(mosaicId: string, options?: any) {
            return MosaicRoutesApiFp(configuration).getMosaic(mosaicId, options)(axios, basePath);
        },
        /**
         * Gets an array of mosaic definition.
         * @summary Get mosaics information for an array of mosaics
         * @param {MosaicIds} mosaicIds 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getMosaics(mosaicIds: MosaicIds, options?: any) {
            return MosaicRoutesApiFp(configuration).getMosaics(mosaicIds, options)(axios, basePath);
        },
        /**
         * Returns friendly names for mosaics.
         * @summary Get readable names for a set of mosaics
         * @param {MosaicIds} mosaicIds 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getMosaicsNames(mosaicIds: MosaicIds, options?: any) {
            return MosaicRoutesApiFp(configuration).getMosaicsNames(mosaicIds, options)(axios, basePath);
        },
    };
};

/**
 * MosaicRoutesApi - object-oriented interface
 * @export
 * @class MosaicRoutesApi
 * @extends {BaseAPI}
 */
export class MosaicRoutesApi extends BaseAPI {
    /**
     * Gets the mosaic definition for a given mosaicId.
     * @summary Get mosaic information
     * @param {string} mosaicId The mosaic identifier.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof MosaicRoutesApi
     */
    public getMosaic(mosaicId: string, options?: any) {
        return MosaicRoutesApiFp(this.configuration).getMosaic(mosaicId, options)(this.axios, this.basePath);
    }

    /**
     * Gets an array of mosaic definition.
     * @summary Get mosaics information for an array of mosaics
     * @param {MosaicIds} mosaicIds 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof MosaicRoutesApi
     */
    public getMosaics(mosaicIds: MosaicIds, options?: any) {
        return MosaicRoutesApiFp(this.configuration).getMosaics(mosaicIds, options)(this.axios, this.basePath);
    }

    /**
     * Returns friendly names for mosaics.
     * @summary Get readable names for a set of mosaics
     * @param {MosaicIds} mosaicIds 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof MosaicRoutesApi
     */
    public getMosaicsNames(mosaicIds: MosaicIds, options?: any) {
        return MosaicRoutesApiFp(this.configuration).getMosaicsNames(mosaicIds, options)(this.axios, this.basePath);
    }

}
