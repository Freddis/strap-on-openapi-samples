import { OpenApiRouteMap, OpenApiSampleRouteType } from "strap-on-openapi";
import { getCars } from "../api/getCars";

export const routes: OpenApiRouteMap<OpenApiSampleRouteType> = {
  "/cars": [getCars],
};
