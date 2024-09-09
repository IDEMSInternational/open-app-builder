import { getGlobalFileLogger } from "shared/src/utils/logging/file-logger";
import { TEST_DATA_PATHS } from "./helpers/utils";
import { ensureDirSync, emptyDirSync } from "fs-extra";

export default () => {
  // Create a logger instance so that parallel test calls don't try to create/empty
  // directory when initiating for first time
  getGlobalFileLogger();

  // Ensure test data folders are cleaned
  ensureDirSync(TEST_DATA_PATHS.SHEETS_CACHE_FOLDER);
  ensureDirSync(TEST_DATA_PATHS.SHEETS_OUTPUT_FOLDER);
  emptyDirSync(TEST_DATA_PATHS.SHEETS_CACHE_FOLDER);
  emptyDirSync(TEST_DATA_PATHS.SHEETS_CACHE_FOLDER);
};
