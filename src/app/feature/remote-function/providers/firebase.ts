import { inject, Injector, signal } from "@angular/core";
import { Capacitor } from "@capacitor/core";
import { FirebaseAppCheck, GetTokenResult } from "@capacitor-firebase/app-check";
import { FirebaseFunctions } from "@capacitor-firebase/functions";
import { ReCaptchaEnterpriseProvider } from "firebase/app-check";

import {
  RemoteFunctionErrorResponse,
  RemoteFunctionInvokeParams,
  RemoteFunctionProviderBase,
} from "./base";
import { FirebaseService } from "src/app/shared/services/firebase/firebase.service";
import { environment } from "src/environments/environment";
import { DeploymentService } from "src/app/shared/services/deployment/deployment.service";

/**
 * Static token to register in app check to test when running on localhost
 * This token should be registered within your firebase console
 */
const APP_CHECK_DEBUG_TOKEN = "00000000-0000-4000-a000-000000000000";

/**
 * Unified provider to support firestore functions
 * with app-check on both web and native
 *
 *
 */
export class FirebaseFunctionProvider implements RemoteFunctionProviderBase {
  // Provide public access to token and errors for use in debug page
  public appCheckToken = signal<GetTokenResult | undefined>(undefined);
  public appCheckTokenError = signal<string | undefined>(undefined);
  public appCheckDebugToken = signal<string | undefined>(
    environment.production ? undefined : APP_CHECK_DEBUG_TOKEN
  );

  /** Functions region - if `undefined` firebase assumes "us-central1" */
  private region?: string;

  private deploymentService = inject(DeploymentService);

  private appCheckInitPromise?: Promise<void>;

  constructor(private injector: Injector) {}

  /**
   * Ensures service has initialised to register appCheck token ahead of function calls
   * Can be called optimistically, or will be triggered on first function invocation
   **/
  public async initialise(forceRefresh = false) {
    if (forceRefresh || !this.appCheckInitPromise) {
      // wrap init methods in promise to prevent duplicate requests
      this.appCheckInitPromise = this.handleInitialise();
    }
    return this.appCheckInitPromise;
  }

  private async handleInitialise() {
    this.region = this.deploymentService.config.firebase?.functions?.region;
    const firebaseService = this.injector.get(FirebaseService);
    firebaseService.ready();
    try {
      await this.setupAppCheck();
      const token = await FirebaseAppCheck.getToken();
      this.appCheckToken.set(token);
      this.appCheckTokenError.set(undefined);
    } catch (error) {
      console.error("[App check]", error);
      this.appCheckTokenError.set(error.message);
      this.appCheckInitPromise = undefined; // Allow retry on failure
      throw error;
    }
  }

  public async invoke(functionName: string, params: RemoteFunctionInvokeParams) {
    // Ignore error here as it is captured in appCheckTokenError signal
    // and we still want to try the function call (which might fail anyway if app check is enforced)
    await this.initialise().catch(() => {});

    let error: RemoteFunctionErrorResponse;
    const data = await FirebaseFunctions.callByName({
      name: functionName,
      data: params,
      region: this.region,
    }).catch((err) => {
      const { code, message, details, ...rest } = err;
      error = { code, message, details };
      console.error(`[Firebase Functions] ${functionName} `, { ...error, ...rest });
    });
    return { data, error };
  }

  // TODO - support for separate callable vs http function
  // TODO - function streaming

  private async setupAppCheck() {
    // Native platform - provider configured
    if (Capacitor.isNativePlatform()) {
      await FirebaseAppCheck.initialize({ isTokenAutoRefreshEnabled: true });
    } else {
      const siteKey = this.deploymentService.config.firebase?.appCheck?.recaptchaEnterpriseSiteKey;
      if (!siteKey) {
        throw new Error("App Check: recaptchaEnterpriseSiteKey not configured for web.");
      }

      await FirebaseAppCheck.initialize({
        isTokenAutoRefreshEnabled: true,
        provider: new ReCaptchaEnterpriseProvider(siteKey),
        debugToken: environment.production ? false : APP_CHECK_DEBUG_TOKEN,
      });
    }
  }
}
