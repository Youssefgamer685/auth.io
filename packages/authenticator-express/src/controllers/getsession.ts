import jwt, { type JwtPayload } from "jsonwebtoken";
import { type CredentialsMethod } from "../methods";
import { type ControllerParams } from ".";

const getsession = async ({ req, method, res, options }: ControllerParams) => {
  const { token } = req.cookies;
  const session = jwt.verify(token, options.secret as string);
  const sessionWithoutExcludedKeys =
    method.type === "credentials" &&
    Array.isArray((method as CredentialsMethod).excludeCredentials as string[])
      ? Object.fromEntries(
          Object.keys(session as JwtPayload)
            .filter(
              (key) =>
                !(
                  (method as CredentialsMethod).excludeCredentials as string[]
                ).includes(key)
            )
            .map((key) => [key, (session as JwtPayload)[key]])
        )
      : session;

  res.send(sessionWithoutExcludedKeys);
};

export default getsession;
