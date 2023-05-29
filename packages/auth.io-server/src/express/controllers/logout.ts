import { getSession } from "../core.js";
import type { ControllerParams } from ".";

export default async ({ options, req, res }: ControllerParams) => {
  const session = getSession(req, options);

  if (!session) {
    return res.status(401).send({ message: "Not authorized" });
  }

  return res.clearCookie("token");
};
