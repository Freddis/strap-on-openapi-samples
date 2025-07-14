import z, { TypeOf } from "zod";
import { AppErrorType } from "../types/AppErrorType";

export const actionErrorResponseValidator = z.object({
  code: z.literal(AppErrorType.ActionError),
  humanReadable: z.string(),
});
export type ActionErrorResponseValidator = typeof actionErrorResponseValidator;
export type ActionErrorResponse = TypeOf<ActionErrorResponseValidator>;
