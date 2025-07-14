import "zod-openapi/extend";
import { OpenApi, OpenApiValidationError } from "strap-on-openapi";
import { UnauthorizedError } from "./errors/UnauthorizedError";
import { AppErrorType } from "./types/AppErrorType";
import {
  UnauthorizedErrorResponse,
  unauthorizedErrorResponseValidator,
} from "./errors/UnauthorizedErrorResponse";
import {
  UnknownErrorResponse,
  unknownErrorResponseValidator,
} from "./errors/UnknownErrorResponseValidator";
import { AuthService } from "../services/AuthService";
import { AppRouteType } from "./types/AppRouteType";
import {
  ActionErrorResponse,
  actionErrorResponseValidator,
} from "./errors/ActionErrorResponse";
import { ActionError } from "./errors/ActionError";
import { actionErrorDescriptions } from "./errors/actionErrorDescriptions";
import { ActionErrorCode } from "./types/ActionErrorCode";

const auth = new AuthService();
export const openApi = OpenApi.builder
  .customizeErrors(AppErrorType)
  .defineErrors({
    [AppErrorType.Unknown]: {
      status: "500",
      description: "Unknown Error",
      responseValidator: unknownErrorResponseValidator,
    },
    [AppErrorType.ActionError]: {
      status: "400",
      description: "Error with human readable explanation of what went wrong",
      responseValidator: actionErrorResponseValidator,
    },
    [AppErrorType.Unauthorized]: {
      status: "401",
      description: "Unauthorized Error",
      responseValidator: unauthorizedErrorResponseValidator,
    },
  })
  .defineDefaultError({
    code: AppErrorType.Unknown,
    body: {
      code: AppErrorType.Unknown,
    },
  })
  .customizeRoutes(AppRouteType)
  .defineRouteContexts({
    [AppRouteType.Public]: () => Promise.resolve({}),
    [AppRouteType.Member]: async (ctx) => {
      const user = await auth.getUserFromRequest(ctx.request);
      if (!user) {
        throw new UnauthorizedError();
      }
      return { user };
    },
  })
  .defineRoutes({
    [AppRouteType.Public]: {
      authorization: false,
      errors: {
        ActionError: true,
      },
    },
    [AppRouteType.Member]: {
      authorization: true,
      errors: {
        Unauthorized: true,
        ActionError: true,
      },
    },
  })
  .defineGlobalConfig({
    basePath: "/api",
    handleError: (e) => {
      if (e instanceof UnauthorizedError) {
        const body: UnauthorizedErrorResponse = {
          code: AppErrorType.Unauthorized,
        };
        return { code: AppErrorType.Unauthorized, body };
      }

      if (e instanceof OpenApiValidationError) {
        const body: ActionErrorResponse = {
          code: AppErrorType.ActionError,
          humanReadable:
            actionErrorDescriptions[ActionErrorCode.InvalidDataInRequest],
        };
        return { code: AppErrorType.ActionError, body };
      }

      if (e instanceof ActionError) {
        const code = e.getCode();
        const body: ActionErrorResponse = {
          code: AppErrorType.ActionError,
          humanReadable: actionErrorDescriptions[code],
        };
        return { code: AppErrorType.ActionError, body };
      }

      const defaultResponse: UnknownErrorResponse = {
        code: AppErrorType.Unknown,
      };
      return { code: AppErrorType.Unknown, body: defaultResponse };
    },
  })
  .create();
