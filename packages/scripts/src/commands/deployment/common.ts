import type { IDeploymentConfig } from "data-models";

/** Adjust config version to force new config set */
export const DEPLOYMENT_CONFIG_VERSION = 2;

export interface IDeploymentConfigJson extends IDeploymentConfig {
  _workspace_path: string;
  _config_ts_path: string;
  _config_version: number;
}
