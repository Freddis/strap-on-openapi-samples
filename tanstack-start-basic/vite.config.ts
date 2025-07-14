import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import { defineConfig } from "vite";
import tsConfigPaths from "vite-tsconfig-paths";
import viteReact from "@vitejs/plugin-react";
import { openApi } from "./src/api/openApi";
import { openApiRoutes } from "./src/api/openApiRoutes";

openApi.addRouteMap(openApiRoutes);
export default defineConfig({
  server: {
    port: 3000,
  },
  plugins: [
    tsConfigPaths({
      projects: ["./tsconfig.json"],
    }),
    tanstackStart({ customViteReactPlugin: true }),
    viteReact(),
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
