#!/usr/bin/env node
import { Command } from "commander";
import { IDeploymentConfig } from "data-models";
import fs from "fs-extra";
import path from "path";
import { DEPLOYMENTS_PATH } from "../../paths";
import { Logger } from "../../utils";
import type { IDeploymentConfigJson } from "./common";
import { loadTSFileDefaultExport } from "./compile";
import { loadDeploymentJson } from "./utils";

const program = new Command("get");

/***************************************************************************************
 * CLI
 * @example yarn
 *************************************************************************************/
export default program.description("Get active deployment").action(async () => {
  const deployment = get();
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
function get(
  options: { skipRecompileCheck?: boolean; ignoreMissing?: boolean } = {}
): IDeploymentConfigJson {
  const defaultJsonPath = path.resolve(DEPLOYMENTS_PATH, "activeDeployment.json");

  // Handle no deployment configured
  if (!fs.existsSync(defaultJsonPath)) {
    if (options.ignoreMissing) {
      return {} as any;
    }
    Logger.error({
      msg1: "No default deployment has been specified",
      msg2: `Run "yarn workflow deployment set" to configure`,
    });
  }

  // Load last active json, ensure still exists and up-to-date (unless otherwise specified)
  const deploymentJson = fs.readJsonSync(defaultJsonPath) as IDeploymentConfigJson;
  if (options.skipRecompileCheck) {
    return deploymentJson;
  }
  const { _config_ts_path, _workspace_path, name } = deploymentJson;
  if (!fs.existsSync(_config_ts_path)) {
    fs.removeSync(defaultJsonPath);
    Logger.error({
      msg1: `Deployment not found: ${name}`,
      msg2: `Run "yarn workflow deployment set" to specify a new active deployment`,
    });
  }
  return loadDeploymentJson(_workspace_path);
}

/** Similar to above, but parses TS async so can return without serialization/de-serialization */
async function getTs() {
  const { _config_ts_path } = get();
  const ts = await loadTSFileDefaultExport(_config_ts_path);
  return ts as IDeploymentConfig;
}

/**
 * HACK - export functions within another constant and not directly to allow for easier
 * test mocking https://github.com/jasmine/jasmine/issues/1414
 */
export const ActiveDeployment = {
  get,
  getTs,
};
