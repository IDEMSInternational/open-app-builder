#!/usr/bin/env node
import { Command } from "commander";
import fs from "fs-extra";
import path from "path";
import { DEPLOYMENTS_PATH, ROOT_DIR } from "../../paths";
import { promptOptions, logOutput } from "../../utils";
import { getActiveDeployment } from "./get";
import { loadDeploymentJson } from "./utils";

const program = new Command("set");

/***************************************************************************************
 * CLI
 * @example yarn
 *************************************************************************************/
export default program
  .description("Set active deployment")
  // options copied from/passed to generate
  .action(async () => {
    let [deploymentName] = program.args;
    await new DeploymentSet().setActiveDeployment(deploymentName);
  });

/***************************************************************************************
 * Main Methods
 *************************************************************************************/

export class DeploymentSet {
  /**
   * Specify or choose a deployment from a list of available deployments, and
   * populate as the active deployment to default deployment json file
   *
   * NOTE - when updating a deployment .ts this will need to be run again to ensure
   * parsed data correct in default
   */
  public async setActiveDeployment(deploymentName?: string) {
    // Prompt selection from list
    if (!deploymentName) {
      deploymentName = await this.promptDeploymentSelect();
      return this.setActiveDeployment(deploymentName);
    }
    const deploymentWorkspace = path.resolve(DEPLOYMENTS_PATH, deploymentName);
    const deploymentJson = loadDeploymentJson(deploymentWorkspace);
    const deploymentJsonString = JSON.stringify(deploymentJson, null, 2);
    // write json to store the config both within the current deployment and as the active deployment
    const activeDeploymentPath = path.resolve(DEPLOYMENTS_PATH, "activeDeployment.json");
    fs.writeFileSync(activeDeploymentPath, deploymentJsonString);
    logOutput({
      msg1: `Active Deployment - "${deploymentJson.name}"`,
      msg2: activeDeploymentPath,
    });
    // delete .angular cache as it may not detect changes to json files otherwise
    const angularCacheDir = path.join(ROOT_DIR, ".angular");
    if (fs.existsSync(angularCacheDir)) {
      fs.removeSync(angularCacheDir);
    }
  }

  private async promptDeploymentSelect() {
    const deploymentNames = fs
      .readdirSync(DEPLOYMENTS_PATH, { withFileTypes: true })
      .filter((d) => d.isDirectory())
      .map((d) => d.name);
    const currentDeploymentName = getActiveDeployment({
      ignoreMissing: true,
      skipRecompileCheck: true,
    })?.name;
    // move current deployment name to start of list if exists
    if (currentDeploymentName && deploymentNames.includes(currentDeploymentName)) {
      deploymentNames.splice(deploymentNames.indexOf(currentDeploymentName), 1);
      deploymentNames.unshift(currentDeploymentName);
    }
    const selectedName = await promptOptions(deploymentNames);
    return selectedName;
  }
}
