import { OpenApiRouteMap } from "strap-on-openapi";
import { getCars } from "./handlers/cars/getCars";
import { AppRouteType } from "./types/AppRouteType";
import { login } from "./handlers/auth/login";
import { register } from "./handlers/auth/register";

export const openApiRoutes: OpenApiRouteMap<AppRouteType> = {
  "/cars": [getCars],
  "/auth": [login, register],
};
