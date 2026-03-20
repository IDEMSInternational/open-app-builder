import { Injectable, Injector } from "@angular/core";

import { RemoteFunctionInvokeParams, RemoteFunctionProviderBase } from "./providers/base";
import { getFunctionProvider } from "./providers";
import { AsyncServiceBase } from "src/app/shared/services/asyncService.base";
import { DeploymentService } from "src/app/shared/services/deployment/deployment.service";
import { DynamicDataService } from "src/app/shared/services/dynamic-data/dynamic-data.service";

@Injectable({
  providedIn: "root",
})
export class RemoteFunctionService extends AsyncServiceBase {
  public provider: RemoteFunctionProviderBase;

  constructor(
    private deploymentService: DeploymentService,
    private injector: Injector,
    private dynamicDataService: DynamicDataService
  ) {
    super("Remote Function");
    this.provider = getFunctionProvider(this.config.provider);
    this.registerInitFunction(this.initialise, "defer");
  }

  /**
   * Invoke a remote function by name with provided parameters.
   * Public wrapper around the configured provider.
   */
  public async invoke(functionName: string, params: RemoteFunctionInvokeParams) {
    return await this.provider.invoke(functionName, params);
  }

  private get config() {
    return this.deploymentService.config.remote_functions;
  }

  private async initialise() {
    await this.provider.initialise(this.injector);
    await this.dynamicDataService.ready();
  }
}
