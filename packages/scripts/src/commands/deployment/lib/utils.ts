import { DEPLOYMENT_CONFIG_VERSION, IDeploymentConfig } from "data-models";
import { existsSync, statSync, utimesSync } from "fs";
import { resolve } from "path";
import { Logger, ROOT_DIR, compileTsToJS } from "shared";

/** Ensure latest deployment config.ts has been transpiled to .js */
export function ensureDeploymentTranspiled(inputTsPath: string) {
  const { mtime } = statSync(inputTsPath);
  let configJSPath = inputTsPath.replace(".ts", "js");
  let transpileRequired = true;
  if (existsSync(configJSPath)) {
    const { mtime: jsConfigMTime } = statSync(configJSPath);
    if (new Date(mtime).getTime() === new Date(jsConfigMTime).getTime()) {
      transpileRequired = false;
    }
  }
  if (transpileRequired) {
    configJSPath = transpileDeployment(inputTsPath);
  }
  return { configJSPath, transpileRequired };
}

/** Dynamically import config js file and return default export */
export async function loadDeploymentJS(inputJSPath: string) {
  const config = await loadDefaultImport<IDeploymentConfig>(inputJSPath);
  // Assign metadata and rewrite relative paths
  const _workspace_path = resolve(inputJSPath, "../");
  const _config_version = DEPLOYMENT_CONFIG_VERSION;
  const _config_ts_path = inputJSPath.replace(".js", ".ts");
  const rewritten = rewriteConfigPaths(config, _workspace_path);

  return { ...rewritten, _workspace_path, _config_ts_path, _config_version };
}

/**
 * Transpile config files written in typescript to javascript
 * for runtime use in non ts-node environments
 * */
function transpileDeployment(inputTsPath: string) {
  const { emittedFiles } = compileTsToJS({
    fileNames: [inputTsPath],
    compilerOptions: { downlevelIteration: true },
  });
  const outputJsPath = emittedFiles[0];
  // Update mtime to reflect input TS
  const { atime, mtime } = statSync(inputTsPath);
  utimesSync(outputJsPath, atime, mtime);
  return outputJsPath;
}

/** Convert deployment into json-friendly object for writing to file */
export function deploymentToJSON(config: IDeploymentConfig) {
  const writeableConfig = convertFunctionsToStrings(config);
  return writeableConfig;
}

/** Convert deployment json back to parsed deployment config */
function deploymentFromJSON(json: any) {
  const config = convertStringsToFunctions(json);
  return config as IDeploymentConfig;
}

async function loadDefaultImport<T>(filepath: string) {
  try {
    const res = await import(filepath);
    return res.default as T;
  } catch (error) {
    console.error(error);
    Logger.error({ msg1: "Deployment load error", msg2: filepath });
  }
}

function rewriteConfigPaths<T>(data: T, workspacePath: string) {
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
