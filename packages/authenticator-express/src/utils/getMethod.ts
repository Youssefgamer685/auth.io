import { logger } from ".";
import { type AuthenticatorOptions } from "..";

const getMethod = (id: string, options: AuthenticatorOptions) => {
  const methodsFromId = options.methods.filter((m) => m.id === id);

  if (!methodsFromId || methodsFromId.length === 0)
    logger.error(`Method '${id}' Is Not Provided!`);
  if (methodsFromId.length > 1) logger.error(`Duplicated Id '${id}'`);

  return methodsFromId[0];
};

export default getMethod;
