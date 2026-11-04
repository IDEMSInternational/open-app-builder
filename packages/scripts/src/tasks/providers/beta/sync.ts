import fs from "fs-extra";
import path from "path";
import { SCRIPTS_WORKSPACE_PATH, SRC_ASSETS_PATH } from "../../../paths";
import {
  cleanupEmptyFolders,
  copyFileWithTimestamp,
  generateFolderFlatMap,
  getFileMD5Checksum,
  IContentsEntryHashmap,
  logOutput,
  logWarning,
} from "../../../utils";
import { IDeploymentConfigJson } from "../../../commands/deployment/common";
import { loadExternalConfig, readExternalSourcePath } from "./deploymentConfig";
import { processAssets } from "./processAssets";
import { processFlows } from "./processFlows";
import {
  APP_DATA_PATH,
  downloadDriveFolders,
  downloadFixedSheets,
  downloadTransientSheets,
  getAppDataFlowPath,
  getAuthTokenPath,
  readTransientSheets,
  TRANSIENT_SHEETS_CACHE_PATH,
  TRANSIENT_SHEETS_LIST_PATH,
} from "./sheets";

/** Local cache of assets downloaded from google drive, used to only download changed files */
const ASSETS_CACHE_PATH = path.resolve(SCRIPTS_WORKSPACE_PATH, "cache", "beta_assets");
/** Metadata files written by the gdrive downloader that should not be synced as assets */
const DOWNLOAD_METADATA_FILES = ["_metadata.json", "_contents.json"];

interface ISyncOptions {
  skipDownload?: boolean;
  verbose?: boolean;
}

/**
 * Sync sheets from google drive to the previously imported external deployment
 * (see `downloadFixedSheets`), then process all sheets into the app assets app_data folder
 */
export async function syncFixedSheets(options: ISyncOptions) {
  const { verbose = false } = options;
  const externalSourcePath = readExternalSourcePath();
  const deploymentConfig = await loadExternalConfig(externalSourcePath);
  await downloadFixedSheets(externalSourcePath, deploymentConfig, options);
  processFlows({
    sourceFlowsFolder: path.resolve(externalSourcePath, "app_data", "sheets"),
    targetAppDataFolder: path.resolve(SRC_ASSETS_PATH, "app_data"),
    verbose,
  });
}

/**
 * Download the sheets in the transient sheets list and process the listed flows into the app
 * assets app_data folder, tagged with `_source` and `"transient": "true"`. Only listed flows are
 * updated, and the external deployment folder is not changed
 */
export async function syncTransientSheets(options: { verbose?: boolean } = {}) {
  const { verbose = false } = options;
  const entries = readTransientSheets();
  if (entries.length === 0) {
    logOutput({ msg1: "No transient sheets to sync", msg2: TRANSIENT_SHEETS_LIST_PATH });
    return { sheets: 0, flows: 0, updated: 0 };
  }
  const deploymentConfig = await loadExternalConfig(readExternalSourcePath());
  const { sheets, filePaths } = await downloadTransientSheets(entries, deploymentConfig, {
    verbose,
  });

  // Only compare processed output, so unchanged flows are not rewritten
  const before = new Map(filePaths.map((p) => [p, readAppDataFileFor(p)]));
  if (filePaths.length > 0) {
    processFlows({
      sourceFlowsFolder: TRANSIENT_SHEETS_CACHE_PATH,
      targetAppDataFolder: APP_DATA_PATH,
      filePaths,
      // Transient sheets are tagged with the sheet they were downloaded from
      keepAllSources: true,
      verbose,
    });
  }
  const updated = filePaths.filter((p) => readAppDataFileFor(p) !== before.get(p)).length;
  logOutput({
    msg1: `Synced ${sheets} transient sheets, ${filePaths.length} flows, ${updated} updated`,
    msg2: TRANSIENT_SHEETS_LIST_PATH,
  });
  return { sheets, flows: filePaths.length, updated };
}

/**
 * Sync assets from google drive to the previously imported external deployment
 * (see `downloadExternalAssets`), then process all assets into the app assets app_data folder
 */
export async function syncExternalAssets(options: ISyncOptions) {
  const { verbose = false } = options;
  const externalSourcePath = readExternalSourcePath();
  const deploymentConfig = await loadExternalConfig(externalSourcePath);
  await downloadExternalAssets(externalSourcePath, deploymentConfig, options);
  processAssets({
    sourceAssetsFolder: path.resolve(externalSourcePath, "app_data", "assets"),
    targetAppDataFolder: path.resolve(SRC_ASSETS_PATH, "app_data"),
    deploymentConfig,
    verbose,
  });
}

/**
 * Download assets from the google drive folders listed in the external deployment config and
 * write to the external deployment app_data/assets folder. Assets from multiple folders are
 * merged, with later folders taking priority. Only new or changed files are written, and
 * existing files not present in drive are deleted
 */
export async function downloadExternalAssets(
  externalSourcePath: string,
  deploymentConfig: IDeploymentConfigJson,
  options: ISyncOptions
) {
  const { skipDownload = false, verbose = false } = options;
  const { assets_folders = [], assets_filter_function } = deploymentConfig.google_drive || {};
  if (assets_folders.length === 0) {
    throw new Error(`No google_drive.assets_folders specified in config: ${externalSourcePath}`);
  }
  // TODO - remote asset packs are not yet supported by beta workflows
  const remoteFolders = assets_folders.filter(({ remote }) => remote);
  if (remoteFolders.length > 0) {
    logWarning({
      msg1: "Remote asset folders are not supported, skipping",
      msg2: remoteFolders.map(({ name }) => name).join(", "),
    });
  }
  const coreFolders = assets_folders.filter(({ remote }) => !remote);
  if (coreFolders.length === 0) return;

  const downloadFolders = await downloadDriveFolders(coreFolders, {
    cachePath: ASSETS_CACHE_PATH,
    authTokenPath: getAuthTokenPath(deploymentConfig),
    filterFn: assets_filter_function,
    skipDownload,
  });

  const assets: IContentsEntryHashmap = {};
  // Only remove files from the external folder when all sources are available, so a missing
  // download does not delete everything it would have contained
  let allFoldersFound = true;
  for (const folder of downloadFolders) {
    if (!fs.existsSync(folder)) {
      logWarning({ msg1: "Assets download folder not found", msg2: folder });
      allFoldersFound = false;
      continue;
    }
    const folderAssets = generateFolderFlatMap(folder, {
      includeLocalPath: true,
      filterFn: (relativePath) => !DOWNLOAD_METADATA_FILES.includes(relativePath),
    });
    Object.assign(assets, folderAssets);
  }

  const targetAssetsFolder = path.resolve(externalSourcePath, "app_data", "assets");
  const updatedPaths = writeAssets(assets, targetAssetsFolder, verbose);
  let deletedPaths: string[] = [];
  if (allFoldersFound) {
    deletedPaths = deleteRemovedAssets(assets, targetAssetsFolder, verbose);
  } else {
    logWarning({ msg1: "Skipping removal of deleted assets", msg2: "Not all folders were found" });
  }

  logOutput({
    msg1: `Synced ${Object.keys(assets).length} assets, ${updatedPaths.length} updated, ${deletedPaths.length} deleted`,
    msg2: targetAssetsFolder,
  });
}

/** Raw app_data output for a downloaded transient flow file, used to detect changes */
function readAppDataFileFor(downloadedPath: string) {
  const { flow_type, flow_name } = fs.readJsonSync(downloadedPath);
  const flowPath = getAppDataFlowPath(flow_type, flow_name);
  return fs.existsSync(flowPath) ? fs.readFileSync(flowPath, "utf8") : undefined;
}

/**
 * Copy assets to the target folder, skipping files with unchanged content
 * @returns paths of files that were created or updated
 */
function writeAssets(assets: IContentsEntryHashmap, targetAssetsFolder: string, verbose = false) {
  fs.ensureDirSync(targetAssetsFolder);
  const updatedPaths: string[] = [];
  for (const { relativePath, localPath, md5Checksum, modifiedTime } of Object.values(assets)) {
    const targetPath = path.resolve(targetAssetsFolder, relativePath);
    if (fs.existsSync(targetPath) && getFileMD5Checksum(targetPath) === md5Checksum) continue;
    copyFileWithTimestamp(localPath, targetPath, modifiedTime);
    updatedPaths.push(targetPath);
    if (verbose) {
      logOutput({ msg1: "Wrote asset", msg2: targetPath });
    }
  }
  return updatedPaths;
}

/**
 * Delete files from the target folder that are not present in the synced assets,
 * and remove any folders left empty
 * @returns paths of files that were deleted
 */
function deleteRemovedAssets(
  assets: IContentsEntryHashmap,
  targetAssetsFolder: string,
  verbose = false
) {
  const deletedPaths: string[] = [];
  for (const relativePath of Object.keys(generateFolderFlatMap(targetAssetsFolder))) {
    if (relativePath in assets) continue;
    const targetPath = path.resolve(targetAssetsFolder, relativePath);
    fs.removeSync(targetPath);
    deletedPaths.push(targetPath);
    if (verbose) {
      logOutput({ msg1: "Deleted asset", msg2: targetPath });
    }
  }
  cleanupEmptyFolders(targetAssetsFolder);
  // Keep the root folder (removed if empty) so the app assets are still cleared when processed
  fs.ensureDirSync(targetAssetsFolder);
  return deletedPaths;
}

export default {
  syncFixedSheets: syncFixedSheets,
  syncAssets: syncExternalAssets,
};
