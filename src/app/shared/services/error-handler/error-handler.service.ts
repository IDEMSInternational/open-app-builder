import { ErrorHandler, Injectable, Injector } from "@angular/core";
import { Capacitor } from "@capacitor/core";
import { fromError as getStacktraceFromError } from "stacktrace-js";
import { CrashlyticsService } from "../crashlytics/crashlytics.service";

@Injectable({
  providedIn: "root",
})
export class ErrorHandlerService extends ErrorHandler {
  // Error handling is important and needs to be loaded first.
  // Because of this we should manually inject the services with Injector.
  constructor(private injector: Injector) {
    super();
  }

  /**
   * Custom error handling. On web this uses the default error handling
   * (console logs and modal in dev mode, ignored in production), on android
   * this logs to firebase crashlytics
   */
  handleError(error: Error) {
    if (Capacitor.isNativePlatform()) {
      return this.logToCrashlytics(error);
    } else {
      super.handleError(error);
    }
  }

  private async logToCrashlytics(error: Error) {
    const crashlyticsService = this.injector.get(CrashlyticsService);
    if (crashlyticsService) {
      const stacktrace = await getStacktraceFromError(error);
      crashlyticsService.recordException({ message: error.message, stacktrace });
    }
  }
}
