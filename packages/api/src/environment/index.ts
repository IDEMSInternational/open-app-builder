import * as dotenv from "dotenv";

/** Environment variables set from `.env` file */
interface IParsedEnvironment {
  WEBSOCKET_PORT: string;
  API_PORT: string;
  API_BASE_PATH: string;
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

let parsedEnv: IParsedEnvironment = {} as any;

try {
  const { error, parsed } = dotenv.config();
  if (parsed) {
    parsedEnv = parsed as any;
  }
  if (error) {
    // could not parse dotenv - either not provided or running in production without file
    console.error("dotenv parse fail");
  }
} catch (error) {
  console.error("caught error from parsed");
}

const environment: IEnvironment = {
  ...process.env,
  ...parsedEnv,
  production: parsedEnv.NODE_ENV !== "development",
};
export { environment };
