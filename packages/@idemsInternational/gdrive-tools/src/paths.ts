import path from "path";

const PACKAGE_ROOT_DIR = path.join(__dirname, "../");

export const PATHS = {
  PACKAGE_ROOT_DIR,
  DEFAULT_OUTPUT_FOLDER: path.join(PACKAGE_ROOT_DIR, "output"),
  DEFAULT_CACHE_FOLDER: path.join(PACKAGE_ROOT_DIR, "cache"),
  DEFAULT_CREDENTIALS: path.join(PACKAGE_ROOT_DIR, "credentials.json"),
  DEFAULT_TOKEN: path.join(PACKAGE_ROOT_DIR, "token.json"),
  LOGS_DIR: path.join(PACKAGE_ROOT_DIR, "logs"),
};
