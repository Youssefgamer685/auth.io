import type { Request, Response } from "express";
import type { AuthMethod } from "../../methods/index.js";
import type { AuthOptions } from "../../types.js";

export { default as signin } from "./signin.js";
export { default as logout } from "./logout.js";
export { default as getsession } from "./getsession.js";

export interface ControllerParams {
  method: AuthMethod;
  options: AuthOptions;
  req: Request;
  res: Response;
}
