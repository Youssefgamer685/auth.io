import express from "express";
import * as controllers from "./controllers";
import { getMethod, verifyOptions } from "../utils";
import type { AuthAction, AuthOptions } from "../types";

export * from "./core.js";

/** Entry point to Auth.IO for express.js */
export const ExpressAuthIO = (authOptions: AuthOptions) => {
  const options = verifyOptions(authOptions);
  const router = express.Router();

  router.post<"/:action/:methodId", { action: AuthAction; methodId: string }>(
    "/:action/:methodId",
    async (req, res) => {
      const { action, methodId } = req.params;
      const method = getMethod(methodId, options.methods);

      try {
        return await controllers[action]({
          method,
          options,
          req,
          res,
        });
      } catch (error) {
        res.status(500).send({ message: (error as Error).message });
      }
    }
  );

  return router;
};
