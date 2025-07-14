import {
  createStartHandler,
  defaultStreamHandler,
} from "@tanstack/react-start/server";
import { createRouter } from "./router";
import { openApi } from "./backend/api/openApi";
import { openApiRoutes } from "./backend/api/openApiRoutes";

openApi.addRouteMap(openApiRoutes);
export default createStartHandler({
  createRouter,
})(defaultStreamHandler);
