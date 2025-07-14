import { createServerFileRoute } from "@tanstack/react-start/server";
import { openApi } from "../backend/api/openApi";

export const ServerRoute = createServerFileRoute("/openapi-schema").methods(
  openApi.wrappers.tanstackStart.createShemaMethods()
);
