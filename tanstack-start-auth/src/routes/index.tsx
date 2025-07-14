import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: FrontPage,
});

function FrontPage() {
  return (
    <div className="p-5">
      <h1 className="text-xl mb-5">Open API Authentication Sample</h1>
      <div>
        A sample project displaying how you can create an API with Public and
        Authenticated route types. In order to gain access to authenticated
        route types you need to either register or login with these demo
        credentials:
        <div className="font-semibold mt-5">
          <div>test@openapi.com</div>
          <div>1234</div>
        </div>
        <div className="mt-5">
          <h2>Keep in mind: </h2>
          <div className="mt-1">
            The <b>/cars</b> route left intentionally open regardless of auth
            state.
          </div>
          <div className="mt-1">
            When you register a user it's stored in memory. If you change the
            files, the vite watcher is going to restart the server
          </div>
          <div className="mt-1">
            This is tutorial on Strap-On OpenAPI error and route customization.
            Implementations of routes and authentications intentionally left
            simplified. The goal of Strap-On OpenAPI is to let you implement
            your API the way you want it to be!
          </div>
        </div>
      </div>
    </div>
  );
}
