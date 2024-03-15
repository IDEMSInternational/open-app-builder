import { ErrorHandler, Injectable, Injector } from "@angular/core";
import { Capacitor } from "@capacitor/core";
import { Device } from "@capacitor/device";
import * as Sentry from "@sentry/angular-ivy";
import { environment } from "src/environments/environment";
import { GIT_SHA } from "src/environments/sha";
import { fromError as getStacktraceFromError } from "stacktrace-js";
import { CrashlyticsService } from "../crashlytics/crashlytics.service";
import { FirebaseService } from "../firebase/firebase.service";

@Injectable({
  providedIn: "root",
})
export class ErrorHandlerService extends ErrorHandler {
  private initialised = false;
  private sentryEnabled = false;
  private crashlyticsEnabled = false;

  // Error handling is important and needs to be loaded first.
  // Because of this we should manually inject the services with Injector.
  constructor(private injector: Injector, private firebaseService: FirebaseService) {
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
    const { production, deploymentConfig } = environment;
    const { error_logging, firebase } = deploymentConfig;
    if (production && error_logging?.dsn) {
      await this.initialiseSentry();
      this.sentryEnabled = true;
    }
    if (production && this.firebaseService.app && Capacitor.isNativePlatform()) {
      // crashlytics initialised in app component so omitted here
      this.crashlyticsEnabled = firebase.crashlytics.enabled;
    }
    this.initialised = true;
  }

  /** Log an error to reporting services */
  public async logError(error: Error) {
    if (!this.initialised) {
      await this.initialise();
    }
    if (this.sentryEnabled) {
      Sentry.captureException(error);
    }
    if (this.crashlyticsEnabled) {
      this.logToCrashlytics(error);
    }
  }

  /**
   * Custom error handling. Will always call default handler, as well
   * as any 3rd party integrations
   */
  public async handleError(error: Error) {
    await this.logError(error);
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
      dsn: error_logging?.dsn,
      environment: production ? "production" : "development",
      release: `${name}-${version}-${GIT_SHA}`,
      autoSessionTracking: false,
      attachStacktrace: true,
      enabled: true,
      tracesSampleRate: 0, // ensure performance traces not sent (not installed)
    });
    const { identifier: uuid } = await Device.getId();
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
