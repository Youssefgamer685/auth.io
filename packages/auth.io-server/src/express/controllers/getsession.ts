import { getSession } from "../core.js";
import { excludeKeys } from "../../utils";
import type { ControllerParams } from ".";
import type { CredentialsConfig } from "../../methods";

export default async ({ method, options, req, res }: ControllerParams) => {
  const session = getSession(req, options);

  if (!session) {
    return res.status(401).send({ message: "Not authorized" });
  }

  return res.send(
    excludeKeys(session, (method as CredentialsConfig).excludeCredentials || [])
  );
};
