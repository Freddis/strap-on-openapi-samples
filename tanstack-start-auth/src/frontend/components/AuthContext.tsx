import { createContext } from "react";
import z from "zod";

export const authUserValidator = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string(),
  jwt: z.string(),
});
export type AuthUser = z.TypeOf<typeof authUserValidator>;

export interface AuthContextValue {
  user: AuthUser | null;
  login(user: AuthUser): void;
  logout(): void;
}

export const AuthContext = createContext<AuthContextValue>({
  user: null,
  login: () => {},
  logout: () => {},
});
