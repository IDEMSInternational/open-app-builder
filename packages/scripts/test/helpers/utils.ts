import { resolve } from "path";
import { SCRIPTS_WORKSPACE_PATH } from "shared";
import { Logger } from "shared/src/utils/logging/console-logger";

/*************************************************************
 * Test utilities
 *************************************************************/

/**
 * Create spy to track usage of console Logger method
 * @param callOriginal specify whether to still call original Logger
 * methods after spy intercept
 */
export function useMockLogger(callOriginal = true) {
  const error = jest.spyOn(Logger, "error");
  const warning = jest.spyOn(Logger, "warning");
  if (!callOriginal) {
    error.mockImplementation(jest.fn());
    warning.mockImplementation(jest.fn());
  }
  return { error, warning };
}

const TEST_DATA_DIR = resolve(SCRIPTS_WORKSPACE_PATH, "test", "data");
/** Common paths used for test data */
export const TEST_DATA_PATHS = {
  SHEETS_CACHE_FOLDER: resolve(TEST_DATA_DIR, "cache"),
  SHEETS_INPUT_FOLDER: resolve(TEST_DATA_DIR, "input"),
  SHEETS_OUTPUT_FOLDER: resolve(TEST_DATA_DIR, "output"),
  TEST_DATA_DIR,
};
