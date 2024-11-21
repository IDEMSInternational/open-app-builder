import path from "path";

const PACKAGE_ROOT_DIR = path.join(__dirname, "../");

export const AUTH_CREDENTIALS_PATH = path.join(PACKAGE_ROOT_DIR, "credentials.dev.json");
export const AUTH_TOKEN_PATH = path.join(PACKAGE_ROOT_DIR, "token.json");
export const GDRIVE_LOGS_DIR = path.join(PACKAGE_ROOT_DIR, "logs");
export const GDRIVE_OUTPUT_FOLDER = path.join(PACKAGE_ROOT_DIR, "output");
