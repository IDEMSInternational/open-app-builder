import {
  DEPLOYMENT_CONFIG_EXAMPLE_DEFAULTS,
  getDefaultAppConfig,
  IDeploymentConfig,
} from "data-models";
import path from "path";
import { DEPLOYMENTS_PATH } from "../../paths";
import { loadDeploymentJson } from "./utils";

/** Adjust config version to force new config set */
export const DEPLOYMENT_CONFIG_VERSION = 20230228.0;

export interface IDeploymentConfigJson extends IDeploymentConfig {
  _workspace_path: string;
  _config_ts_path: string;
  _config_version: number;
}

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
  const baseConfig = loadDeploymentJson(parentWorkspace);
  // add parent_config meta
  baseConfig._parent_config = { name: baseConfig.name, _workspace_path: parentWorkspace };
  baseConfig.name = options.name;
  return baseConfig as IDeploymentConfig;
}
