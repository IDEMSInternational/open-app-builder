import { Injector, signal } from "@angular/core";
import { Capacitor } from "@capacitor/core";
import { FirebaseAppCheck, GetTokenResult } from "@capacitor-firebase/app-check";
import { FirebaseFunctions } from "@capacitor-firebase/functions";
import { ReCaptchaEnterpriseProvider } from "firebase/app-check";

import { RemoteFunctionInvokeParams, RemoteFunctionProviderBase } from "./base";
import { FirebaseService } from "src/app/shared/services/firebase/firebase.service";
import { environment } from "src/environments/environment";
import { DeploymentService } from "src/app/shared/services/deployment/deployment.service";

/**
 * Unified provider to support firestore functions
 * with app-check on both web and native
 *
 *
 */
export class FirebaseFunctionProvider implements RemoteFunctionProviderBase {
  private appCheckToken = signal<GetTokenResult | undefined>(undefined);
  private appCheckTokenError = signal<boolean>(false);

  /** Functions region - if `undefined` firebase assumes "us-central1" */
  private region?: string;

  private deploymentService = inject(DeploymentService);

  public async initialise(injector: Injector): Promise<void> {
    this.region = this.deploymentService.config.firebase?.functions?.region;

    const firebaseService = injector.get(FirebaseService);

    // TODO - app-check and function specific config from deployment config?
    // TODO - ensure enabled
    firebaseService.ready();
    try {
      await this.setupAppCheck();
      const token = await FirebaseAppCheck.getToken({ forceRefresh: true });
      this.appCheckToken.set(token);
      // TODO - provide way to refresh token
      // TODO -
    } catch (error) {
      console.error("[App check]", error);
      this.appCheckTokenError.set(true);
    }
  }

  public async invoke(functionName: string, params: RemoteFunctionInvokeParams) {
    const result = await FirebaseFunctions.callByName({
      name: functionName,
      data: params,
      region: "", // TODO - handle deployed region from config
      // TODO - include app-check token
    });
    console.log({ result });
  }

  // TODO - support for separate callable vs http function
  // TODO - function streaming

  private async setupAppCheck() {
    // Native platform - provider configured
    if (Capacitor.isNativePlatform()) {
      await FirebaseAppCheck.initialize({ isTokenAutoRefreshEnabled: true });
    } else {
      await FirebaseAppCheck.initialize({
        isTokenAutoRefreshEnabled: true,
        provider: new ReCaptchaEnterpriseProvider("myKey"),
        debugToken: environment.production ? false : true,
      });
    }
  }
}
