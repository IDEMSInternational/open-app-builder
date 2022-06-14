#!/usr/bin/env node
import { spawnSync } from "child_process";
import { Command } from "commander";
import { DEPLOYMENT_CONFIG_EXAMPLE_DEFAULTS, IDeploymentConfig } from "data-models";
import fs from "fs-extra";
import path from "path";
import { ROOT_DIR } from "../../paths";
import { deepMergeObjects, logError } from "../../utils";
import { DEPLOYMENT_CONFIG_VERSION, IDeploymentConfigJson } from "./common";

const program = new Command("compile");
interface IOptions {
  /** Path to input ts file for compilation */
  input: string;
  /** Path to write for output json file */
  output: string;
}

/***************************************************************************************
 * CLI
 * @example yarn
 *************************************************************************************/
export default program
  .description("Compile a deployment TS file to json")
  .requiredOption("-i --input <string>")
  .requiredOption("-o --output <string>")
  .action(async (options: IOptions) => {
    // load ts file and convert to deployment json
    const ts: IDeploymentConfig = await loadTSFileDefaultExport(options.input);
    const json = generateDeploymentJson(ts, options.input);
    // write outputs, keeping same modified time on json as ts
    fs.writeFileSync(options.output, JSON.stringify(json, null, 2));
    const { mtime } = fs.statSync(options.input);
    fs.utimesSync(options.output, mtime, mtime);
  });

/***************************************************************************************
 * Main Methods
 *************************************************************************************/

/** Load a .ts file and return the default export */
export async function loadTSFileDefaultExport(input: string) {
  try {
    const res = await import(input);
    return res.default;
  } catch (error) {
    console.error(error);
    logError({ msg1: "Could not compile", msg2: input });
  }
}

/** Additional export to call program via spawnSync */
export async function compileDeploymentTSSync(options: IOptions) {
  const exec = `yarn workspace scripts start`;
  const args = `deployment compile --input "${options.input}" --output "${options.output}"`;
  const cmd = `${exec} ${args}`;
  spawnSync(cmd, { stdio: "inherit", shell: true });
}

/** Take a base deployment config, merge with metadata fields, evaluate relative paths */
function generateDeploymentJson(deployment: IDeploymentConfig, _config_ts_path: string) {
  const _workspace_path = path.dirname(_config_ts_path);
  const _config_version = DEPLOYMENT_CONFIG_VERSION;

  // merge default values
  const merged = deepMergeObjects(DEPLOYMENT_CONFIG_EXAMPLE_DEFAULTS, deployment);

  // populate parent config path
  if (merged._parent_config) {
    merged._parent_config._workspace_path = `../${merged._parent_config.name}`;
  }

  // rewrite relative urls to absolute
  const rewritten = rewriteConfigPaths(merged, _workspace_path);

  const converted = convertFunctionsToStrings(rewritten);

  // merge with metadata fields
  const deploymentJson: IDeploymentConfigJson = {
    ...converted,
    _workspace_path,
    _config_ts_path,
    _config_version,
  };

  return deploymentJson;
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
