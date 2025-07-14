import z, { TypeOf } from "zod";
export const userValidator = z
  .object({
    id: z.number().openapi({ description: "Id" }),
    email: z.string().openapi({ description: "Email" }),
    name: z.string().openapi({ description: "User Name" }),
    jwt: z.string().openapi({ description: "JWT token used on the frontend" }),
  })
  .openapi({ description: "User", ref: "User" });
export type UserValidator = typeof userValidator;
export type User = TypeOf<UserValidator>;
