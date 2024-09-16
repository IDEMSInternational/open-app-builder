import { Inject, Injectable, InjectionToken } from "@angular/core";
import { IDeploymentRuntimeConfig } from "packages/data-models";
import { SyncServiceBase } from "../syncService.base";

/**
 * Token to inject deployment config value into any service.
 * This is populated from json file before platform load, as part of src\main.ts
 *
 * Can be used directly by any service or module initialised at any time
 * (including app.module.ts).
 *
 * @example Inject into service
 * ```ts
 * constructor(@Inject(DEPLOYMENT_CONFIG))
 * ```
 * @example Inject into module
 * ```
 * {provide: MyModule, useFactory:(config)=>{...}, deps: [DEPLOYMENT_CONFIG]`}
 * ```
 */
export const DEPLOYMENT_CONFIG: InjectionToken<IDeploymentRuntimeConfig> =
  new InjectionToken<IDeploymentRuntimeConfig>("Application Configuration");

/**
 * The deployment service provides access to values loaded from the deployment json file
 * It is an alternative to injecting directly via `@Inject(DEPLOYMENT_CONFIG)`
 */
@Injectable({ providedIn: "root" })
export class DeploymentService extends SyncServiceBase {
  constructor(@Inject(DEPLOYMENT_CONFIG) public readonly config: IDeploymentRuntimeConfig) {
    super("Deployment Service");
  }
}
