#!/usr/bin/env node
import { Command } from "commander";
import fs from "fs-extra";
import path from "path";
import { IDEMS_APP_CONFIG } from "../../paths";
import { logError } from "../../utils";
import { loadDeploymentTS } from "./set";

const program = new Command("get");

/***************************************************************************************
 * CLI
 * @example yarn
 *************************************************************************************/
export default program
  .description("Get active deployment")
  // options copied from/passed to generate
  .action(async () => {
    await getActiveDeployment();
  });

/***************************************************************************************
 * Main Methods
 *************************************************************************************/
/**
 * Read the default deployment json and retrieve parsed ts for the named active deployment
 */
export async function getActiveDeployment() {
  const defaultJsonPath = path.resolve(IDEMS_APP_CONFIG.deployments, "default.json");
  if (!fs.existsSync(defaultJsonPath)) {
    logError({
      msg1: "No default deployment has been specified",
      msg2: "you must first run the `deployment set` command",
    });
  }
  const filename = fs.readJsonSync(defaultJsonPath).active.filename;
  const activeDeploymentPath = path.resolve(IDEMS_APP_CONFIG.deployments, filename);
  if (!fs.existsSync(activeDeploymentPath)) {
    logError({
      msg1: `Deployment not found: ${filename}`,
      msg2: "Run the `deployment set` command to specify a new active deployment",
    });
  }
  const deployment = await loadDeploymentTS(filename);
  console.log("deployment", deployment);
  return deployment;
}
