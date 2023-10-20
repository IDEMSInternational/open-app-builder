import { Logger } from "shared/src/utils/logging/console-logger";

/*************************************************************
 * Test utilties
 *************************************************************/

/** Mock function that will replace default `Logger` function to instead just record any invocations */
export function useMockErrorLogger() {
  const mockErrorLogger = jasmine.createSpy("mockErrorLogger", Logger.error);
  spyOn(Logger, "error").and.callFake(mockErrorLogger);
  return mockErrorLogger;
}

/** Mock function that will replace default `Logger` function to instead just record any invocations */
export function useMockWarningLogger() {
  const mockWarningLogger = jasmine.createSpy("mockWarningLogger", Logger.warning);
  spyOn(Logger, "warning").and.callFake(mockWarningLogger);
  return mockWarningLogger;
}
