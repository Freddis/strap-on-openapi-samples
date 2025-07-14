import { createServerFileRoute } from "@tanstack/react-start/server";
import { openApi } from "../backend/api/openApi";

export const ServerRoute = createServerFileRoute("/stoplight").methods(
  openApi.wrappers.tanstackStart.createStoplightMethods("/openapi-schema")
);
