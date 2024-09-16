import { NgModule } from "@angular/core";

import { AnalyticsModule } from "./shared/services/analytics";

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
@NgModule({ imports: [AnalyticsModule] })
export class DeploymentFeaturesModule {}
