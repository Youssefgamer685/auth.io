export { default, type AuthRouter, type AuthenticatorOptions } from "./core";
export * as Methods from "./methods";

export type {
  CredentialsMethodConfig,
  CredentialsMethod,
  OAuthMethod,
  GoogleMethodConfig,
  AuthMethod,
} from "./methods";
export type { AuthAction } from "./controllers";
