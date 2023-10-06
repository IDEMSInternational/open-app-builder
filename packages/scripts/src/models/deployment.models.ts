import { DEPLOYMENT_CONFIG_EXAMPLE_DEFAULTS, getDefaultAppConfig } from "data-models";
import type { IDeploymentConfig, IDeploymentConfigJson } from "data-models";
import path from "path";

import { DEPLOYMENTS_PATH } from "../paths";
import { DeploymentManager } from "../commands/deployment/lib/manager";

// re-export of type for convenience
export type { IDeploymentConfigJson };

/** Create a new deployment config with default values */
export function generateDeploymentConfig(name: string): IDeploymentConfig {
  const config = DEPLOYMENT_CONFIG_EXAMPLE_DEFAULTS;
  config.name = name;
  config.app_config = getDefaultAppConfig();
  return config;
}

/** Load and extend an existing deployment config **/
export function extendDeploymentConfig(options: {
  parent: string;
  name: string;
}): IDeploymentConfig {
  const parentWorkspace = path.resolve(DEPLOYMENTS_PATH, options.parent);

  // TODO - create ref that can be populated later
  const baseConfig = {} as IDeploymentConfig;

  // add parent_config meta, remove git references
  baseConfig._parent_config = { name: baseConfig.name, _workspace_path: parentWorkspace };
  baseConfig.name = options.name;
  if (baseConfig.git.content_repo) {
    baseConfig._parent_config.git = baseConfig.git;
    delete baseConfig.git;
  }
  return baseConfig as IDeploymentConfig;
}

/** Create a single manager for tracking active deployment */
export const ActiveDeployment = new DeploymentManager();
