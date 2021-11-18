import * as path from "path";

export const ROOT_DIR = path.resolve(__dirname, "../../../");
export const MAIN_PACKAGE_PATH = path.join(ROOT_DIR, "package.json");

export const SCRIPTS_WORKSPACE_PATH = path.join(ROOT_DIR, "packages/scripts");

export const CONFIG_FOLDER_PATH = path.join(SCRIPTS_WORKSPACE_PATH, "config");
export const PRIVATE_KEY_PATH = path.join(CONFIG_FOLDER_PATH, "private.key");
export const PUBLIC_KEY_PATH = path.join(CONFIG_FOLDER_PATH, "public.key");
export const CREDENTIALS_PATH = path.join(CONFIG_FOLDER_PATH, "credentials.json");
export const AUTH_TOKEN_PATH = path.join(CONFIG_FOLDER_PATH, "token.json");

export const RESOURCE_FOLDER_PATH = path.join(ROOT_DIR, "resources");

export const ANDROID_RES_PATH = path.join(ROOT_DIR, "android/app/src/main/res");
export const APP_BUILD_GRADLE_PATH = path.join(ROOT_DIR, "android/app/build.gradle");

// APP DATA
// TODO - ideally should be renamed to more generic IDEMS app_data folder/package
const APP_DATA_PACKAGE_PATH = path.join(ROOT_DIR, "packages/app-data");
export const APP_DATA_DATA_PATH = path.join(APP_DATA_PACKAGE_PATH, "data");
export const APP_DATA_ASSETS_PATH = path.join(APP_DATA_PACKAGE_PATH, "assets");
export const APP_DATA_ASSETS_INDEX_PATH = path.resolve(APP_DATA_ASSETS_PATH, "index.ts");
