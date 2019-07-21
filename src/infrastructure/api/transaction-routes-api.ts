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

import { AnnounceTransactionInfoDTO } from '../model';
import { Cosignature } from '../model';
import { TransactionHashes } from '../model';
import { TransactionIds } from '../model';
import { TransactionInfoDTO } from '../model';
import { TransactionPayload } from '../model';
import { TransactionStatusDTO } from '../model';
/**
 * TransactionRoutesApi - axios parameter creator
 * @export
 */
export const TransactionRoutesApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * Announces a cosignature transaction to the network.
         * @summary Announce a cosignature transaction
         * @param {Cosignature} cosignature 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        announceCosignatureTransaction(cosignature: Cosignature, options: any = {}): RequestArgs {
            // verify required parameter 'cosignature' is not null or undefined
            if (cosignature === null || cosignature === undefined) {
                throw new RequiredError('cosignature','Required parameter cosignature was null or undefined when calling announceCosignatureTransaction.');
            }
            const localVarPath = `/transaction/cosignature`;
            const localVarUrlObj = globalImportUrl.parse(localVarPath, true);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: 'PUT', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


                localVarHeaderParameter['Content-Type'] = 'application/json';

            localVarUrlObj.query = {...localVarUrlObj.query, ...localVarQueryParameter, ...options.query};
            // fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
            delete localVarUrlObj.search;
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...options.headers};
            const needsSerialization = (<any>"Cosignature" !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
            localVarRequestOptions.data =  needsSerialization ? JSON.stringify(cosignature !== undefined ? cosignature : {}) : (cosignature || "");

            return {
                url: globalImportUrl.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Announces an aggregate bonded transaction to the network.
         * @summary Announce an aggregate bonded transaction
         * @param {TransactionPayload} transactionPayload 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        announcePartialTransaction(transactionPayload: TransactionPayload, options: any = {}): RequestArgs {
            // verify required parameter 'transactionPayload' is not null or undefined
            if (transactionPayload === null || transactionPayload === undefined) {
                throw new RequiredError('transactionPayload','Required parameter transactionPayload was null or undefined when calling announcePartialTransaction.');
            }
            const localVarPath = `/transaction/partial`;
            const localVarUrlObj = globalImportUrl.parse(localVarPath, true);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: 'PUT', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


                localVarHeaderParameter['Content-Type'] = 'application/json';

            localVarUrlObj.query = {...localVarUrlObj.query, ...localVarQueryParameter, ...options.query};
            // fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
            delete localVarUrlObj.search;
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...options.headers};
            const needsSerialization = (<any>"TransactionPayload" !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
            localVarRequestOptions.data =  needsSerialization ? JSON.stringify(transactionPayload !== undefined ? transactionPayload : {}) : (transactionPayload || "");

            return {
                url: globalImportUrl.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Announces a transaction to the network. It is recommended to use the NEM2-SDK to announce transactions as they should be serialized. 
         * @summary Announce a new transaction
         * @param {TransactionPayload} transactionPayload 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        announceTransaction(transactionPayload: TransactionPayload, options: any = {}): RequestArgs {
            // verify required parameter 'transactionPayload' is not null or undefined
            if (transactionPayload === null || transactionPayload === undefined) {
                throw new RequiredError('transactionPayload','Required parameter transactionPayload was null or undefined when calling announceTransaction.');
            }
            const localVarPath = `/transaction`;
            const localVarUrlObj = globalImportUrl.parse(localVarPath, true);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: 'PUT', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


                localVarHeaderParameter['Content-Type'] = 'application/json';

            localVarUrlObj.query = {...localVarUrlObj.query, ...localVarQueryParameter, ...options.query};
            // fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
            delete localVarUrlObj.search;
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...options.headers};
            const needsSerialization = (<any>"TransactionPayload" !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
            localVarRequestOptions.data =  needsSerialization ? JSON.stringify(transactionPayload !== undefined ? transactionPayload : {}) : (transactionPayload || "");

            return {
                url: globalImportUrl.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Returns transaction information given a transactionId or hash.
         * @summary Get transaction information
         * @param {string} transactionId The transaction id or hash.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getTransaction(transactionId: string, options: any = {}): RequestArgs {
            // verify required parameter 'transactionId' is not null or undefined
            if (transactionId === null || transactionId === undefined) {
                throw new RequiredError('transactionId','Required parameter transactionId was null or undefined when calling getTransaction.');
            }
            const localVarPath = `/transaction/{transactionId}`
                .replace(`{${"transactionId"}}`, encodeURIComponent(String(transactionId)));
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
         * Returns the transaction status for a given hash.
         * @summary Get transaction status
         * @param {string} hash The transaction hash.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getTransactionStatus(hash: string, options: any = {}): RequestArgs {
            // verify required parameter 'hash' is not null or undefined
            if (hash === null || hash === undefined) {
                throw new RequiredError('hash','Required parameter hash was null or undefined when calling getTransactionStatus.');
            }
            const localVarPath = `/transaction/{hash}/status`
                .replace(`{${"hash"}}`, encodeURIComponent(String(hash)));
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
         * Returns transactions information for a given array of transactionIds.
         * @summary Get transactions information
         * @param {TransactionIds} transactionIds 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getTransactions(transactionIds: TransactionIds, options: any = {}): RequestArgs {
            // verify required parameter 'transactionIds' is not null or undefined
            if (transactionIds === null || transactionIds === undefined) {
                throw new RequiredError('transactionIds','Required parameter transactionIds was null or undefined when calling getTransactions.');
            }
            const localVarPath = `/transaction`;
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
            const needsSerialization = (<any>"TransactionIds" !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
            localVarRequestOptions.data =  needsSerialization ? JSON.stringify(transactionIds !== undefined ? transactionIds : {}) : (transactionIds || "");

            return {
                url: globalImportUrl.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Returns an array of transaction statuses for a given array of transaction hashes.
         * @summary Get transactions status.
         * @param {TransactionHashes} transactionHashes 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getTransactionsStatuses(transactionHashes: TransactionHashes, options: any = {}): RequestArgs {
            // verify required parameter 'transactionHashes' is not null or undefined
            if (transactionHashes === null || transactionHashes === undefined) {
                throw new RequiredError('transactionHashes','Required parameter transactionHashes was null or undefined when calling getTransactionsStatuses.');
            }
            const localVarPath = `/transaction/statuses`;
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
            const needsSerialization = (<any>"TransactionHashes" !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
            localVarRequestOptions.data =  needsSerialization ? JSON.stringify(transactionHashes !== undefined ? transactionHashes : {}) : (transactionHashes || "");

            return {
                url: globalImportUrl.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * TransactionRoutesApi - functional programming interface
 * @export
 */
export const TransactionRoutesApiFp = function(configuration?: Configuration) {
    return {
        /**
         * Announces a cosignature transaction to the network.
         * @summary Announce a cosignature transaction
         * @param {Cosignature} cosignature 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        announceCosignatureTransaction(cosignature: Cosignature, options?: any): (axios?: AxiosInstance, basePath?: string) => AxiosPromise<AnnounceTransactionInfoDTO> {
            const localVarAxiosArgs = TransactionRoutesApiAxiosParamCreator(configuration).announceCosignatureTransaction(cosignature, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * Announces an aggregate bonded transaction to the network.
         * @summary Announce an aggregate bonded transaction
         * @param {TransactionPayload} transactionPayload 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        announcePartialTransaction(transactionPayload: TransactionPayload, options?: any): (axios?: AxiosInstance, basePath?: string) => AxiosPromise<AnnounceTransactionInfoDTO> {
            const localVarAxiosArgs = TransactionRoutesApiAxiosParamCreator(configuration).announcePartialTransaction(transactionPayload, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * Announces a transaction to the network. It is recommended to use the NEM2-SDK to announce transactions as they should be serialized. 
         * @summary Announce a new transaction
         * @param {TransactionPayload} transactionPayload 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        announceTransaction(transactionPayload: TransactionPayload, options?: any): (axios?: AxiosInstance, basePath?: string) => AxiosPromise<AnnounceTransactionInfoDTO> {
            const localVarAxiosArgs = TransactionRoutesApiAxiosParamCreator(configuration).announceTransaction(transactionPayload, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * Returns transaction information given a transactionId or hash.
         * @summary Get transaction information
         * @param {string} transactionId The transaction id or hash.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getTransaction(transactionId: string, options?: any): (axios?: AxiosInstance, basePath?: string) => AxiosPromise<TransactionInfoDTO> {
            const localVarAxiosArgs = TransactionRoutesApiAxiosParamCreator(configuration).getTransaction(transactionId, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * Returns the transaction status for a given hash.
         * @summary Get transaction status
         * @param {string} hash The transaction hash.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getTransactionStatus(hash: string, options?: any): (axios?: AxiosInstance, basePath?: string) => AxiosPromise<TransactionStatusDTO> {
            const localVarAxiosArgs = TransactionRoutesApiAxiosParamCreator(configuration).getTransactionStatus(hash, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * Returns transactions information for a given array of transactionIds.
         * @summary Get transactions information
         * @param {TransactionIds} transactionIds 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getTransactions(transactionIds: TransactionIds, options?: any): (axios?: AxiosInstance, basePath?: string) => AxiosPromise<Array<TransactionInfoDTO>> {
            const localVarAxiosArgs = TransactionRoutesApiAxiosParamCreator(configuration).getTransactions(transactionIds, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * Returns an array of transaction statuses for a given array of transaction hashes.
         * @summary Get transactions status.
         * @param {TransactionHashes} transactionHashes 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getTransactionsStatuses(transactionHashes: TransactionHashes, options?: any): (axios?: AxiosInstance, basePath?: string) => AxiosPromise<Array<TransactionStatusDTO>> {
            const localVarAxiosArgs = TransactionRoutesApiAxiosParamCreator(configuration).getTransactionsStatuses(transactionHashes, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
    }
};

/**
 * TransactionRoutesApi - factory interface
 * @export
 */
export const TransactionRoutesApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    return {
        /**
         * Announces a cosignature transaction to the network.
         * @summary Announce a cosignature transaction
         * @param {Cosignature} cosignature 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        announceCosignatureTransaction(cosignature: Cosignature, options?: any) {
            return TransactionRoutesApiFp(configuration).announceCosignatureTransaction(cosignature, options)(axios, basePath);
        },
        /**
         * Announces an aggregate bonded transaction to the network.
         * @summary Announce an aggregate bonded transaction
         * @param {TransactionPayload} transactionPayload 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        announcePartialTransaction(transactionPayload: TransactionPayload, options?: any) {
            return TransactionRoutesApiFp(configuration).announcePartialTransaction(transactionPayload, options)(axios, basePath);
        },
        /**
         * Announces a transaction to the network. It is recommended to use the NEM2-SDK to announce transactions as they should be serialized. 
         * @summary Announce a new transaction
         * @param {TransactionPayload} transactionPayload 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        announceTransaction(transactionPayload: TransactionPayload, options?: any) {
            return TransactionRoutesApiFp(configuration).announceTransaction(transactionPayload, options)(axios, basePath);
        },
        /**
         * Returns transaction information given a transactionId or hash.
         * @summary Get transaction information
         * @param {string} transactionId The transaction id or hash.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getTransaction(transactionId: string, options?: any) {
            return TransactionRoutesApiFp(configuration).getTransaction(transactionId, options)(axios, basePath);
        },
        /**
         * Returns the transaction status for a given hash.
         * @summary Get transaction status
         * @param {string} hash The transaction hash.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getTransactionStatus(hash: string, options?: any) {
            return TransactionRoutesApiFp(configuration).getTransactionStatus(hash, options)(axios, basePath);
        },
        /**
         * Returns transactions information for a given array of transactionIds.
         * @summary Get transactions information
         * @param {TransactionIds} transactionIds 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getTransactions(transactionIds: TransactionIds, options?: any) {
            return TransactionRoutesApiFp(configuration).getTransactions(transactionIds, options)(axios, basePath);
        },
        /**
         * Returns an array of transaction statuses for a given array of transaction hashes.
         * @summary Get transactions status.
         * @param {TransactionHashes} transactionHashes 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getTransactionsStatuses(transactionHashes: TransactionHashes, options?: any) {
            return TransactionRoutesApiFp(configuration).getTransactionsStatuses(transactionHashes, options)(axios, basePath);
        },
    };
};

/**
 * TransactionRoutesApi - object-oriented interface
 * @export
 * @class TransactionRoutesApi
 * @extends {BaseAPI}
 */
export class TransactionRoutesApi extends BaseAPI {
    /**
     * Announces a cosignature transaction to the network.
     * @summary Announce a cosignature transaction
     * @param {Cosignature} cosignature 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof TransactionRoutesApi
     */
    public announceCosignatureTransaction(cosignature: Cosignature, options?: any) {
        return TransactionRoutesApiFp(this.configuration).announceCosignatureTransaction(cosignature, options)(this.axios, this.basePath);
    }

    /**
     * Announces an aggregate bonded transaction to the network.
     * @summary Announce an aggregate bonded transaction
     * @param {TransactionPayload} transactionPayload 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof TransactionRoutesApi
     */
    public announcePartialTransaction(transactionPayload: TransactionPayload, options?: any) {
        return TransactionRoutesApiFp(this.configuration).announcePartialTransaction(transactionPayload, options)(this.axios, this.basePath);
    }

    /**
     * Announces a transaction to the network. It is recommended to use the NEM2-SDK to announce transactions as they should be serialized. 
     * @summary Announce a new transaction
     * @param {TransactionPayload} transactionPayload 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof TransactionRoutesApi
     */
    public announceTransaction(transactionPayload: TransactionPayload, options?: any) {
        return TransactionRoutesApiFp(this.configuration).announceTransaction(transactionPayload, options)(this.axios, this.basePath);
    }

    /**
     * Returns transaction information given a transactionId or hash.
     * @summary Get transaction information
     * @param {string} transactionId The transaction id or hash.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof TransactionRoutesApi
     */
    public getTransaction(transactionId: string, options?: any) {
        return TransactionRoutesApiFp(this.configuration).getTransaction(transactionId, options)(this.axios, this.basePath);
    }

    /**
     * Returns the transaction status for a given hash.
     * @summary Get transaction status
     * @param {string} hash The transaction hash.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof TransactionRoutesApi
     */
    public getTransactionStatus(hash: string, options?: any) {
        return TransactionRoutesApiFp(this.configuration).getTransactionStatus(hash, options)(this.axios, this.basePath);
    }

    /**
     * Returns transactions information for a given array of transactionIds.
     * @summary Get transactions information
     * @param {TransactionIds} transactionIds 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof TransactionRoutesApi
     */
    public getTransactions(transactionIds: TransactionIds, options?: any) {
        return TransactionRoutesApiFp(this.configuration).getTransactions(transactionIds, options)(this.axios, this.basePath);
    }

    /**
     * Returns an array of transaction statuses for a given array of transaction hashes.
     * @summary Get transactions status.
     * @param {TransactionHashes} transactionHashes 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof TransactionRoutesApi
     */
    public getTransactionsStatuses(transactionHashes: TransactionHashes, options?: any) {
        return TransactionRoutesApiFp(this.configuration).getTransactionsStatuses(transactionHashes, options)(this.axios, this.basePath);
    }

}