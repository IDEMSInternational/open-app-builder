import { NgModule } from "@angular/core";

import { AnalyticsModule } from "./shared/services/analytics";
import { NavStackModule } from "./feature/nav-stack/nav-stack.module";
import { AuthModule } from "./shared/services/auth/auth.module";
import { CampaignModule } from "./feature/campaign/campaign.module";
import { provideSharedData } from "./feature/shared-data";

/**
 * Module imports required for specific deployment features
 *
 * NOTE - as angular needs all modules to be statically defined during compilation
 * it is not possible to conditionally load modules at runtime.
 *
 * Therefore all modules are defined and loaded as part of the core build process,
 * but it is still possible to override this file to create specific feature-optimised builds
 *
 * This is a feature marked for future implementation
 */
@NgModule({
  imports: [
    /* */
    AuthModule,
    AnalyticsModule,
    CampaignModule,
    NavStackModule,
    /* */
  ],
  // Modules defined as modern angular providers
  providers: [
    /** */
    provideSharedData(),
  ],
})
export class DeploymentFeaturesModule {}
