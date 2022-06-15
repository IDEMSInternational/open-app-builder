import {
  DEPLOYMENT_CONFIG_EXAMPLE_DEFAULTS,
  getDefaultAppConstants,
  IDeploymentConfig,
} from "data-models";
import path from "path";
import { DEPLOYMENTS_PATH } from "../../paths";
import { loadDeploymentJson } from "./utils";

/** Adjust config version to force new config set */
export const DEPLOYMENT_CONFIG_VERSION = 2;

export interface IDeploymentConfigJson extends IDeploymentConfig {
  _workspace_path: string;
  _config_ts_path: string;
  _config_version: number;
}

/** Create a new deployment config with default values */
export function generateDeploymentConfig(name: string): IDeploymentConfig {
  const config = DEPLOYMENT_CONFIG_EXAMPLE_DEFAULTS;
  config.name = name;
  config.app_constants = getDefaultAppConstants();
  return config;
}

/** Load and extend an existing deployment config **/
export function extendDeploymentConfig(options: {
  parent: string;
  name: string;
}): IDeploymentConfig {
  const parentWorkspace = path.resolve(DEPLOYMENTS_PATH, options.parent);
  const baseConfig = loadDeploymentJson(parentWorkspace);
  // add parent_config meta, remove git references
  baseConfig._parent_config = { name: baseConfig.name, _workspace_path: parentWorkspace };
  baseConfig.name = options.name;
  if (baseConfig.git.content_repo) {
    baseConfig._parent_config.git = baseConfig.git;
    delete baseConfig.git;
  }
  return baseConfig as IDeploymentConfig;
}
