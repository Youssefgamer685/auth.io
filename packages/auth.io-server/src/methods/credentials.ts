import type { CommonMethodConfig } from ".";

export interface CredentialsConfig<T = unknown, K = unknown>
  extends CommonMethodConfig {
  /** Array of strings includes names of credentials to exclude from sending to client
   * @example ["password"]
   */
  excludeCredentials?: string[];
  /** Function fires when the user try to authorize
   * @returns ``true`` or ``undefined`` to authorize
   * @throws ``Error`` if the user throws it
   */
  authorize?({
    credentials,
    state,
  }: {
    state: K;
    credentials: T;
  }): boolean | void | null;
}

export const CredentialsMethod = <T, K>(
  options: Omit<CredentialsConfig<T, K>, "type">
): CredentialsConfig<T, K> => {
  return {
    id: "credentials",
    type: "credentials",
    ...options,
  };
};
