import z from "zod";
import { OpenApiMethod } from "strap-on-openapi";
import { openApi } from "../../openApi";
import { AppRouteType } from "../../types/AppRouteType";
import { userValidator } from "../../../types/User";
import { AuthService } from "../../../services/AuthService";

export const login = openApi.factory.createRoute({
  type: AppRouteType.Public,
  method: OpenApiMethod.POST,
  path: "/login",
  description: "Logs in user",
  validators: {
    body: z.object({
      email: z.string().email().openapi({ description: "User email" }),
      password: z.string().openapi({ description: "User password" }),
    }),
    response: userValidator,
  },
  handler: async (ctx) => {
    const service = new AuthService();
    const user = await service.login(
      ctx.params.body.email,
      ctx.params.body.password
    );
    return user;
  },
});
