#!/usr/bin/env node
import { Command } from "commander";
import { GlobSync } from "glob";
import fs from "fs-extra";
import path from "path";
import { IDeploymentConfig, DEPLOYMENT_CONFIG_EXAMPLE_DEFAULTS } from "../../../types";
import { IDEMS_APP_CONFIG, ROOT_DIR } from "../../paths";
import { promptOptions, logError, deepMergeObjects, logOutput } from "../../utils";
import { DEPLOYMENT_CONFIG_VERSION, IDeploymentConfigJson } from "./common";
import { getActiveDeployment } from "./get";

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
  private allDeployments: { [name: string]: IDeploymentConfigWithFilename } = {};
  /**
   * Specify or choose a deployment from a list of available deployments, and
   * populate as the active deployment to default deployment json file
   *
   * NOTE - when updating a deployment .ts this will need to be run again to ensure
   * parsed data correct in default
   */
  public async setActiveDeployment(deploymentName?: string) {
    this.allDeployments = await this.listDeployments();
    // Prompt selection from list
    if (!deploymentName) {
      let deploymentNames = Object.keys(this.allDeployments);
      // move current deployment name to start of list if exists
      const currentDeploymentName = getActiveDeployment({
        ignoreMissing: true,
        skipRecompileCheck: true,
      })?.name;
      if (currentDeploymentName && deploymentNames.includes(currentDeploymentName)) {
        deploymentNames.splice(deploymentNames.indexOf(currentDeploymentName), 1);
        deploymentNames.unshift(currentDeploymentName);
      }
      deploymentName = await promptOptions(deploymentNames);
    }
    const matchingDeployment = this.allDeployments[deploymentName];
    if (!matchingDeployment) {
      logError({
        msg1: `No deployment found with name: "${deploymentName}"`,
        msg2: `Available: ${Object.keys(this.allDeployments).join(", ")}`,
      });
    }
    const { filename, ...deployment } = matchingDeployment;
    const defaultDeploymentPath = path.resolve(
      IDEMS_APP_CONFIG.deployments,
      "activeDeployment.json"
    );

    const deploymentJson = this.generateDeploymentJson(deployment, filename);

    // Populate parent config metadata
    const { _parent_config } = deploymentJson;
    if (_parent_config) {
      const parentTs = this.allDeployments[_parent_config.name];
      const parentJson = this.generateDeploymentJson(parentTs, "config.ts");
      deploymentJson._parent_config._workspace_path = parentJson._workspace_path;
    }

    fs.writeFileSync(defaultDeploymentPath, JSON.stringify(deploymentJson, null, 2));
    logOutput({
      msg1: `Active Deployment - "${deploymentJson.name}"`,
      msg2: defaultDeploymentPath,
    });
    // delete .angular cache as it may not detect changes to json files otherwise
    const angularCacheDir = path.join(ROOT_DIR, ".angular");
    if (fs.existsSync(angularCacheDir)) {
      fs.removeSync(angularCacheDir);
    }
  }

  /**
   * Deployment files are written in .ts, so cannot be ready directly
   * Iterate over the files and dynamically import to resolve their values,
   * which can be passed back as an array of deployments
   */
  public async listDeployments() {
    const deploymentsHashmap: { [name: string]: IDeploymentConfigWithFilename } = {};
    const { found: allDeploymentFiles } = new GlobSync("**/*config.ts", {
      cwd: IDEMS_APP_CONFIG.deployments,
    });
    for (const filename of allDeploymentFiles) {
      try {
        const deployment: IDeploymentConfig = await this.loadDeploymentTS(filename);

        // should have default export with a name property
        // assign via deep merge to ensure created as new object and won't conflict with future imports
        if (deployment?.name) {
          deploymentsHashmap[deployment.name] = deepMergeObjects({ filename }, deployment);
        }
      } catch (error) {
        console.error(error);
      }
    }
    return deploymentsHashmap;
  }

  /** Read a .ts file containing deployment information and return processed default export */
  public async loadDeploymentTS(filename: string) {
    const filepath = path.resolve(IDEMS_APP_CONFIG.deployments, filename);
    const res = await import(filepath);
    return res.default;
  }

  /** Take a base deployment config, merge with metadata fields, evaluate relative paths */
  private generateDeploymentJson(deployment: IDeploymentConfig, filename: string) {
    const _config_ts_path = path.resolve(IDEMS_APP_CONFIG.deployments, filename);
    const _workspace_path = path.dirname(_config_ts_path);
    const _config_version = DEPLOYMENT_CONFIG_VERSION;

    // merge default values
    const merged = deepMergeObjects(DEPLOYMENT_CONFIG_EXAMPLE_DEFAULTS, deployment);

    // rewrite relative urls to absolute
    const rewritten = rewriteConfigPaths(merged, _workspace_path);

    const converted = convertFunctionsToStrings(rewritten);

    if (deployment._parent_config) {
    }

    // merge with metadata fields
    const deploymentJson: IDeploymentConfigJson = {
      ...converted,
      _workspace_path,
      _config_ts_path,
      _config_version,
    };

    // TODO - convert functions to strings
    return deploymentJson;
  }
}

interface IDeploymentConfigWithFilename extends IDeploymentConfig {
  filename: string;
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

/** When stringifying json functions cannot be converted, so pre-convert any using function .toString() method */
function convertFunctionsToStrings<T>(data: T) {
  Object.entries(data).forEach(([key, value]) => {
    if (value && typeof value === "object") {
      data[key] = convertFunctionsToStrings(value);
    }
    if (key.endsWith("_function") && typeof value === "function") {
      data[key] = (value as Function).toString();
    }
  });
  return data;
}
