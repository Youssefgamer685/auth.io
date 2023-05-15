import { type CredentialsMethodConfig, type CredentialsMethod } from ".";

const credentials = <
  P extends Record<string, unknown> = Record<string, unknown>
>(
  options: CredentialsMethodConfig<P>
): CredentialsMethod<P> => {
  return {
    id: "credentials",
    type: "credentials",
    excludeCredentials: [],
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    authorize: async () => {},
    ...options,
  };
};

export default credentials;
