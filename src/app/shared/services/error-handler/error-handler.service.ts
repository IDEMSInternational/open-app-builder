import { ErrorHandler, Injectable, Injector } from "@angular/core";
import { Capacitor } from "@capacitor/core";
import { Device } from "@capacitor/device";
import * as Sentry from "@sentry/angular";
import { environment } from "src/environments/environment";
import { fromError as getStacktraceFromError } from "stacktrace-js";
import { CrashlyticsService } from "../crashlytics/crashlytics.service";
import { APP_VERSION } from "src/environments/version";

@Injectable({
  providedIn: "root",
})
export class ErrorHandlerService extends ErrorHandler {
  private initialised = false;
  private sentryEnabled = false;
  private crashlyticsEnabled = false;

  // Error handling is important and needs to be loaded first.
  // Because of this we should manually inject the services with Injector.
  constructor(private injector: Injector) {
    super();
  }

  /**
   * Initialise error logging services crashlytics and sentry/glitchtip
   * if keys provided
   *
   * TODO - can possibly refactor init methods to extend syncBase after #1664 merge
   * (although workaround required as cannot extend multiple services)
   */
  private async initialise() {
    const { production, deploymentConfig, firebaseConfig } = environment;
    if (production && deploymentConfig?.error_logging?.dsn) {
      await this.initialiseSentry();
      this.sentryEnabled = true;
    }
    if (production && firebaseConfig?.apiKey && Capacitor.isNativePlatform()) {
      // crashlytics initialised in app component so omitted here
      this.crashlyticsEnabled = true;
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
    if (this.crashlyticsEnabled) {
      this.logToCrashlytics(error);
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
    const { deploymentConfig, production } = environment;
    const { error_logging, name } = deploymentConfig;
    Sentry.init({
      dsn: error_logging.dsn,
      environment: production ? "production" : "development",
      release: `${name}-${APP_VERSION.name}`,
      autoSessionTracking: false,
      attachStacktrace: true,
      enabled: true,
      tracesSampleRate: 0, // ensure performance traces not sent (not installed)
    });
    const { uuid } = await Device.getId();
    Sentry.setUser({ id: uuid });
  }

  private async logToCrashlytics(error: Error) {
    const crashlyticsService = this.injector.get(CrashlyticsService);
    if (crashlyticsService) {
      const stacktrace = await getStacktraceFromError(error);
      crashlyticsService.recordException({ message: error.message, stacktrace });
    }
  }
}
