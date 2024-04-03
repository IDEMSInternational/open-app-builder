import * as dotenv from "dotenv";
import { existsSync } from "fs";
import { resolve } from "path";

/** Environment variables set from `.env` file */
interface IParsedEnvironment {
  WEBSOCKET_PORT: string;
  API_PORT: string;
  API_BASE_PATH: string;
  DB_HOST: string;
  DB_PORT: string;
  POSTGRES_USER: string;
  POSTGRES_PASSWORD: string;
  APP_DB_NAME: string;
  APP_DB_USER: string;
  APP_DB_PASSWORD: string;
  NODE_ENV: string;
}

interface IEnvironment extends IParsedEnvironment {
  production: boolean;
}

let parsedEnv: IParsedEnvironment = {} as any;

function loadEnv() {
  const { NODE_ENV } = process.env;

  let envFilePath = resolve(__dirname, "../../.env");
  // Hack - update path if running from compiled dist folder
  if (envFilePath.includes("dist")) {
    envFilePath = resolve(envFilePath, "../../.env");
  }
  if (NODE_ENV === "test") {
    envFilePath = resolve(__dirname, "../../test/.test.env");
  }
  // In production env vars are passed from docker container instead of local file
  if (!existsSync(envFilePath)) {
    console.log(envFilePath);
    console.warn("Env file does not exist, using local env variables", Object.keys(process.env));
    return;
  }
  console.log(`Loading environment: [${NODE_ENV}]\n`, envFilePath);
  const { error, parsed } = dotenv.config({
    override: false,
    debug: NODE_ENV === "test" ? true : false,
    path: envFilePath,
  });
  if (parsed) {
    parsedEnv = parsed as any;
  }
  if (error) {
    // could not parse dotenv - either not provided or running in production without file
    console.error("dotenv parse fail");
    console.error(error);
  }
}
loadEnv();

const environment: IEnvironment = {
  ...parsedEnv,
  ...process.env,
  production: parsedEnv.NODE_ENV !== "development",
};
export { environment };
