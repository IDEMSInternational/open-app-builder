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

export const PLH_DATA_PATH = path.join(ROOT_DIR, "packages/plh-data/data");
export const PLH_ASSETS_PATH = path.join(ROOT_DIR, "packages/plh-data/assets/plh_assets");
export const PLH_ASSETS_INDEX_PATH = path.resolve(PLH_ASSETS_PATH, "../index.ts");
