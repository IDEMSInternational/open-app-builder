import path from "path";
import fs from "fs-extra";
import dotenv from "dotenv";

const env = loadEnvVars();

const APP_SRC_FOLDER = path.resolve(__dirname, "../../../../");
const REPO_FOLDER = path.resolve(__dirname, "../../");

export const paths = {
  /** output path for generated screenshots */
  OUTPUT_FOLDER: path.resolve(REPO_FOLDER, "output"),
  SCREENSHOTS_FOLDER: path.resolve(REPO_FOLDER, "output/screenshots"),
  SCREENSHOT_DIFFS_FOLDER: path.resolve(REPO_FOLDER, "output/diffs"),
  CACHED_ASSETS: path.resolve(REPO_FOLDER, "cache/assets"),
  DOWNLOADED_SCREENSHOTS_FOLDER: path.resolve(REPO_FOLDER, "output/downloaded"),
  WWW_FOLDER: path.resolve(APP_SRC_FOLDER, "www"),
};

Object.values(paths).forEach((p) => {
  fs.ensureDirSync(p);
});

/** path to src dexie installation to use during db seed methods */
export const DEXIE_SRC_PATH = path.resolve(APP_SRC_FOLDER, "node_modules/dexie/dist/dexie.js");

export const GH_REPO_ORG = env.GH_REPO_ORG;
export const GH_REPO_NAME = env.GH_REPO_NAME;

/** Load specified environment from .env file. Fallback to default values if no .env */
function loadEnvVars() {
  const result = dotenv.config();
  if (result.error) {
    // no env file, just use defaults
    const defaultEnv: IEnvVars = {
      GH_REPO_NAME: "parenting-app-ui",
      GH_REPO_ORG: "IDEMSInternational",
    };
    return defaultEnv;
  } else {
    const parsed = result.parsed as any;
    return parsed as IEnvVars;
  }
}
interface IEnvVars {
  GH_REPO_ORG: string;
  GH_REPO_NAME: string;
}
