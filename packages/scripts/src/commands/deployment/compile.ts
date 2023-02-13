#!/usr/bin/env node
import { spawnSync } from "child_process";
import { Command } from "commander";
import { IDeploymentConfig } from "data-models";
import fs from "fs-extra";
import path from "path";
import { ROOT_DIR } from "../../paths";
import { Logger } from "../../utils";
import { DEPLOYMENT_CONFIG_VERSION, IDeploymentConfigJson } from "./common";
import { convertFunctionsToStrings } from "./utils";

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
    await compileDeploymentTS(options);
  });

/***************************************************************************************
 * Main Methods
 *************************************************************************************/

export async function compileDeploymentTS(options: IOptions) {
  // load ts file and convert to deployment json
  const ts: IDeploymentConfig = await loadTSFileDefaultExport(options.input);
  const json = convertDeploymentTsToJson(ts, options.input);
  if (!json._validated) {
    Logger.error({
      msg1: "Config file incorrectly defined",
      msg2: "Should use `generateDeploymentConfig` to create",
    });
  }
  // write outputs, keeping same modified time on json as ts
  fs.writeFileSync(options.output, JSON.stringify(json, null, 2));
  const { mtime } = fs.statSync(options.input);
  fs.utimesSync(options.output, mtime, mtime);
}

/** Additional export to call program via spawnSync */
export function compileDeploymentTSSync(options: IOptions) {
  const exec = `yarn workspace scripts start`;
  const args = `deployment compile --input "${options.input}" --output "${options.output}"`;
  const cmd = `${exec} ${args}`;
  // console.log(chalk.yellow(cmd));
  spawnSync(cmd, { stdio: "inherit", shell: true });
}

/** Load a .ts file and return the default export */
export async function loadTSFileDefaultExport(input: string) {
  try {
    const res = await import(input);
    return res.default;
  } catch (error) {
    console.error(error);
    Logger.error({ msg1: "Could not compile", msg2: input });
  }
}

/** Take a base deployment config, merge with metadata fields, evaluate relative paths */
function convertDeploymentTsToJson(
  deployment: IDeploymentConfig,
  _config_ts_path: string
): IDeploymentConfigJson {
  const _workspace_path = path.resolve(_config_ts_path, "../");
  const _config_version = DEPLOYMENT_CONFIG_VERSION;

  // rewrite relative urls to absolute
  const rewritten = rewriteConfigPaths(deployment, _workspace_path);

  const converted = convertFunctionsToStrings(rewritten);

  return { ...converted, _workspace_path, _config_ts_path, _config_version };
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
