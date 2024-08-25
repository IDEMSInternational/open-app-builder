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
