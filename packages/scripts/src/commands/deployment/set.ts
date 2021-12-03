#!/usr/bin/env node
import { Command } from "commander";
import { GlobSync } from "glob";
import fs from "fs-extra";
import path from "path";
import { IDeploymentConfig } from "../../../types";
import { IDEMS_APP_CONFIG } from "../../paths";
import { promptOptions, logError, deepMergeObjects } from "../../utils";

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
    await setActiveDeployment(deploymentName);
  });

/***************************************************************************************
 * Main Methods
 *************************************************************************************/
/**
 * Specify or choose a deployment from a list of available deployments, and
 * populate as the active deployment to default deployment json file
 *
 * NOTE - when updating a deployment .ts this will need to be run again to ensure
 * parsed data correct in default
 */
async function setActiveDeployment(deploymentName?: string) {
  const allDeployments = await listDeployments();
  if (!deploymentName) {
    deploymentName = await promptOptions(allDeployments.map((d) => d.name));
  }
  const matchingDeployment = allDeployments.find(
    (deployment) => deployment.name === deploymentName
  );
  if (!matchingDeployment) {
    logError({
      msg1: `No deployment found with name: "${deploymentName}"`,
      msg2: `${IDEMS_APP_CONFIG.deployments}`,
    });
  }
  const { filename, ...deployment } = matchingDeployment;
  const defaultDeploymentPath = path.resolve(IDEMS_APP_CONFIG.deployments, "default.json");
  const deploymentJson: IDeploymentConfigJson = {
    ...deployment,
    _workspace_path: path.resolve(IDEMS_APP_CONFIG.deployments, path.dirname(filename)),
    _ts_filename: filename,
  };
  // Merge with defaults
  const mergedJson = deepMergeObjects(DEPLOYMENT_CONFIG_DEFAULTS, deploymentJson);

  fs.writeFileSync(defaultDeploymentPath, JSON.stringify(mergedJson, null, 2));
  console.log("deployment set", deployment);
}

/**
 * Deployment files are written in .ts, so cannot be ready directly
 * Iterate over the files and dynamically import to resolve their values,
 * which can be passed back as an array of deployments
 */
async function listDeployments() {
  const allDeployments: IDeploymentConfigWithFilename[] = [];
  const { found: allDeploymentFiles } = new GlobSync("**/config.ts", {
    cwd: IDEMS_APP_CONFIG.deployments,
  });
  for (const filename of allDeploymentFiles) {
    try {
      const deployment: IDeploymentConfig = await loadDeploymentTS(filename);
      // should have default export with a name property
      if (deployment?.name) {
        allDeployments.push({ ...deployment, filename });
      }
    } catch (error) {}
  }
  return allDeployments;
}

/** Read a .ts file containing deployment information and return processed default export */
export async function loadDeploymentTS(filename: string) {
  const filepath = path.resolve(IDEMS_APP_CONFIG.deployments, filename);
  const res = await import(filepath);
  return res.default;
}

interface IDeploymentConfigWithFilename extends IDeploymentConfig {
  filename: string;
}
export interface IDeploymentConfigJson extends IDeploymentConfig {
  _workspace_path: string;
  _ts_filename: string;
}

const DEPLOYMENT_CONFIG_DEFAULTS: Partial<IDeploymentConfigJson> = {
  google_drive: {
    assets_folder_id: "",
    sheets_folder_id: "",
    auth_token_path: "",
    cache_path: "./cache/gdrive",
  },
};
