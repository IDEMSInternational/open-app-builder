import { Injector } from "@angular/core";
import { Capacitor } from "@capacitor/core";
import { FirebaseAppCheck, GetTokenResult } from "@capacitor-firebase/app-check";
import { FirebaseFunctions } from "@capacitor-firebase/functions";
import { ReCaptchaEnterpriseProvider } from "firebase/app-check";

import { RemoteFunctionInvokeParams, RemoteFunctionProviderBase } from "./base";
import { FirebaseService } from "src/app/shared/services/firebase/firebase.service";
import { environment } from "src/environments/environment";

/**
 * Unified provider to support firestore functions
 * with app-check on both web and native
 *
 *
 */
export class FirebaseFunctionProvider implements RemoteFunctionProviderBase {
  private appCheckToken?: GetTokenResult;

  public async initialise(injector: Injector): Promise<void> {
    const firebaseService = injector.get(FirebaseService);

    // TODO - app-check and function specific config from deployment config?
    // TODO - ensure enabled
    firebaseService.ready();
  }

  public async invoke(functionName: string, params: RemoteFunctionInvokeParams) {
    await this.setupAppCheck();
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
    // TODO - decide if auto-refresh useful or manual refresh
    // (calling http function would require manual header)
    if (this.appCheckToken) return;

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
    this.appCheckToken = await FirebaseAppCheck.getToken({ forceRefresh: true });
  }
}
