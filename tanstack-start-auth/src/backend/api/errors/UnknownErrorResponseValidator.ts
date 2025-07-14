import z, { TypeOf } from "zod";
import { AppErrorType } from "../types/AppErrorType";

export const unknownErrorResponseValidator = z.object({
  code: z.literal(AppErrorType.Unknown),
});
export type UnknownErrorResponseValidator =
  typeof unknownErrorResponseValidator;
export type UnknownErrorResponse = TypeOf<UnknownErrorResponseValidator>;
