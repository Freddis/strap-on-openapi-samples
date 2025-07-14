import { ActionErrorCode } from "../types/ActionErrorCode";

export class ActionError extends Error {
  protected code: ActionErrorCode;

  constructor(code: ActionErrorCode) {
    super();
    this.code = code;
  }

  getCode() {
    return this.code;
  }
}
