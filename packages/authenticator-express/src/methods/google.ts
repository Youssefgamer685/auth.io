import { type OAuthMethod, type CommonMethodConfig } from ".";

export interface GoogleMethodConfig extends CommonMethodConfig {
  /** Client Id For Your Application, You Can Find It On [Google Cloud Console](https://console.cloud.google.com) */
  clientId: string;
  /** Client Secret For Your Application Comming From [Google Cloud Console](https://console.cloud.google.com) */
  clientSecret: string;
}

const google = (options: GoogleMethodConfig): OAuthMethod => {
  return {
    id: options.id ?? "google",
    type: "oauth",
    OAuthVersion: "2.0"
    authorization: {
      uri: "https://accounts.google.com/o/oauth2/v2/auth",
      params: (redirectURI) => ({
        scope: [
          "https://www.googleapis.com/auth/userinfo.email",
          "https://www.googleapis.com/auth/userinfo.profile",
        ].join(" "),
        client_id: options.clientId,
        redirect_uri: encodeURIComponent(redirectURI),
        response_type: "code",
      }),
    },
    token: {
      uri: "https://oauth2.googleapis.com/token",
      params: (code) => ({
        code,
        client_id: options.clientId,
        client_secret: options.clientSecret,
        grant_type: "authorization_code",
      }),
    },
    userinfo: {
      uri: "https://www.googleapis.com/oauth2/v1/userinfo",
      params: (accessToken) => ({
        alt: "json",
        access_token: accessToken,
      }),
    },
  };
};

export default google;
