import { User } from "../types/User";
import jwt from "jsonwebtoken";
import z from "zod";
import { ActionError } from "../api/errors/ActionError";
import { ActionErrorCode } from "../api/types/ActionErrorCode";

type StoredUser = Omit<User, "jwt"> & { password: string };
export class AuthService {
  protected jwtSecret = "1234";
  protected idCounter = 2;
  protected static users: StoredUser[] = [
    {
      id: 1,
      password: "1234",
      name: "Demo User",
      email: "test@openapi.com",
    },
  ];

  async register(
    name: string,
    email: string,
    password: string,
    passwordConfirmation: string
  ): Promise<User> {
    if (password.trim() !== passwordConfirmation.trim()) {
      throw new ActionError(ActionErrorCode.UserPasswordNotConfirmed);
    }
    const user = {
      name: name.trim(),
      email: email.trim(),
      password: password.trim(),
      id: this.idCounter++,
    };
    AuthService.users.push(user);
    const token = jwt.sign(
      {
        time: new Date().toISOString(),
        id: user.id,
      },
      this.jwtSecret,
      {
        expiresIn: "100d",
      }
    );

    return {
      ...user,
      jwt: token,
    };
  }

  async login(email: string, password: string): Promise<User> {
    const user = AuthService.users.find((x) => x.email == email);
    if (!user) {
      throw new ActionError(ActionErrorCode.WrongCredentials);
    }
    if (user.password !== password) {
      throw new ActionError(ActionErrorCode.WrongCredentials);
    }
    const token = jwt.sign(
      {
        time: new Date().toISOString(),
        id: user.id,
      },
      this.jwtSecret,
      {
        expiresIn: "100d",
      }
    );

    return {
      ...user,
      jwt: token,
    };
  }

  async getUserFromRequest(request: Request): Promise<User | null> {
    const authHeader = request.headers.get("Authorization");
    if (!authHeader) {
      return null;
    }
    const jwtToken = authHeader.replaceAll("Bearer", "").trim();
    try {
      jwt.verify(jwtToken, this.jwtSecret);
    } catch (e: unknown) {
      console.log("Can't verify jwt token");
      return null;
    }
    const value = jwt.decode(jwtToken);
    if (!value) {
      return null;
    }
    const validatedData = z.object({ id: z.number() }).safeParse(value);
    if (!validatedData.success) {
      return null;
    }

    const user = AuthService.users.find((x) => x.id === validatedData.data.id);
    if (!user) {
      return null;
    }

    return { ...user, jwt: jwtToken };
  }
}
