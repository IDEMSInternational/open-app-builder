#!/usr/bin/env node
import { Command } from "commander";
import fs from "fs-extra";
import path from "path";
import { IDEMS_APP_CONFIG } from "../../paths";
import { logError } from "../../utils";
import { IDeploymentConfigJson } from "./set";

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
export function getActiveDeployment() {
  const defaultJsonPath = path.resolve(IDEMS_APP_CONFIG.deployments, "default.json");
  if (!fs.existsSync(defaultJsonPath)) {
    logError({
      msg1: "No default deployment has been specified",
      msg2: `Run "npm run scripts deployment set" to configure`,
    });
  }
  const deploymentJson: IDeploymentConfigJson = fs.readJsonSync(defaultJsonPath);
  const { _ts_filename } = deploymentJson;
  const deploymentTSPath = path.resolve(IDEMS_APP_CONFIG.deployments, _ts_filename);

  if (!fs.existsSync(deploymentTSPath)) {
    logError({
      msg1: `Deployment not found: ${_ts_filename}`,
      msg2: `Run "npm run scripts deployment set" to specify a new active deployment`,
    });
  }

  // Ensure json compiled since any changes to ts
  const { mtime: jsonModifiedTime } = fs.statSync(defaultJsonPath);
  const { mtime: tsModifiedTime } = fs.statSync(deploymentTSPath);

  if (jsonModifiedTime < tsModifiedTime) {
    logError({
      msg1: `Deployment has been updated and requires compiling`,
      msg2: `Run "npm run scripts deployment set" to update`,
    });
  }

  return deploymentJson;
}
