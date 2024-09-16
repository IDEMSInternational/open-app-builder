import { NgModule } from "@angular/core";

import {
  MATOMO_CONFIGURATION,
  MatomoConfiguration,
  provideMatomo,
  withRouter,
} from "ngx-matomo-client";

import { IDeploymentRuntimeConfig } from "packages/data-models";
import { DEPLOYMENT_CONFIG } from "../deployment/deployment.service";
import { environment } from "src/environments/environment";

/** When running locally can configure to target local running containing (if required) */
const devConfig: MatomoConfiguration = {
  disabled: true,
  trackerUrl: "http://localhost/analytics",
  siteId: 1,
};

/**
 * When configuring the analytics module
 * This should be imported into the main app.module.ts
 */
@NgModule({
  imports: [],
  providers: [
    provideMatomo(null, withRouter()),
    // Dynamically provide the configuration used by the matomo provider so that it can
    // access deployment config (injected from token)
    {
      provide: MATOMO_CONFIGURATION,
      useFactory: (deploymentConfig: IDeploymentRuntimeConfig): MatomoConfiguration => {
        if (environment.production) {
          const { enabled, endpoint, siteId } = deploymentConfig.analytics;
          return { disabled: !enabled, siteId, trackerUrl: endpoint };
        } else {
          return devConfig;
        }
      },
      deps: [DEPLOYMENT_CONFIG],
    },
  ],
})
export class AnalyticsModule {}
