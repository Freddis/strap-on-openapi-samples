import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import { defineConfig } from "vite";
import tsConfigPaths from "vite-tsconfig-paths";
import { openApi } from "./src/backend/api/openApi";
import { openApiRoutes } from "./src/backend/api/openApiRoutes";
import { isoImport } from "vite-plugin-iso-import";

openApi.addRouteMap(openApiRoutes);
export default defineConfig({
  server: {
    port: 3000,
  },
  plugins: [
    isoImport(),
    tsConfigPaths({
      projects: ["./tsconfig.json"],
    }),
    tanstackStart(),
    {
      name: "open-api-client-generator",
      configureServer: async () => {
        console.log("Generating Open API client");
        await openApi.clientGenerator.generate();
        console.log("Sample page: http://localhost:3000/");
        console.log("API docs (Stoplight): http://localhost:3000/stoplight");
        console.log("API docs (Swagger): http://localhost:3000/swagger");
      },
    },
  ],
});
