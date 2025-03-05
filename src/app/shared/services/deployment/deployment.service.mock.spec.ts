import { DEPLOYMENT_RUNTIME_CONFIG_DEFAULTS, IDeploymentRuntimeConfig } from "packages/data-models";
import { DeploymentService } from "./deployment.service";

/**
 * Pass `config` constructor arg to provide a custom configuration, or leave empty for defaults
 */
export class MockDeploymentService extends DeploymentService {
  constructor(config?: Partial<IDeploymentRuntimeConfig>) {
    super((config as IDeploymentRuntimeConfig) || DEPLOYMENT_RUNTIME_CONFIG_DEFAULTS);
  }
}
