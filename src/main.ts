import { enableProdMode } from "@angular/core";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { Capacitor } from "@capacitor/core";
import { defineCustomElements } from "@ionic/pwa-elements/loader";

import { AppModule } from "./app/app.module";
import { environment } from "./environments/environment";
import { DEPLOYMENT_RUNTIME_CONFIG_DEFAULTS, IDeploymentRuntimeConfig } from "packages/data-models";
import { DEPLOYMENT_CONFIG } from "./app/shared/services/deployment/deployment.service";

if (environment.production) {
  enableProdMode();
}

/** Load deployment config from asset json, returning default config if not available*/
const loadConfig = async (): Promise<IDeploymentRuntimeConfig> => {
  const res = await fetch("/assets/app_data/deployment.json");
  if (res.status === 200) {
    const deploymentConfig = <IDeploymentRuntimeConfig>await res.json();
    console.log("[DEPLOYMENT] config loaded", deploymentConfig);
    return deploymentConfig;
  } else {
    console.warn("[DEPLOYMENT] config not found, using defaults");
    return { ...DEPLOYMENT_RUNTIME_CONFIG_DEFAULTS, app_config: {} as any };
  }
};

/**
 * Initialise platform once deployment config has loaded, setting the value of the
 * global DEPLOYMENT_CONFIG injection token from the loaded json
 * https://stackoverflow.com/a/62151011
 *
 * The configuration is loaded before the rest of the platform so that config values
 * can be used to configure modules imported in app.module.ts
 */
loadConfig().then((deploymentConfig) => {
  platformBrowserDynamic([{ provide: DEPLOYMENT_CONFIG, useValue: deploymentConfig }])
    .bootstrapModule(AppModule)
    .catch((err) => console.log(err));

  if (!Capacitor.isNativePlatform()) {
    // Call PWA custom element loader after the platform has been bootstrapped
    defineCustomElements(window);
  }
});
