import z, { TypeOf } from "zod";
import { AppErrorType } from "../types/AppErrorType";

export const unauthorizedErrorResponseValidator = z.object({
  code: z.literal(AppErrorType.Unauthorized),
});
export type UnauthorizedErrorResponseValidator =
  typeof unauthorizedErrorResponseValidator;
export type UnauthorizedErrorResponse =
  TypeOf<UnauthorizedErrorResponseValidator>;
