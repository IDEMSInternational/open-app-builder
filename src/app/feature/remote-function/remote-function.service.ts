import { Injectable, Injector } from "@angular/core";

import { RemoteFunctionProviderBase } from "./providers/base";
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

  private get config() {
    return this.deploymentService.config.remote_function;
  }

  private async initialise() {
    await this.provider.initialise(this.injector);
    await this.dynamicDataService.ready();
  }
}
