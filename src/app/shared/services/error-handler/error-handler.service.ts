import { ErrorHandler, Injectable, Injector } from "@angular/core";
import { Device } from "@capacitor/device";
import * as Sentry from "@sentry/angular";
import { environment } from "src/environments/environment";
import { fromError as getStacktraceFromError } from "stacktrace-js";
import { CrashlyticsService } from "../crashlytics/crashlytics.service";

@Injectable({
  providedIn: "root",
})
export class ErrorHandlerService extends ErrorHandler {
  private initialised = false;
  private sentryEnabled = false;

  // Error handling is important and needs to be loaded first.
  // Because of this we should manually inject the services with Injector.
  constructor(private injector: Injector) {
    super();
  }

  /**
   * TODO - can likely refactor method after #1664 merge
   * (TBC - as cannot extend multiple services at same time)
   */
  private async initialise() {
    const { production, deploymentConfig } = environment;
    if (production && deploymentConfig?.error_logging?.dsn) {
      await this.initialiseSentry();
    }
    this.initialised = true;
  }

  /**
   * Custom error handling. Will always call default handler, as well
   * as any 3rd party integrations
   */
  async handleError(error: Error) {
    if (!this.initialised) {
      await this.initialise();
    }
    if (this.sentryEnabled) {
      Sentry.captureException(error);
    }
    super.handleError(error);
  }

  /**
   * Initialise sentry to record remote logs. Note, the same code can be used
   * to initialise either sentry or glitchtip endpoints.
   * By default logs will be associated with both deployment name and app version
   *
   * TODO - can also be integrated with Capacitor (and crashlytics possibly removed)
   * https://docs.sentry.io/platforms/javascript/guides/capacitor/
   */
  private async initialiseSentry() {
    const { deploymentConfig, version, production } = environment;
    const { error_logging, name } = deploymentConfig;
    Sentry.init({
      dsn: error_logging.dsn,
      environment: production ? "production" : "development",
      release: `${name}-${version}`,
      autoSessionTracking: false,
      attachStacktrace: true,
      enabled: true,
      tracesSampleRate: 0, // ensure performance traces not sent (not installed)
    });
    const { uuid } = await Device.getId();
    Sentry.setUser({ id: uuid });
    this.sentryEnabled = true;
  }

  private async logToCrashlytics(error: Error) {
    const crashlyticsService = this.injector.get(CrashlyticsService);
    if (crashlyticsService) {
      const stacktrace = await getStacktraceFromError(error);
      crashlyticsService.recordException({ message: error.message, stacktrace });
    }
  }
}
