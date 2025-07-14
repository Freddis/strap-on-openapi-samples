import { Link, useNavigate } from "@tanstack/react-router";
import { useContext } from "react";
import { AuthContext } from "./AuthContext";

export const Header = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const user = auth.user;
  const logout = () => {
    auth.logout();
    navigate({ to: "/" });
  };
  return (
    <div className="p-5 text-blue-600 flex gap-2 border-b-neutral-400 border-b-1 font-medium">
      <Link to="/">Home</Link>
      <Link to="/cars">Cars</Link>
      {!user && <Link to="/auth/login">Login</Link>}
      {!user && <Link to="/auth/register">Register</Link>}

      {user && (
        <div className="grow flex flex-row-reverse">
          <div>
            <span className="text-black mr-2">{user.name}</span>
            <a href="#" onClick={logout}>
              Logout
            </a>
          </div>
        </div>
      )}
    </div>
  );
};
