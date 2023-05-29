import dotenv from "dotenv";
import type { AuthOptions } from "./types";

dotenv.config();

export const verifyOptions = (authOptions: AuthOptions): AuthOptions => {
  const {
    methods = [],
    clientURL = process.env.AUTH_CLIENT_URL,
    secret = process.env.AUTH_SECRET,
  } = authOptions;

  if (!clientURL)
    throw "[AUTH_ERROR]: You must set client url in env vars or in options";
  if (!secret)
    throw "[AUTH_ERROR]: You must set secret in env vars or in options";

  return { methods, clientURL, secret };
};

export const getMethod = (
  methodId: string,
  methods: AuthOptions["methods"]
) => {
  const methodsFromId = methods.filter((method) => method.id === methodId);

  return methodsFromId[0];
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const excludeKeys = (object: any, keys: string[]) => {
  const includedKeys = Object.keys(object).filter((key) => !keys.includes(key));

  return Object.fromEntries(includedKeys.map((key) => [key, object[key]]));
};
