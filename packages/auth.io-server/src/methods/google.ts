import type { OAuth2MethodConfig } from ".";

export interface GoogleMethodOptions {
  /** A space-delimited list of scopes that identify the resources that your application could access on the user's behalf. These values inform the consent screen that Google displays to the user
   * @default ["https://www.googleapis.com/auth/userinfo.email","https://www.googleapis.com/auth/userinfo.profile"]
   */
  scope: string[];
}

export const googleMethod = (options: Pick<OAuth2MethodConfig<GoogleMethodOptions>, "clientId" | "clientSecret" | "options">): OAuth2MethodConfig<GoogleMethodOptions> => {
  
  return {
    id: "google",
    type: "oauth",
    oauthVersion: "2.0",
    baseURL: "https://accounts.google.com",
    authorizationEndpoint: "/o/oauth2/v2/auth",
    tokenEndpoint: "/o/oauth2/token",
    ...options
  }
};
