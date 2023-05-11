import { type Request, type Response } from "express";
import { type AuthMethod } from "../methods";
import { type AuthenticatorOptions } from "../core";

export { default as signup } from "./signup.js";
export { default as login } from "./login.js";
export { default as logout } from "./logout.js";
export { default as getsession } from "./getsession.js";

export type AuthAction = "signup" | "login" | "logout" | "getsession";

export interface ControllerParams {
  req: Request;
  res: Response;
  method: AuthMethod;
  options: AuthenticatorOptions;
}
