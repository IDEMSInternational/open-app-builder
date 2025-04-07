import { Injectable, Injector } from "@angular/core";

import { SharedDataProviderBase } from "./providers/base";
import { getDataProvider } from "./providers";
import { SharedDataActionFactory } from "./shared-data.actions";
import { AsyncServiceBase } from "src/app/shared/services/asyncService.base";
import { TemplateActionRegistry } from "src/app/shared/components/template/services/instance/template-action.registry";
import { DeploymentService } from "src/app/shared/services/deployment/deployment.service";

@Injectable({
  providedIn: "root",
})
export class SharedDataService extends AsyncServiceBase {
  public provider: SharedDataProviderBase;

  constructor(
    private deploymentService: DeploymentService,
    private templateActionRegistry: TemplateActionRegistry,
    private injector: Injector
  ) {
    super("Shared Data");
    this.provider = getDataProvider(this.config.provider);
    this.registerInitFunction(this.initialise);
  }

  private get config() {
    return this.deploymentService.config.shared_data || {};
  }

  private async initialise() {
    await this.provider.initialise(this.injector);
    const { shared_data } = new SharedDataActionFactory(this.provider);
    this.templateActionRegistry.register({ shared_data });
  }
}
