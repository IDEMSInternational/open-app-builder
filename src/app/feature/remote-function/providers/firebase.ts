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

/** Max time to wait for an appCheck token before reporting it unavailable to the debug page */
const APP_CHECK_TOKEN_TIMEOUT_MS = 30 * 1000;

/**
 * Unified provider to support firestore functions
 * with app-check on both web and native
 *
 * AppCheck is handled in two parts, as they have very different cost profiles:
 * - Registering the provider is local and fast, so is awaited before invoking a function.
 * - Retrieving a token can hang for minutes on native (e.g. iOS App Attest attestation), so is only
 *   ever fetched in the background. The token retrieved here is never attached to a function call -
 *   the firebase sdk fetches its own when invoking - it exists to populate the debug page, and to
 *   prompt first-time attestation ahead of the sdk needing a token of its own.
 *
 * AppCheck failures are reported via the `appCheckTokenError` signal and never rejected, so will not
 * appear as an `initError` on the consuming `RemoteFunctionService`. Function calls are still
 * attempted when appCheck is unavailable (and will be rejected by the backend if enforced)
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

  /** Set if the appCheck provider could not be registered, in which case no token is retrievable */
  private appCheckSetupFailed = false;

  /** Incremented per token request, so that stale results can be discarded */
  private appCheckTokenRequestId = 0;

  /** Overridable in tests to avoid waiting on the full timeout */
  protected appCheckTokenTimeoutMs = APP_CHECK_TOKEN_TIMEOUT_MS;

  constructor(private injector: Injector) {}

  /**
   * Register the appCheck provider ahead of function calls, and trigger a background token fetch.
   * Can be called optimistically, or will be triggered on first function invocation.
   * Only ever runs once, and always resolves - see class notes
   **/
  public async initialise() {
    // wrap init methods in promise to prevent duplicate requests
    this.appCheckInitPromise ??= this.handleInitialise();
    return this.appCheckInitPromise;
  }

  /**
   * Fetch a fresh token for the debug page, bypassing any cached token.
   * Never joins an in-flight background fetch, so that a hung fetch cannot block the page
   */
  public async refreshAppCheckToken() {
    await this.initialise();
    // Without a registered provider there is no token to retrieve, and setup is not retried, so
    // leave the (more informative) setup error in place rather than replacing it with a token error
    if (this.appCheckSetupFailed) return;
    return this.updateAppCheckToken(true);
  }

  private async handleInitialise() {
    this.region = this.deploymentService.config.firebase?.functions?.region;
    const firebaseService = this.injector.get(FirebaseService);
    firebaseService.ready();
    try {
      await this.setupAppCheck();
    } catch (error) {
      this.appCheckSetupFailed = true;
      this.setAppCheckError("setup failed", error);
      // NOTE - the failed promise is deliberately cached rather than cleared, as re-attempting
      // setup on every invocation would stall each call for as long as this first failure took
      return;
    }
    void this.updateAppCheckToken(false);
  }

  /**
   * Retrieve an appCheck token and update the debug signals to reflect the outcome.
   * Requests cannot be cancelled, so a slow request that settles after a newer one has already
   * reported is discarded rather than allowed to overwrite it
   */
  private async updateAppCheckToken(forceRefresh: boolean) {
    const requestId = ++this.appCheckTokenRequestId;
    const isStale = () => requestId !== this.appCheckTokenRequestId;
    try {
      const token = await this.withTokenTimeout(this.getAppCheckToken(forceRefresh));
      if (isStale()) {
        console.log("[App check] ignoring stale token result");
        return;
      }
      this.appCheckToken.set(token);
      this.appCheckTokenError.set(undefined);
    } catch (error) {
      if (isStale()) {
        console.log("[App check] ignoring stale token error", error);
        return;
      }
      this.appCheckToken.set(undefined);
      this.setAppCheckError("token unavailable", error);
    }
  }

  /**
   * Reject if the request has not settled within `appCheckTokenTimeoutMs`.
   * NOTE - this does not cancel the underlying request, which cannot be aborted
   */
  private async withTokenTimeout(request: Promise<GetTokenResult>) {
    let timeoutRef: ReturnType<typeof setTimeout>;
    const timeout = new Promise<never>((_, reject) => {
      timeoutRef = setTimeout(
        () => reject(new Error(`Timed out after ${this.appCheckTokenTimeoutMs}ms`)),
        this.appCheckTokenTimeoutMs
      );
    });
    // The request outlives a lost race, so ensure a later rejection is always handled
    void request.catch(() => {});
    return Promise.race([request, timeout]).finally(() => clearTimeout(timeoutRef));
  }

  private setAppCheckError(context: string, error: unknown) {
    console.error(`[App check] ${context}`, error);
    this.appCheckTokenError.set(error instanceof Error ? error.message : String(error));
  }

  public async invoke(functionName: string, params: RemoteFunctionInvokeParams) {
    // Ensures the appCheck provider is registered. Never rejects - see class notes
    await this.initialise();

    let error: RemoteFunctionErrorResponse;
    const data = await this.callFunction(functionName, params).catch((err) => {
      const { code, message, details, ...rest } = err;
      error = { code, message, details };
      console.error(`[Firebase Functions] ${functionName} `, { ...error, ...rest });
    });
    return { data, error };
  }

  // TODO - support for separate callable vs http function
  // TODO - function streaming

  // Plugin calls are wrapped below so that native calls can be stubbed in tests

  protected async callFunction(functionName: string, params: RemoteFunctionInvokeParams) {
    return FirebaseFunctions.callByName({
      name: functionName,
      data: params,
      region: this.region,
    });
  }

  protected async getAppCheckToken(forceRefresh: boolean) {
    return FirebaseAppCheck.getToken({ forceRefresh });
  }

  protected async setupAppCheck() {
    // Native platform - provider configured
    if (Capacitor.isNativePlatform()) {
      // Attestation (ios App Attest, android Play Integrity) is unavailable on simulators and
      // emulators, so non-production builds use the debug provider instead. Unlike web the token
      // value cannot be passed from here, so must be set per-platform - see README
      await FirebaseAppCheck.initialize({
        isTokenAutoRefreshEnabled: true,
        debugToken: !environment.production,
      });
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
