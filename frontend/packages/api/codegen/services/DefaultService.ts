/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class DefaultService {

    /**
     * @throws ApiError
     */
    public static optionsSwaggerJson(): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'OPTIONS',
            url: '/swagger.json',
        });
    }

    /**
     * @throws ApiError
     */
    public static optionsOpenapiJson(): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'OPTIONS',
            url: '/openapi.json',
        });
    }

    /**
     * get project-state.schema
     * @returns any
     * @throws ApiError
     */
    public static getProjectStateSchema(): CancelablePromise<{
        schema?: {
            jsonSchema: any;
            uiSchema: any;
        };
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/project-state/schema',
        });
    }

    /**
     * set project-state.schema
     * @param requestBody
     * @returns any
     * @throws ApiError
     */
    public static postProjectStateSchema(
        requestBody?: {
            schema: {
                jsonSchema: any;
                uiSchema: any;
            };
        },
    ): CancelablePromise<{
        result: 'ok';
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/project-state/schema',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @throws ApiError
     */
    public static optionsProjectStateSchema(): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'OPTIONS',
            url: '/project-state/schema',
        });
    }

    /**
     * get project-state.keys
     * @returns any
     * @throws ApiError
     */
    public static getProjectStateKeys(): CancelablePromise<{
        keys?: {
            pubKeys: Array<string>;
        };
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/project-state/keys',
        });
    }

    /**
     * set project-state.keys
     * @param requestBody
     * @returns any
     * @throws ApiError
     */
    public static postProjectStateKeys(
        requestBody?: {
            keys: {
                pubKeys: Array<string>;
            };
        },
    ): CancelablePromise<{
        result: 'ok';
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/project-state/keys',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @throws ApiError
     */
    public static optionsProjectStateKeys(): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'OPTIONS',
            url: '/project-state/keys',
        });
    }

    /**
     * get project-state.cryptedData
     * @returns any
     * @throws ApiError
     */
    public static getProjectStateCryptedData(): CancelablePromise<{
        cryptedData?: Array<{
            data: string;
            uuid: string;
            keyId: string;
            armoredPublicKey: string;
        }>;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/project-state/cryptedData',
        });
    }

    /**
     * add project-state.cryptedData
     * @param requestBody
     * @returns any
     * @throws ApiError
     */
    public static postProjectStateCryptedData(
        requestBody?: {
            cryptedDatum: {
                data: string;
                uuid: string;
                keyId: string;
                armoredPublicKey: string;
            };
        },
    ): CancelablePromise<{
        result: 'ok';
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/project-state/cryptedData',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @throws ApiError
     */
    public static optionsProjectStateCryptedData(): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'OPTIONS',
            url: '/project-state/cryptedData',
        });
    }

}
