import z from "zod";

export const carValidator = z.object({       
    name: z.string().openapi({description: 'Car name'}),
    make: z.string().openapi({description: 'Make'}),
    averageDriverIQ: z.number().openapi({description: 'IQ. Tested in international studies'}),
    updatedAt: z.date().openapi({description: 'Last time the records was updated'}),
})

export type Car = z.TypeOf<typeof carValidator>