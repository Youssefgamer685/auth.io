import type { CredentialsConfig } from "./credentials.js";

export type AuthMethod = CredentialsConfig | OAuth2MethodConfig;

export * from "./credentials.js";
export * from "./google.js";

export interface CommonMethodConfig {
  /** Unique id for each method, Default is method name */
  id?: string;
  type: "credentials" | "oauth";
}

export interface OAuth2MethodConfig<T = unknown> extends CommonMethodConfig {
  oauthVersion: "1.0" | "2.0";
  clientId: string;
  clientSecret: string;
  options: T;
  baseURL: string;
  authorizationEndpoint: string;
  tokenEndpoint: string;
}
