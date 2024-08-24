import { Logger } from "shared/src/utils/logging/console-logger";

/*************************************************************
 * Test utilties
 *************************************************************/

/** Mock function that will replace default `Logger` function to instead just record any invocations */
export function useMockErrorLogger() {
  const mockErrorLogger = jest.fn();
  jest.spyOn(Logger, "error").mockImplementation(mockErrorLogger);
  return mockErrorLogger;
}

/** Mock function that will replace default `Logger` function to instead just record any invocations */
export function useMockWarningLogger() {
  const mockWarningLogger = jest.fn();
  jest.spyOn(Logger, "warning").mockImplementation(mockWarningLogger);
  return mockWarningLogger;
}
