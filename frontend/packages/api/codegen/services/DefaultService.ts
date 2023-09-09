/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class DefaultService {

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

}
