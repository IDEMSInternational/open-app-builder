import { existsSync } from "fs";
import { logWarning } from "shared";
import { readJSONSync } from "fs-extra";
import path from "path";

import { DEPLOYMENT_CONFIG_EXAMPLE_DEFAULTS, getDefaultAppConfig } from "data-models";
import type { IDeploymentConfig, IDeploymentConfigJson } from "data-models";

import { DEPLOYMENTS_PATH } from "../../paths";
import { getStackFileNames, loadDeploymentJson } from "./utils";

// re-export of type for convenience
export type { IDeploymentConfigJson };

/** Create a new deployment config with default values */
export function generateDeploymentConfig(name: string): IDeploymentConfig {
  const config = DEPLOYMENT_CONFIG_EXAMPLE_DEFAULTS;
  config.name = name;
  config.app_config = getDefaultAppConfig();
  return config;
}

/**
 * Read a json file from deployment encrypted folder
 * @param filename name of json to read config from (should already be decrypted)
 * @returns parsed json if exists, null if does not exist
 **/
export function loadEncryptedConfig(filename: string) {
  // Determine path to deployment config ts that called function for source of encrypted config
  const configTsPath = getStackFileNames().find((filePath) => filePath.includes(".idems_app"));
  const encryptedConfigPath = path.resolve(configTsPath, "../", "encrypted");
  const target = path.resolve(encryptedConfigPath, filename);
  if (!existsSync(target)) {
    logWarning({
      msg1: `Encrypted config does not exist,\nsome features may be unavailable`,
      msg2: filename,
    });
    console.log(target);
    return null;
  }
  return readJSONSync(target);
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
