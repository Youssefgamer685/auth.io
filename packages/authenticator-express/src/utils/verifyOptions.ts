import * as dotenv from "dotenv";
import logger from "./logger.js";
import { type AuthenticatorOptions } from "../core";

dotenv.config();

const verifyOptions = (options: AuthenticatorOptions): AuthenticatorOptions => {
  const {
    methods = [],
    secret = process.env.AUTHENTICATOR_SECRET,
    clientURI,
  } = options;

  if (!secret)
    logger.error("You Must Set Secret In Options Or In Environment Variables!");
  if (!clientURI) logger.error("You Must Set clientURI!");

  return { methods, secret, clientURI };
};

export default verifyOptions;
