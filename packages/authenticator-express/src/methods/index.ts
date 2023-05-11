import { type Request } from "express";
import { type ParsedUrlQueryInput } from "node:querystring";

export { default as Credentials } from "./credentials.js";
export { default as Google, type GoogleMethodConfig } from "./google.js";

export type AuthMethod = OAuthMethod | CredentialsMethod;

export interface CommonMethodConfig {
  /**
   * Unique Id Of Method Used If You Want To Use Multiple Methods From The Same Function
   */
  id?: string;
}

export interface CredentialsMethodConfig<
  P extends Record<string, unknown> = Record<string, unknown>
> extends CommonMethodConfig {
  /**
   * Asynchronous Function Fires When Authorizing User And Can Return Truthy Value To Authorize User Or Falsy Value To Throw Error,
   * You Can Throw Errors And It Will Be Sent To The Client
   */
  authorize?({
    action,
    credentials,
    req,
  }: {
    action: "signup" | "login";
    credentials: P;
    req: Request;
  }): Promise<unknown>;
  /**
   * Array Of Strings Refer To Credentials To Exclude From Sending To The Client
   */
  excludeCredentials?: string[];
}

export interface CredentialsMethod extends Required<CredentialsMethodConfig> {
  type: "credentials";
}

export interface OAuthMethod extends CommonMethodConfig {
  type: "oauth";
  authorization: EndpointHandler;
  userinfo: EndpointHandler;
  token: EndpointHandler;
}

interface EndpointHandler {
  uri: string;
  params?(...args: string[]): ParsedUrlQueryInput | undefined;
}
