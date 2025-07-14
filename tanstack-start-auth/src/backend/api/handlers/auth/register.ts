import z from "zod";
import { OpenApiMethod } from "strap-on-openapi";
import { openApi } from "../../openApi";
import { AppRouteType } from "../../types/AppRouteType";
import { userValidator } from "../../../types/User";
import { AuthService } from "../../../services/AuthService";

export const register = openApi.factory.createRoute({
  type: AppRouteType.Public,
  method: OpenApiMethod.POST,
  path: "/register",
  description: "Logs in user",
  validators: {
    body: z.object({
      name: z.string().openapi({ description: "User Name" }),
      email: z.string().email().openapi({ description: "User email" }),
      password: z.string().openapi({ description: "User password" }),
      passwordConfirmation: z
        .string()
        .openapi({ description: "Confirmation of password" }),
    }),
    response: userValidator,
  },
  handler: async (ctx) => {
    const service = new AuthService();
    const user = await service.register(
      ctx.params.body.name,
      ctx.params.body.email,
      ctx.params.body.password,
      ctx.params.body.passwordConfirmation
    );
    return user;
  },
});
