import { Inject, Injectable, InjectionToken } from "@angular/core";
import { IDeploymentRuntimeConfig } from "packages/data-models";
import { SyncServiceBase } from "../syncService.base";

/**
 * Token to inject deployment config value into any service.
 * This is populated from json file before platform load, as part of src\main.ts
 *
 * Can be used directly in the constructor via `@Inject(DEPLOYMENT_CONFIG)`,
 * or values accessed from the DeploymentService
 */
export const DEPLOYMENT_CONFIG: InjectionToken<IDeploymentRuntimeConfig> =
  new InjectionToken<IDeploymentRuntimeConfig>("Application Configuration");

@Injectable({ providedIn: "root" })
/**
 * Deployment runtime config settings
 *
 * NOTE - this is intialized using an `APP_INITIALIZER` token within
 * the main app.module.ts and will block all other services from loading until
 * it is fully initialised
 *
 * Services that access the deployment config therefore do not need to await
 * DeploymentService init/ready methods.
 */
export class DeploymentService extends SyncServiceBase {
  constructor(@Inject(DEPLOYMENT_CONFIG) public readonly config: IDeploymentRuntimeConfig) {
    super("Deployment Service");
  }
}
