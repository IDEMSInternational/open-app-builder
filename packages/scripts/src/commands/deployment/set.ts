#!/usr/bin/env node
import { Command } from "commander";
import { GlobSync } from "glob";
import fs from "fs-extra";
import path from "path";
import { IDeploymentConfig, DEPLOYMENT_CONFIG_EXAMPLE_DEFAULTS } from "../../../types";
import { IDEMS_APP_CONFIG, ROOT_DIR } from "../../paths";
import { promptOptions, logError, deepMergeObjects, logOutput } from "../../utils";

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

  const deploymentJson = generateDeploymentJson(deployment, filename);
  fs.writeFileSync(defaultDeploymentPath, JSON.stringify(deploymentJson, null, 2));
  logOutput({
    msg1: `Deployment set`,
    msg2: JSON.stringify(deployment, null, 2),
  });
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

/** Take a base deployment config, merge with metadata fields, evaluate relative paths */
function generateDeploymentJson(deployment: IDeploymentConfig, filename: string) {
  const _config_ts_path = path.resolve(IDEMS_APP_CONFIG.deployments, filename);
  const _workspace_path = path.dirname(_config_ts_path);

  // merge default values
  const merged = deepMergeObjects(DEPLOYMENT_CONFIG_EXAMPLE_DEFAULTS, deployment);

  // rewrite relative urls to absolute
  const rewritten = rewriteConfigPaths(merged, _workspace_path);

  const converted = convertFunctionsToStrings(rewritten);

  // merge with metadata fields
  const deploymentJson: IDeploymentConfigJson = { ...converted, _workspace_path, _config_ts_path };

  // TODO - convert functions to strings
  return deploymentJson;
}

interface IDeploymentConfigWithFilename extends IDeploymentConfig {
  filename: string;
}
export interface IDeploymentConfigJson extends IDeploymentConfig {
  _workspace_path: string;
  _config_ts_path: string;
}

function rewriteConfigPaths<T>(data: T, relativePathRoot: string) {
  Object.entries(data).forEach(([key, value]) => {
    if (value && typeof value === "object") {
      data[key] = rewriteConfigPaths(value, relativePathRoot);
    }
    if (key.endsWith("_path") && typeof value === "string") {
      // handle paths relative to config file
      if (value.startsWith(".")) {
        data[key] = path.resolve(relativePathRoot, value);
      }
      // assume all other paths are relative to workspace
      else {
        data[key] = path.resolve(ROOT_DIR, value);
      }
    }
  });
  return data;
}

function convertFunctionsToStrings<T>(data: T) {
  Object.entries(data).forEach(([key, value]) => {
    if (value && typeof value === "object") {
      data[key] = convertFunctionsToStrings(value);
    }
    if (typeof value === "function") {
      data[key] = (value as Function).toString();
    }
  });
  return data;
}
