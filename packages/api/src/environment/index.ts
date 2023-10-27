import * as dotenv from "dotenv";
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
  npm_package_version?: string;
}

interface IEnvironment extends IParsedEnvironment {
  production: boolean;
}

let parsedEnv: IParsedEnvironment = {} as any;

try {
  const { NODE_ENV } = process.env;

  let envFilePath = resolve(__dirname, "../../.env");
  if (NODE_ENV === "test") {
    envFilePath = resolve(__dirname, "../../test/.test.env");
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
    console.error("dotenv parse fail, existing env keys:", Object.keys(process.env));
    console.error(error);
  }
} catch (error) {
  console.error("caught error from parsed");
}

const environment: IEnvironment = {
  ...parsedEnv,
  ...process.env,
  production: parsedEnv.NODE_ENV !== "development",
};
export { environment };
