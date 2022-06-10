#!/usr/bin/env node
import { Command } from "commander";
import fs from "fs-extra";
import path from "path";
import chalk from "chalk";
import { IDEMS_APP_CONFIG } from "../../paths";
import { logError } from "../../utils";
import { DEPLOYMENT_CONFIG_VERSION } from "./common";
import { IDeploymentConfigJson } from "./set";
import { spawnSync } from "child_process";

const program = new Command("get");

/***************************************************************************************
 * CLI
 * @example yarn
 *************************************************************************************/
export default program
  .description("Get active deployment")
  // options copied from/passed to generate
  .action(async () => {
    const deployment = getActiveDeployment();
    console.log("deployment get", deployment);
  });

/***************************************************************************************
 * Main Methods
 *************************************************************************************/
/**
 * Read the default deployment json and return compiled json of previously set active
 * deployment.
 * @param options.skipRecompileCheck - Skipping checking if ts file updated requiring json update
 * @param options.ignoreMissing - If no config has been set a warning will be shown.
 * Supress this and instead return an empty config object `{}`
 */
export function getActiveDeployment(
  options: {
    skipRecompileCheck?: boolean;
    ignoreMissing?: boolean;
    exitOnRecompileRequired?: boolean;
  } = {}
): IDeploymentConfigJson {
  const defaultJsonPath = path.resolve(IDEMS_APP_CONFIG.deployments, "activeDeployment.json");
  // Handle no deployment configured
  if (!fs.existsSync(defaultJsonPath)) {
    if (options.ignoreMissing) {
      return {} as any;
    }
    logError({
      msg1: "No default deployment has been specified",
      msg2: `Run "yarn workflow deployment_set" to configure`,
    });
  }
  // Load config from json
  const deploymentJson: IDeploymentConfigJson = fs.readJsonSync(defaultJsonPath);

  // Check corresponding config ts file in case recompile required
  if (options.skipRecompileCheck) {
    return deploymentJson;
  }
  const { _config_ts_path, name } = deploymentJson;
  const deploymentTSPath = path.resolve(IDEMS_APP_CONFIG.deployments, _config_ts_path);

  if (!fs.existsSync(deploymentTSPath)) {
    fs.removeSync(defaultJsonPath);
    logError({
      msg1: `Deployment not found: ${_config_ts_path}`,
      msg2: `Run "yarn workflow deployment_set" to specify a new active deployment`,
    });
  }

  // Ensure json compiled since any changes to ts
  const { mtime: jsonModifiedTime } = fs.statSync(defaultJsonPath);
  const { mtime: tsModifiedTime } = fs.statSync(deploymentTSPath);

  if (jsonModifiedTime < tsModifiedTime) {
    if (options.exitOnRecompileRequired) {
      logError({
        msg1: `Could not load deployment: ${_config_ts_path}`,
        msg2: `Run "yarn workflow deployment_set" to specify a new active deployment`,
      });
    }
    console.log(chalk.grey("Config has been updated, recompile required"));
    recompileConfig(name);
    return getActiveDeployment({ exitOnRecompileRequired: true });
  }

  // ensure json compiled any time core config set methods updated
  if (deploymentJson._config_version !== DEPLOYMENT_CONFIG_VERSION) {
    console.log(chalk.grey("Config core has been updated, recompile required"));
    recompileConfig(name);
    return getActiveDeployment({ exitOnRecompileRequired: true });
  }

  const convertedJson = convertStringsToFunctions(deploymentJson);

  return convertedJson;
}

/** Run interactive command prompt to specify config */
function promptConfigSet() {
  const cmd = `yarn workspace scripts start deployment set`;
  spawnSync(cmd, { stdio: "inherit", shell: true });
}

function recompileConfig(name: string) {
  const cmd = `yarn workspace scripts start deployment set ${name}`;
  spawnSync(cmd, { stdio: "inherit", shell: true });
}

/** When JSON is stored functions are stringified. Convert back */
function convertStringsToFunctions<T>(data: T) {
  Object.entries(data).forEach(([key, value]) => {
    if (value && typeof value === "object") {
      data[key] = convertStringsToFunctions(value);
    }
    if (key.endsWith("_function") && typeof value === "string") {
      data[key] = new Function(`return ${value}`)();
    }
  });
  return data;
}
