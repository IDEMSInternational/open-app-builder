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
 */
export function getActiveDeployment(): IDeploymentConfigJson {
  const defaultJsonPath = path.resolve(IDEMS_APP_CONFIG.deployments, "default.json");
  if (!fs.existsSync(defaultJsonPath)) {
    logError({
      msg1: "No default deployment has been specified",
      msg2: `Run "yarn scripts deployment set" to configure`,
    });
  }
  const deploymentJson: IDeploymentConfigJson = fs.readJsonSync(defaultJsonPath);
  const { _config_ts_path } = deploymentJson;
  const deploymentTSPath = path.resolve(IDEMS_APP_CONFIG.deployments, _config_ts_path);

  if (!fs.existsSync(deploymentTSPath)) {
    logError({
      msg1: `Deployment not found: ${_config_ts_path}`,
      msg2: `Run "yarn scripts deployment set" to specify a new active deployment`,
    });
  }

  // Ensure json compiled since any changes to ts
  const { mtime: jsonModifiedTime } = fs.statSync(defaultJsonPath);
  const { mtime: tsModifiedTime } = fs.statSync(deploymentTSPath);

  if (jsonModifiedTime < tsModifiedTime) {
    console.log(chalk.grey("Config has been updated, recompile required"));
    promptConfigSet();
    return getActiveDeployment();
  }

  // ensure json compiled any time core config set methods updated
  if (deploymentJson._config_version !== DEPLOYMENT_CONFIG_VERSION) {
    console.log(chalk.grey("Config core has been updated, recompile required"));
    promptConfigSet();
    return getActiveDeployment();
  }

  const convertedJson = convertStringsToFunctions(deploymentJson);

  return convertedJson;
}

/** Run interactive command prompt to specify config */
function promptConfigSet() {
  const cmd = `yarn workspace scripts start deployment set`;
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
