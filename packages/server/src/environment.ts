import dotenv from "dotenv";
import { logger } from "./helpers/logger";

/** Environment variables set from `.env` file */
interface IParsedEnvironment {
  WEBSOCKET_PORT: string;
  POSTGRES_HOST: string;
  POSTGRES_PORT: string;
  POSTGRES_USER: string;
  POSTGRES_PASSWORD: string;
  POSTGRES_DB: string;
  NODE_ENV?: "development" | "production" | "test";
}
interface IEnvironment extends IParsedEnvironment {
  production: boolean;
}

const { error, parsed } = dotenv.config();
if (error) {
  logger.error(error.message);
}
const parsedEnv: IParsedEnvironment = parsed as any;
const environment: IEnvironment = {
  ...parsedEnv,
  production: parsedEnv.NODE_ENV !== "development",
};
export { environment };
