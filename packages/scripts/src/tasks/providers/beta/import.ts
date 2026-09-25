import fs from "fs-extra";
import path from "path";
import { SRC_ASSETS_PATH } from "../../../paths";
import { generateRuntimeConfig } from "../appData";
import { logOutput } from "../../../utils";
import { loadExternalDeploymentJson } from "./deploymentConfig";
import { decryptExternalFolder } from "./encryption";
import { processSheets } from "./processSheets";

export async function importExternalDeployment(sourcePath: string, verbose = false) {
  const absoluteSourcePath = path.resolve(sourcePath);

  // Verify source exists
  if (!fs.existsSync(absoluteSourcePath)) {
    throw new Error(`Source location does not exist: ${absoluteSourcePath}`);
  }

  const targetAppDataFolder = path.resolve(SRC_ASSETS_PATH, "app_data");

  logOutput({
    msg1: "Importing external deployment",
    msg2: `Source: ${absoluteSourcePath}`,
  });

  fs.ensureDirSync(targetAppDataFolder);

  // Save the source path for later use by 'set' command
  fs.writeFileSync(path.join(targetAppDataFolder, ".external_source"), absoluteSourcePath);

  // Decrypt config before compiling so it can populate to deployment json
  await decryptExternalFolder(path.resolve(absoluteSourcePath, "encrypted"));
  writeDeploymentJson(absoluteSourcePath, targetAppDataFolder);

  processSheets({
    sourceSheetsFolder: path.resolve(absoluteSourcePath, "app_data", "sheets"),
    targetAppDataFolder,
    verbose,
  });

  if (verbose) {
    logOutput({
      msg1: "Import complete",
      msg2: targetAppDataFolder,
    });
  }
}

/** Compile the source deployment config and write the runtime config to deployment.json */
function writeDeploymentJson(sourcePath: string, targetAppDataFolder: string) {
  const deploymentConfig = loadExternalDeploymentJson(sourcePath);
  const runtimeConfig = generateRuntimeConfig(deploymentConfig);
  fs.writeJsonSync(path.resolve(targetAppDataFolder, "deployment.json"), runtimeConfig, {
    spaces: 2,
  });
}

export default {
  import: importExternalDeployment,
};
