import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useContext, useState } from "react";
import { postAuthRegister } from "../../../open-api-client";
import { AuthContext } from "../../frontend/components/AuthContext";

export const Route = createFileRoute("/auth/register")({
  component: RouteComponent,
});

function RouteComponent() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const register = async () => {
    const res = await postAuthRegister({
      body: { email, password, name, passwordConfirmation },
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
      <div className="max-w-2xl m-auto  p-5">
        <div>
          <label>Name</label>
        </div>
        <input
          type="text"
          className="bg-neutral-100 px-2 py-1.5 mt-2 w-full"
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoComplete="one-time-code"
        />
        <div className="mt-5">
          <label>Email</label>
        </div>
        <input
          type="text"
          className="bg-neutral-100 px-2 py-1.5 mt-2 w-full"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="one-time-code"
        />
        <div className="mt-5">
          <label>Password</label>
        </div>
        <input
          type="password"
          className="bg-neutral-100 px-2 py-1.5 mt-2 w-full"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="one-time-code"
        />
        <div className="mt-5">
          <label>Password Confirmation</label>
        </div>
        <input
          type="password"
          className="bg-neutral-100 px-2 py-1.5 mt-2 w-full"
          value={passwordConfirmation}
          onChange={(e) => setPasswordConfirmation(e.target.value)}
          autoComplete="one-time-code"
        />
        <div className="mt-5">
          <button
            onClick={register}
            className="bg-blue-600 text-white px-3 py-1.5 rounded-sm cursor-pointer"
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
}
