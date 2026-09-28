import fs from "fs-extra";
import path from "path";
import { IDeploymentConfigJson } from "../../../commands/deployment/common";
import { SRC_ASSETS_PATH } from "../../../paths";
import { generateRuntimeConfig } from "../appData";
import { logOutput } from "../../../utils";
import { loadExternalDeploymentJson } from "./deploymentConfig";
import { decryptExternalFolder } from "./encryption";
import { processAssets } from "./processAssets";
import { processSheets } from "./processSheets";
import { downloadExternalAssets, downloadExternalSheets } from "./sync";

interface IImportOptions {
  /** Sync sheets and assets from google drive to the source folder before processing */
  sync?: boolean;
  /** When syncing, skip download and use previously downloaded files */
  skipDownload?: boolean;
  verbose?: boolean;
}

/**
 * Import an external deployment from a local folder, writing its deployment config, sheets and
 * assets to the app assets app_data folder. Optionally sync sheets and assets from google drive
 * to the source folder first
 */
export async function importExternalDeployment(sourcePath: string, options: IImportOptions = {}) {
  const { sync = false, verbose = false } = options;
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

  // Save the source path for later use by sync commands
  fs.writeFileSync(path.join(targetAppDataFolder, ".external_source"), absoluteSourcePath);

  // Decrypt config before compiling so it can populate to deployment json
  await decryptExternalFolder(path.resolve(absoluteSourcePath, "encrypted"));
  const deploymentConfig = loadExternalDeploymentJson(absoluteSourcePath);
  writeDeploymentJson(deploymentConfig, targetAppDataFolder);

  if (sync) {
    await downloadExternalSheets(absoluteSourcePath, deploymentConfig, options);
    await downloadExternalAssets(absoluteSourcePath, deploymentConfig, options);
  }

  processSheets({
    sourceSheetsFolder: path.resolve(absoluteSourcePath, "app_data", "sheets"),
    targetAppDataFolder,
    verbose,
  });

  processAssets({
    sourceAssetsFolder: path.resolve(absoluteSourcePath, "app_data", "assets"),
    targetAppDataFolder,
    deploymentConfig,
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
function writeDeploymentJson(deploymentConfig: IDeploymentConfigJson, targetAppDataFolder: string) {
  const runtimeConfig = generateRuntimeConfig(deploymentConfig);
  fs.writeJsonSync(path.resolve(targetAppDataFolder, "deployment.json"), runtimeConfig, {
    spaces: 2,
  });
}

export default {
  import: importExternalDeployment,
};
