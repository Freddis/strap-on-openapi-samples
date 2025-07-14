import { ActionErrorCode } from "../types/ActionErrorCode";

export const actionErrorDescriptions: Record<ActionErrorCode, string> = {
  [ActionErrorCode.WrongCredentials]: "Email or Password is incorrect",
  [ActionErrorCode.UserAlreadyExists]: "User with this email already exists",
  [ActionErrorCode.UserPasswordNotConfirmed]: "Password confirmation is wrong",
  [ActionErrorCode.InvalidDataInRequest]:
    "The data in request is missing or has wrong format",
};
