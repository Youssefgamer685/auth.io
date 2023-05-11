import { type ControllerParams } from ".";

const logout = async ({ res }: ControllerParams) => {
  res.clearCookie("token").sendStatus(200);
};

export default logout;
