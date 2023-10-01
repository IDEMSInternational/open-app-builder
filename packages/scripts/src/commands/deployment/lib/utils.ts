import { DEPLOYMENT_CONFIG_VERSION, IDeploymentConfig } from "data-models";
import { statSync, utimesSync, writeFileSync } from "fs-extra";
import { resolve } from "path";
import { Logger, ROOT_DIR } from "shared";

/** Parses input deployment ts and additionally converts to json */
export async function compileDeployment(inputTsPath: string) {
  const outputJsonPath = inputTsPath.replace(".ts", ".json");

  // parse config ts
  const deploymentConfig: IDeploymentConfig = await loadFileDefaultExport(inputTsPath);

  // Apply metadata and rewrite relative paths
  const _workspace_path = resolve(inputTsPath, "../");
  deploymentConfig._workspace_path = _workspace_path;
  deploymentConfig._config_version = DEPLOYMENT_CONFIG_VERSION;
  const rewritten = rewriteConfigPaths(deploymentConfig, _workspace_path);

  // TODO - consider caching methods to recompile if deployment or parent change
  // (previously used, but might not be needed if moving to js file deployment)

  // write outputs, keeping same modified time on json as ts

  return rewritten;
}

// export function writeOutput() {
//   writeFileSync(outputJsonPath, JSON.stringify(rewritten, null, 2));
//   const { mtime } = statSync(inputTsPath);
//   utimesSync(outputJsonPath, mtime, mtime);
// }

/**
 * When reading deployment json files convert stringified functions back to real functions
 */
export function parseDeploymentJson(json: IDeploymentConfig) {
  const convertedJson = convertStringsToFunctions(json);
  return convertedJson;
}

/** Load a .ts file and return the default export */
async function loadFileDefaultExport(input: string) {
  try {
    const res = await import(input);
    return res.default;
  } catch (error) {
    console.error(error);
    Logger.error({ msg1: "Could not compile", msg2: input });
  }
}

/** Take a base deployment config, merge with metadata fields, evaluate relative paths */
// function convertDeploymentToJson(
//   deployment: IDeploymentConfig,
//   _config_ts_path: string
// ): IDeploymentConfig {
//   const _workspace_path = resolve(_config_ts_path, "../");
//   const _config_version = DEPLOYMENT_CONFIG_VERSION;

//   // rewrite relative urls to absolute
//   const rewritten = rewriteConfigPaths(deployment, _workspace_path);
//   const converted = convertFunctionsToStrings(rewritten);

//   return { ...converted, _workspace_path, _config_ts_path, _config_version };
// }

function rewriteConfigPaths(data: Record<string, any>, workspacePath: string) {
  Object.entries(data).forEach(([key, value]) => {
    if (value && typeof value === "object") {
      data[key] = rewriteConfigPaths(value, workspacePath);
    }
    if (key.endsWith("_path") && typeof value === "string") {
      // handle paths relative to config file
      if (value.startsWith(".")) {
        data[key] = resolve(workspacePath, value);
      }
      // assume all other paths are relative to workspace
      else {
        data[key] = resolve(ROOT_DIR, value);
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

/** Convert stringified functions back to objects */
function convertStringsToFunctions<T>(data: T) {
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
