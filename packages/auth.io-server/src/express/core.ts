import jwt from "jsonwebtoken";
import type { Request } from "express";
import type { AuthOptions } from "../types";

/** Get session from server side */
export const getSession = (req: Request, authOptions: AuthOptions) => {
  const { token } = req.cookies;

  if (!token) {
    return;
  }

  return jwt.verify(token, authOptions.secret as string);
};
