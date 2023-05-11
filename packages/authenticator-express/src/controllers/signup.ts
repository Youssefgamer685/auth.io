import jwt from "jsonwebtoken";
import querystring from "node:querystring";
import { logger } from "../utils";
import { type CredentialsMethod, type OAuthMethod } from "../methods";
import { type ControllerParams } from ".";

const signup = async ({ req, res, method, options }: ControllerParams) => {
  if (method.type === "credentials") {
    const credentials = req.body;

    const isAuthorized = await (method as CredentialsMethod).authorize({
      action: "signup",
      credentials,
      req,
    });

    if (!isAuthorized) {
      logger.error("Not Authorized!");
    }

    const token = jwt.sign(credentials, options.secret as string);

    res
      .cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
      })
      .sendStatus(200);
  } else if (method.type === "oauth") {
    res.redirect(
      `${(method as OAuthMethod).authorization.uri}?${querystring.stringify(
        (method as OAuthMethod).authorization.params?.(
          `${req.protocol}://${req.get("host")}/auth/oauthcallback/${method.id}`
        )
      )}`
    );
  }
};

export default signup;
