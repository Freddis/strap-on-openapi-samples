import z from "zod";
import { OpenApiMethod, OpenApiSampleRouteType } from "strap-on-openapi";
import { openApi } from "../openApi";

export const getCars = openApi.factory.createRoute({
    type: OpenApiSampleRouteType.Public,
    method: OpenApiMethod.GET,
    path: "/",
    description: "Returns list of cars in stock",
    validators: {
        response: z.object({       
            name: z.string().openapi({description: 'Car name'}),
            make: z.string().openapi({description: 'Make'}),
            averageDriverIQ: z.number().openapi({description: 'IQ. Tested in international studies'}),
            updatedAt: z.date().openapi({description: 'Last time the records was updated'}),
        }).array().openapi({description: 'List of cars'}),
    },
    handler: async () => {
        const car1 = {
            name: "Z4",
            make: "BMW",
            averageDriverIQ: 80,
            updatedAt: new Date()
        }
        const car2 = {
            name: "Supra",
            make: "Tayota",
            averageDriverIQ: 130,
            updatedAt: new Date()
        }
        return [car1,car2]
    }
})