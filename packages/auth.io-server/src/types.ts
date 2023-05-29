import type { AuthMethod } from "./methods";

export type AuthAction = "signin" | "logout" | "getsession";

export interface AuthOptions {
  /**
   * Auth methods (Credentials, Google, Facebook, etc.)
   */
  methods: AuthMethod[];
  /**
   * URL of your client, You can set it in environment variables
   * @default process.env.AUTH_CLIENT_URL
   */
  clientURL?: string;
  /**
   * Random string for JWT encryption
   * @default process.env.AUTH_SECRET
   */
  secret?: string;
}

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      /** Default auth client URL */
      AUTH_CLIENT_URL: string;
      /** Default auth secret */
      AUTH_SECRET: string;
    }
  }
}
