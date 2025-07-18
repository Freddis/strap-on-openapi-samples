// This file is auto-generated by @hey-api/openapi-ts

import type { GetCarsResponse } from './types.gen';

const carSchemaResponseTransformer = (data: any) => {
    data.updatedAt = new Date(data.updatedAt);
    return data;
};

export const getCarsResponseTransformer = async (data: any): Promise<GetCarsResponse> => {
    data = data.map((item: any) => {
        return carSchemaResponseTransformer(item);
    });
    return data;
};