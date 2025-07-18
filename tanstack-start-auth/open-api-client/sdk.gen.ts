// This file is auto-generated by @hey-api/openapi-ts

import type { Options as ClientOptions, TDataShape, Client } from './client';
import type { GetCarsData, GetCarsResponses, GetCarsErrors, PostAuthLoginData, PostAuthLoginResponses, PostAuthLoginErrors, PostAuthRegisterData, PostAuthRegisterResponses, PostAuthRegisterErrors } from './types.gen';
import { getCarsResponseTransformer } from './transformers.gen';
import { client as _heyApiClient } from './client.gen';

export type Options<TData extends TDataShape = TDataShape, ThrowOnError extends boolean = boolean> = ClientOptions<TData, ThrowOnError> & {
    /**
     * You can provide a client instance returned by `createClient()` instead of
     * individual options. This might be also useful if you want to implement a
     * custom client.
     */
    client?: Client;
    /**
     * You can pass arbitrary values through the `meta` object. This can be
     * used to access values that aren't defined as part of the SDK function.
     */
    meta?: Record<string, unknown>;
};

/**
 * Returns list of cars in stock
 */
export const getCars = <ThrowOnError extends boolean = false>(options?: Options<GetCarsData, ThrowOnError>) => {
    return (options?.client ?? _heyApiClient).get<GetCarsResponses, GetCarsErrors, ThrowOnError>({
        responseType: 'json',
        security: [
            {
                name: 'authorization',
                type: 'apiKey'
            }
        ],
        responseTransformer: getCarsResponseTransformer,
        url: '/cars',
        ...options
    });
};

/**
 * Logs in user
 */
export const postAuthLogin = <ThrowOnError extends boolean = false>(options?: Options<PostAuthLoginData, ThrowOnError>) => {
    return (options?.client ?? _heyApiClient).post<PostAuthLoginResponses, PostAuthLoginErrors, ThrowOnError>({
        responseType: 'json',
        url: '/auth/login',
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...options?.headers
        }
    });
};

/**
 * Logs in user
 */
export const postAuthRegister = <ThrowOnError extends boolean = false>(options?: Options<PostAuthRegisterData, ThrowOnError>) => {
    return (options?.client ?? _heyApiClient).post<PostAuthRegisterResponses, PostAuthRegisterErrors, ThrowOnError>({
        responseType: 'json',
        url: '/auth/register',
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...options?.headers
        }
    });
};