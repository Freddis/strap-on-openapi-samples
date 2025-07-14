import { FC, ReactNode, useMemo, useState } from "react";
import { client } from "../../../open-api-client/client.gen";
import { authUserValidator, AuthUser, AuthContext } from "./AuthContext";
import { Cookie } from "../utils/Cookie";
export const AuthProvider: FC<{ children: ReactNode | ReactNode[] }> = (
  props
) => {
  const cookieName = "user";
  const cookies = new Cookie();
  const storedUser = useMemo(() => {
    const user = cookies.get(cookieName);
    if (user === null) {
      return null;
    }
    let parsedUser: unknown = {};
    try {
      parsedUser = JSON.parse(user);
    } catch {
      /* empty */
    }
    const result = authUserValidator.safeParse(parsedUser);
    if (result.success) {
      return result.data;
    }
    return null;
  }, []);
  const [user, setUser] = useState<AuthUser | null>(storedUser);
  const getClientConfig = (user: AuthUser | null) => {
    const authHeader = user ? "Bearer " + user.jwt : "nothing";
    return {
      ...client.getConfig(),
      responseType: "json" as const,
      throwOnError: false,
      headers: {
        Authorization: authHeader,
      },
    };
  };
  client.setConfig(getClientConfig(user));
  const logout = () => {
    setUser(null);
    cookies.delete(cookieName);
    client.setConfig(getClientConfig(null));
  };
  const login = (user: AuthUser) => {
    setUser(user);
    cookies.set(cookieName, JSON.stringify(user));
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {props.children}
    </AuthContext.Provider>
  );
};
