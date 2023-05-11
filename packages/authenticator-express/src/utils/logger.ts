const logger = {
  error(error: string) {
    throw Error(`[AUTH_ERROR]: ${error}`);
  },
  info(info: string) {
    console.log("[AUTH_INFO]:", info);
  },
};

export default logger;
