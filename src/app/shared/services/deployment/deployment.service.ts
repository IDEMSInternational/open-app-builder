import { Injectable, signal } from "@angular/core";
import { AsyncServiceBase } from "../asyncService.base";
import { HttpClient } from "@angular/common/http";
import { catchError, map, of, firstValueFrom } from "rxjs";
import { DEPLOYMENT_RUNTIME_CONFIG_DEFAULTS, IDeploymentRuntimeConfig } from "packages/data-models";

@Injectable({ providedIn: "root" })
/**
 * Deployment runtime config settings
 *
 * NOTE - this is intialized using an `APP_INITIALIZER` token within
 * the main app.module.ts
 */
export class DeploymentService extends AsyncServiceBase {
  constructor(private http: HttpClient) {
    super("Deployment Service");
    this.registerInitFunction(this.initialise);
  }

  /** Private writeable config to allow population from JSON */
  private _config = signal(DEPLOYMENT_RUNTIME_CONFIG_DEFAULTS);

  /** Read-only access to deployment runtime config */
  public config = this._config.asReadonly();

  /** Load active deployment configuration from JSON file */
  private async initialise() {
    const deployment = await firstValueFrom(this.loadDeployment());
    if (deployment) {
      this._config.set(deployment);
    }
  }

  private loadDeployment() {
    return this.http.get("assets/app_data/deployment.json").pipe(
      catchError(() => {
        console.warn("No deployment config available");
        return of(null);
      }),
      map((v) => v as IDeploymentRuntimeConfig)
    );
  }
}
