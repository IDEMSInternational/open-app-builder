import { Logger } from "shared/src/utils/logging/console-logger";

/*************************************************************
 * Test utilties
 *************************************************************/

/** Mock function that will replace default `Logger` function to instead just record any invocations */
export const mockErrorLogger = jasmine.createSpy("mockErrorLogger", Logger.error);
export function useMockErrorLogger() {
  spyOn(Logger, "error").and.callFake(mockErrorLogger);
  return mockErrorLogger;
}

/** Mock function that will replace default `Logger` function to instead just record any invocations */
export const mockWarningLogger = jasmine.createSpy("mockWarningLogger", Logger.warning);

export function useMockWarningLogger() {
  spyOn(Logger, "warning").and.callFake(mockWarningLogger);
  return mockWarningLogger;
}
