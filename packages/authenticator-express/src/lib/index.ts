import { Router } from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import jwt, { type JwtPayload } from "jsonwebtoken";
import querystring from "node:querystring";
import { OAuth, OAuth2 } from "oauth";
import cors from "cors";
import * as controllers from "../controllers";
import { verifyOptions, getMethod } from "../utils";
import { type AuthMethod, type OAuthMethod } from "../methods";
import { type AuthAction } from "../controllers";

export type AuthRouter = () => Router;

/** Authenticator Options */
export interface AuthenticatorOptions {
  /**
   * Authenticator Methods (e.g. credentials, google, facebook)
   */
  methods: AuthMethod[];
  /**
   * Secret String Used To Hash JWTs And Cookies
   * @default process.env.AUTHENTICATOR_SECRET
   */
  secret?: string;
  /**
   * URI Of Your Client, It Is Required For Redirects And CORS
   */
  clientURI: string;
}

/** Entry Point To Authenticator In Express.js Server */
const Authenticator = (options: AuthenticatorOptions): AuthRouter => {
  const router = Router();
  const _options = verifyOptions(options);

  router.use(bodyParser.json());
  router.use(bodyParser.urlencoded({ extended: true }));
  router.use(cookieParser(_options.secret));
  router.use(cors({ credentials: true, origin: _options.clientURI }));

  router.get<string, { methodId: string }>(
    "/oauthcallback/:methodId",
    async (req, res) => {
      const { methodId } = req.params;
      const { code } = req.query;
      const method = getMethod(methodId, _options);

      try {
        const OAuthClient = (method as OAuthMethod).OAuthVersion === "2.0" ? OAuth2 : OAuth;
       
       
        
        const token = jwt.sign(userInfo, _options.secret as string);

        res.cookie("token", token).redirect(_options.clientURI);
      } catch (error) {
        return res.status(500).send({ message: (error as Error).message });
      }
    }
  );

  router.post<string, { action: AuthAction; methodId: string }>(
    "/:action/:methodId?",
    async (req, res) => {
      const { action, methodId } = req.params;
      const method = getMethod(methodId, _options);

      try {
        return await controllers[action]({
          req,
          res,
          method,
          options: _options,
        });
      } catch (error) {
        return res.status(500).send({ message: (error as Error).message });
      }
    }
  );

  return () => router;
};

export default Authenticator;

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      /** Default Secret For Authenticator */
      AUTHENTICATOR_SECRET?: string;
    }
  }
}
