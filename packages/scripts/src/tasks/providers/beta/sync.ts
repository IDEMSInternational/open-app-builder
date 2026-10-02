import { GDriveDownloader, IGdriveEntry } from "@idemsInternational/gdrive-tools";
import { FlowTypes } from "data-models";
import fs from "fs-extra";
import path from "path";
import {
  AUTH_TOKEN_PATH,
  CREDENTIALS_PATH,
  SCRIPTS_WORKSPACE_PATH,
  SRC_ASSETS_PATH,
} from "../../../paths";
import {
  cleanupEmptyFolders,
  copyFileWithTimestamp,
  generateFolderFlatMap,
  getFileMD5Checksum,
  IContentsEntryHashmap,
  logOutput,
  logWarning,
  recursiveFindByExtension,
} from "../../../utils";
import { IDeploymentConfigJson } from "../../../commands/deployment/common";
import { loadExternalDeploymentJson } from "./deploymentConfig";
import { decryptExternalFolder } from "./encryption";
import { parseSheetWorkbook } from "./parsers";
import { processAssets } from "./processAssets";
import { processSheets } from "./processSheets";
import { isValidFlowName } from "./utils";

/** Local cache of workbooks downloaded from google drive, used to only download changed files */
const SHEETS_CACHE_PATH = path.resolve(SCRIPTS_WORKSPACE_PATH, "cache", "beta_sheets");
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
 * (see `downloadExternalSheets`), then process all sheets into the app assets app_data folder
 */
export async function syncExternalSheets(options: ISyncOptions) {
  const { verbose = false } = options;
  const externalSourcePath = readExternalSourcePath();
  const deploymentConfig = await loadExternalConfig(externalSourcePath);
  await downloadExternalSheets(externalSourcePath, deploymentConfig, options);
  processSheets({
    sourceSheetsFolder: path.resolve(externalSourcePath, "app_data", "sheets"),
    targetAppDataFolder: path.resolve(SRC_ASSETS_PATH, "app_data"),
    verbose,
  });
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
 * Download sheets from the google drive folders listed in the external deployment config,
 * convert to basic flow jsons and write to the external deployment app_data/sheets folder.
 * Flows are written to the sheets root, unless a file with the same name already exists in
 * a subfolder, in which case it is overwritten in place. Existing json files that do not match
 * a downloaded flow are deleted
 */
export async function downloadExternalSheets(
  externalSourcePath: string,
  deploymentConfig: IDeploymentConfigJson,
  options: ISyncOptions
) {
  const { skipDownload = false, verbose = false } = options;
  const {
    sheets_folders = [],
    sheets_filter_function,
    auth_token_path,
  } = deploymentConfig.google_drive || {};
  if (sheets_folders.length === 0) {
    throw new Error(`No google_drive.sheets_folders specified in config: ${externalSourcePath}`);
  }

  // Downloads are cached locally so only the parsed jsons reach the external folder
  const downloadFolders = await downloadDriveFolders(sheets_folders, {
    cachePath: SHEETS_CACHE_PATH,
    authTokenPath: auth_token_path,
    filterFn: sheets_filter_function,
    skipDownload,
  });

  const { flows, allFoldersFound } = parseDownloadedSheets(downloadFolders, verbose);
  const targetSheetsFolder = path.resolve(externalSourcePath, "app_data", "sheets");
  const updatedPaths = writeFlows(flows, targetSheetsFolder, verbose);
  // Only remove files when all sources are available, so a missing download does not delete
  // every flow it would have contained
  let deletedPaths: string[] = [];
  if (allFoldersFound) {
    deletedPaths = deleteRemovedFlows(flows, targetSheetsFolder, verbose);
  } else {
    logWarning({ msg1: "Skipping removal of deleted flows", msg2: "Not all folders were found" });
  }

  logOutput({
    msg1: `Synced ${flows.length} flows, ${updatedPaths.length} updated, ${deletedPaths.length} deleted`,
    msg2: targetSheetsFolder,
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
  const {
    assets_folders = [],
    assets_filter_function,
    auth_token_path,
  } = deploymentConfig.google_drive || {};
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

  const downloadFolders = await downloadDriveFolders(coreFolders, {
    cachePath: ASSETS_CACHE_PATH,
    authTokenPath: auth_token_path,
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

/**
 * Download google drive folders to a local cache (by folder id)
 * @returns paths to the cached download folders
 */
async function downloadDriveFolders(
  folders: { id: string; name: string }[],
  options: {
    cachePath: string;
    authTokenPath?: string;
    filterFn?: (gdriveEntry: IGdriveEntry) => boolean;
    skipDownload?: boolean;
  }
) {
  const { cachePath, authTokenPath, filterFn, skipDownload } = options;
  const downloadFolders: string[] = [];
  for (const { id, name } of folders) {
    const outputPath = path.resolve(cachePath, id);
    if (!skipDownload) {
      const downloader = new GDriveDownloader({
        folderId: id,
        logPrefix: name,
        outputPath,
        credentialsPath: CREDENTIALS_PATH,
        authTokenPath: authTokenPath || AUTH_TOKEN_PATH,
        filterFn,
      });
      await downloader.downloadFolder(id);
    }
    downloadFolders.push(outputPath);
  }
  return downloadFolders;
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

/** Decrypt and compile the external deployment config */
async function loadExternalConfig(externalSourcePath: string) {
  // Decrypt config before compiling in case it references encrypted values
  await decryptExternalFolder(path.resolve(externalSourcePath, "encrypted"));
  return loadExternalDeploymentJson(externalSourcePath);
}

/** Read the external deployment path saved by the beta import command */
export function readExternalSourcePath() {
  const externalSourceFile = path.resolve(SRC_ASSETS_PATH, "app_data", ".external_source");
  if (!fs.existsSync(externalSourceFile)) {
    throw new Error(`No external source found, run 'beta import' first: ${externalSourceFile}`);
  }
  const externalSourcePath = fs.readFileSync(externalSourceFile, "utf8").trim();
  if (!fs.existsSync(externalSourcePath)) {
    throw new Error(`External source path does not exist: ${externalSourcePath}`);
  }
  return externalSourcePath;
}

/** Convert all downloaded xlsx files to flows, warning on duplicate flow names */
function parseDownloadedSheets(downloadFolders: string[], verbose = false) {
  const flowsByName: { [flow_name: string]: FlowTypes.FlowTypeWithData } = {};
  const flowSources: { [flow_name: string]: string } = {};
  let allFoldersFound = true;
  for (const folder of downloadFolders) {
    if (!fs.existsSync(folder)) {
      logWarning({ msg1: "Sheets download folder not found", msg2: folder });
      allFoldersFound = false;
      continue;
    }
    // Ignore temporary lock files created when a workbook is open in excel
    const xlsxPaths = recursiveFindByExtension(folder, "xlsx").filter(
      (filePath) => !path.basename(filePath).startsWith("~$")
    );
    for (const xlsxPath of xlsxPaths) {
      if (verbose) {
        logOutput({ msg1: "Parsing workbook", msg2: xlsxPath });
      }
      for (const flow of parseSheetWorkbook(fs.readFileSync(xlsxPath), xlsxPath)) {
        const { flow_name } = flow;
        // Flows are written by name only, so the same name will overwrite regardless of type
        if (flowSources[flow_name]) {
          logWarning({
            msg1: `Duplicate flow: ${flow_name}`,
            msg2: `${flowSources[flow_name]} will be overwritten by ${xlsxPath}`,
          });
        }
        flowSources[flow_name] = xlsxPath;
        flowsByName[flow_name] = flow;
      }
    }
  }
  return { flows: Object.values(flowsByName), allFoldersFound };
}

/**
 * Write flows to the target sheets folder. Files that already exist anywhere within the folder
 * are overwritten in their current location, and new files are written to the folder root.
 * Files with unchanged content are not rewritten
 * @returns paths of files that were created or updated
 */
function writeFlows(
  flows: FlowTypes.FlowTypeWithData[],
  targetSheetsFolder: string,
  verbose = false
) {
  fs.ensureDirSync(targetSheetsFolder);
  const existingPaths = listExistingFilePaths(targetSheetsFolder);
  const updatedPaths: string[] = [];
  for (const flow of flows) {
    if (!isValidFlowName(flow.flow_name)) {
      throw new Error(`Invalid flow name: ${flow.flow_name}`);
    }
    const filename = `${flow.flow_name}.json`;
    const targetPath = existingPaths[filename] || path.resolve(targetSheetsFolder, filename);
    // Match fs.writeJsonSync output so unchanged files can be skipped
    const json = JSON.stringify(flow, null, 2) + "\n";
    if (fs.existsSync(targetPath) && fs.readFileSync(targetPath, "utf8") === json) continue;
    fs.writeFileSync(targetPath, json);
    updatedPaths.push(targetPath);
    if (verbose) {
      logOutput({ msg1: `Wrote flow: ${flow.flow_name}`, msg2: targetPath });
    }
  }
  return updatedPaths;
}

/**
 * Delete json files within the target sheets folder (including subfolders) that do not match
 * a synced flow, and remove any folders left empty
 * @returns paths of files that were deleted
 */
function deleteRemovedFlows(
  flows: FlowTypes.FlowTypeWithData[],
  targetSheetsFolder: string,
  verbose = false
) {
  const flowFilenames = new Set(flows.map(({ flow_name }) => `${flow_name}.json`));
  const deletedPaths: string[] = [];
  for (const filePath of recursiveFindByExtension(targetSheetsFolder, "json")) {
    if (flowFilenames.has(path.basename(filePath))) continue;
    fs.removeSync(filePath);
    deletedPaths.push(filePath);
    if (verbose) {
      logOutput({ msg1: "Deleted flow", msg2: filePath });
    }
  }
  cleanupEmptyFolders(targetSheetsFolder);
  // Keep the root folder (removed if empty) as it is required when processing sheets
  fs.ensureDirSync(targetSheetsFolder);
  return deletedPaths;
}

/** List existing json files within a folder (including subfolders) by filename */
function listExistingFilePaths(folder: string) {
  const existingPaths: { [filename: string]: string } = {};
  for (const filePath of recursiveFindByExtension(folder, "json")) {
    const filename = path.basename(filePath);
    if (existingPaths[filename]) {
      logWarning({
        msg1: `Multiple existing files named: ${filename}`,
        msg2: `${filePath} will be ignored, using ${existingPaths[filename]}`,
      });
      continue;
    }
    existingPaths[filename] = filePath;
  }
  return existingPaths;
}

export default {
  syncSheets: syncExternalSheets,
  syncAssets: syncExternalAssets,
};
