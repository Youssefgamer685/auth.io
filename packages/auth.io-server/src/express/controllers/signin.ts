import jwt from "jsonwebtoken";
import { OAuth2 } from "oauth";
import type { ControllerParams } from ".";
import type { CredentialsConfig, OAuth2MethodConfig } from "../../methods";

export default async ({ req, res, method, options }: ControllerParams) => {
  if (method.type === "credentials") {
    const { state, ...credentials } = req.body;
    const authorize = (method as CredentialsConfig).authorize?.({
      credentials,
      state,
    });

    if (authorize === undefined || authorize === true) {
      const token = jwt.sign(credentials, options.secret as string);

      return res.cookie("token", token, {
        sameSite: "none",
        secure: true,
        httpOnly: true,
      });
    } else {
      return res.status(401).send({ message: "Not authorized" });
    }
  } else if (method.type === "oauth") {
    if ((method as OAuth2MethodConfig).oauthVersion === "2.0") {
      const { clientId, clientSecret, baseURL, authorizationEndpoint, tokenEndpoint } = (method as OAuth2MethodConfig);
      const OAuthClient = new OAuth2(clientId, clientSecret, baseURL, authorizationEndpoint, tokenEndpoint);
      const authorizationURL = OAuthClient.getAuthorizeUrl({
        redirect_uri: encodeURIComponent(`${req.protocol}://${req.hostname}/auth/oauth2callback`),
        response_type: "code",
        scope
      });
    }
  }
};
