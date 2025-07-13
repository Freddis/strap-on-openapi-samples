import { OpenApiRouteMap, OpenApiSampleRouteType } from "strap-on-openapi";
import { getCars } from "./handlers/getCars";

export const openApiRoutes: OpenApiRouteMap<OpenApiSampleRouteType> = {
  "/cars": [getCars],
};
