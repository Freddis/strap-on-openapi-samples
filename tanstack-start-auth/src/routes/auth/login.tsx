import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useContext, useState } from "react";
import { postAuthLogin } from "../../../open-api-client";
import { AuthContext } from "../../frontend/components/AuthContext";

export const Route = createFileRoute("/auth/login")({
  component: RouteComponent,
});

function RouteComponent() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const login = async () => {
    const res = await postAuthLogin({
      body: { email, password },
    });
    if (res.error) {
      const message =
        "humanReadable" in res.error
          ? res.error.humanReadable
          : "Unknown error happened on the server";
      alert(message);
      return;
    }
    auth.login(res.data);
    navigate({ to: "/cars" });
  };

  return (
    <div className="">
      <div className="max-w-2xl m-auto p-5">
        <div>
          <label>Email</label>
        </div>
        <input
          type="text"
          className="bg-neutral-100 px-2 py-1.5 mt-2 w-full"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <div className="mt-5">
          <label>Password</label>
        </div>
        <input
          type="password"
          className="bg-neutral-100 px-2 py-1.5 mt-2 w-full"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="mt-5 flex items-center">
          <button
            onClick={login}
            className="bg-blue-600 text-white px-3 py-1.5 rounded-sm cursor-pointer"
          >
            Sign In
          </button>
          <div className="grow text-right">
            <Link to="/auth/register" className="text-blue-500">
              I don't have an account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
