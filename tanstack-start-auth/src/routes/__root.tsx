/// <reference types="vite/client" />
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  HeadContent,
  Link,
  Outlet,
  Scripts,
  createRootRoute,
} from "@tanstack/react-router";
import { ReactNode } from "react";
import appCss from "../frontend/css/app.css?url";
import { AuthProvider } from "../frontend/components/AuthProvider";
import { Header } from "../frontend/components/Header";

export const Route = createRootRoute({
  head: () => ({
    links: [{ rel: "stylesheet", href: appCss }],
  }),
  component: Layout,
  notFoundComponent: () => {
    return <div>Page not found</div>;
  },
});
const queryClient = new QueryClient();
function Layout() {
  return (
    <html>
      <head>
        <HeadContent />
      </head>
      <body className="bg-neutral-100 font-extralight">
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <div className="max-w-5xl bg-white m-auto flex flex-col min-h-screen">
              <Header />
              <div className="grow">
                <Outlet />
              </div>
              <div className="p-5 bg-black text-blue-400 flex gap-2 text-sm">
                <a href="http://localhost:3000/stoplight" target="_blank">
                  API Docs
                </a>
                <a href="http://localhost:3000/openapi-schema" target="_blank">
                  OpenAPI Schema
                </a>
              </div>
            </div>
          </AuthProvider>
        </QueryClientProvider>
        <Scripts />
      </body>
    </html>
  );
}
