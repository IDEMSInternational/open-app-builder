import * as dotenv from "dotenv";

/** Environment variables set from `.env` file */
interface IParsedEnvironment {
  WEBSOCKET_PORT: string;
  API_PORT: string;
  DB_HOST: string;
  DB_PORT: string;
  DB_ADMIN_NAME: string;
  DB_ADMIN_USER: string;
  DB_ADMIN_PASSWORD: string;
  DB_NAME: string;
  DB_USER: string;
  DB_PASSWORD: string;
  NODE_ENV: string;
}

interface IEnvironment extends IParsedEnvironment {
  production: boolean;
}

const { error, parsed } = dotenv.config();
if (error) {
  // could not parse dotenv
  throw new Error(error.message);
}
const parsedEnv: IParsedEnvironment = parsed as any;
const environment: IEnvironment = {
  ...parsedEnv,
  production: parsedEnv.NODE_ENV !== "development",
};
export { environment };
