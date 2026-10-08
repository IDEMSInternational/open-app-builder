import fs from "fs-extra";
import os from "os";
import path from "path";
import { compileDeploymentTSSync } from "../../../commands/deployment/compile";
import { IDeploymentConfigJson } from "../../../commands/deployment/common";
import { convertStringsToFunctions } from "../../../commands/deployment/utils";
import { ROOT_DIR } from "../../../paths";

/**
 * Compile the config.ts from an external source folder and return the parsed json.
 * Adapted from `loadDeploymentJson`, but compiles to a temp file that is removed after
 * reading, so nothing is written to the source folder
 */
export function loadExternalDeploymentJson(sourcePath: string): IDeploymentConfigJson {
  const tsPath = path.join(sourcePath, "config.ts");
  if (!fs.existsSync(tsPath)) {
    throw new Error(`config.ts not found in source path: ${tsPath}`);
  }

  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "beta-config-"));
  const jsonPath = path.join(tempDir, "config.json");
  // External configs sit outside this repo so cannot resolve workspace packages (e.g. "scripts")
  // by walking up folders. Add the repo node_modules to NODE_PATH for the compile child process
  const originalNodePath = process.env.NODE_PATH;
  const repoNodeModules = path.resolve(ROOT_DIR, "node_modules");
  process.env.NODE_PATH = [repoNodeModules, originalNodePath].filter(Boolean).join(path.delimiter);
  try {
    compileDeploymentTSSync({ input: tsPath, output: jsonPath });
    if (!fs.existsSync(jsonPath)) {
      throw new Error(`Failed to compile deployment config: ${tsPath}`);
    }
    const json = fs.readJsonSync(jsonPath) as IDeploymentConfigJson;
    // Convert stringified functions back to real functions
    return convertStringsToFunctions(json);
  } finally {
    if (originalNodePath === undefined) {
      delete process.env.NODE_PATH;
    } else {
      process.env.NODE_PATH = originalNodePath;
    }
    fs.removeSync(tempDir);
  }
}
