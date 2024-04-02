import chalk from "chalk";
import fs, { statSync } from "fs-extra";
import path from "path";

import { DEPLOYMENT_CONFIG_VERSION } from "data-models";

import { Logger } from "../../utils";
import { compileDeploymentTSSync } from "./compile";
import { IDeploymentConfigJson } from "./common";

/**
 * Retrieve compiled config json for a given folder path
 * If JSON does not exist or is outdated recompile synchronously
 * Also checks any parent configs and recompiles if parent updated
 */
export function loadDeploymentJson(
  workspacePath: string,
  options: {
    isRetryCheck?: boolean;
    exitOnError?: boolean;
  } = { exitOnError: true }
): IDeploymentConfigJson {
  // Load deployment
  const tsPath = path.join(workspacePath, "config.ts");
  const jsonPath = path.join(workspacePath, "config.json");
  if (!fs.existsSync(tsPath)) {
    Logger.error({ msg1: "Config file not found", msg2: tsPath, logOnly: true });
    if (options.exitOnError) process.exit(1);
  }

  // Check if config fully up-to-date, return json if so
  if (fs.existsSync(jsonPath)) {
    const json = fs.readJSONSync(jsonPath) as IDeploymentConfigJson;
    // Ensure parent config also up-to-date by running script recursively
    if (json._parent_config) {
      loadDeploymentJson(json._parent_config._workspace_path);
    }
    if (isConfigUpToDate(tsPath, jsonPath)) {
      // Config up-to-date - parse and return
      return parseConfigJson(json);
    }
  }
  // Otherwise attempt compile the ts to json and retry (exiting if already retry)
  if (options.isRetryCheck) {
    Logger.error({ msg1: "Failed to compile", msg2: tsPath, logOnly: true });
    if (options.exitOnError) process.exit(1);
  } else {
    const folderName = path.dirname(tsPath).split(path.sep).pop();
    console.log(chalk.gray(`Compiling: ${folderName}`));
    compileDeploymentTSSync({ input: tsPath, output: jsonPath });
    return loadDeploymentJson(workspacePath, { ...options, isRetryCheck: true });
  }
}

/**
 * When reading config.json files convert stringified functions back to real functions
 */
function parseConfigJson(json: IDeploymentConfigJson) {
  const convertedJson = convertStringsToFunctions(json);
  return convertedJson;
}

/**
 * Decide if a config needs recompiling by checking if modified timestamps
 * on the .ts and .json files are the same (applied during compilation)
 */
function isConfigUpToDate(tsPath: string, jsonPath: string) {
  const json = fs.readJSONSync(jsonPath) as IDeploymentConfigJson;
  if (json._config_version === DEPLOYMENT_CONFIG_VERSION) {
    const { mtime: tsModifiedTime } = statSync(tsPath);
    const { mtime: jsonModifiedTime } = statSync(jsonPath);
    if (tsModifiedTime.getTime() === jsonModifiedTime.getTime()) {
      return true;
    }
  }
  return false;
}

/** When stringifying json functions cannot be converted, so pre-convert any using function .toString() method */
export function convertFunctionsToStrings<T>(data: T) {
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

/** Convert stringified functions back to objects */
export function convertStringsToFunctions<T>(data: T) {
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

/**
 * Utility function to determine the filename stack of current function invocation.
 * Uses Node v8 stack trace api to determine call stacks (in same way error stacks are managed)
 * Adapted from https://github.com/sindresorhus/callsites and https://v8.dev/docs/stack-trace-api
 * @returns string[] list of filenames included in call stack
 */
export function getStackFileNames() {
  // take a copy of default stack track prepare method to revert after use
  const _prepareStackTrace = Error.prepareStackTrace;
  try {
    // alter stack trace method to remove self reference and return stack as filenames
    Error.prepareStackTrace = (_, callSites) => {
      return callSites.slice(1).map((callSite) => callSite.getFileName());
    };
    // create error to generate stacktrace and return (typed to match altered stack trace)
    return new Error().stack as any as string[];
  } finally {
    // revert stack trace method
    Error.prepareStackTrace = _prepareStackTrace;
  }
}
