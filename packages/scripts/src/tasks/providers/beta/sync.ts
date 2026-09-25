import { GDriveDownloader } from "@idemsInternational/gdrive-tools";
import { FlowTypes } from "data-models";
import fs from "fs-extra";
import path from "path";
import {
  AUTH_TOKEN_PATH,
  CREDENTIALS_PATH,
  SCRIPTS_WORKSPACE_PATH,
  SRC_ASSETS_PATH,
} from "../../../paths";
import { logOutput, logWarning, recursiveFindByExtension } from "../../../utils";
import { loadExternalDeploymentJson } from "./deploymentConfig";
import { decryptExternalFolder } from "./encryption";
import { parseSheetWorkbook } from "./parsers";
import { processSheets } from "./processSheets";

/** Local cache of workbooks downloaded from google drive, used to only download changed files */
const SHEETS_CACHE_PATH = path.resolve(SCRIPTS_WORKSPACE_PATH, "cache", "beta_sheets");

/**
 * Download sheets from the google drive folders listed in the external deployment config,
 * convert to basic flow jsons and write to the external deployment app_data/sheets folder.
 * Flows are written to the sheets root, unless a file with the same name already exists in
 * a subfolder, in which case it is overwritten in place. Any updated flows are then processed
 * into the app assets app_data folder
 */
export async function syncExternalSheets(options: { skipDownload?: boolean; verbose?: boolean }) {
  const { skipDownload = false, verbose = false } = options;
  const externalSourcePath = readExternalSourcePath();

  // Decrypt config before compiling in case it references encrypted values
  await decryptExternalFolder(path.resolve(externalSourcePath, "encrypted"));
  const deploymentConfig = loadExternalDeploymentJson(externalSourcePath);
  const {
    sheets_folders = [],
    sheets_filter_function,
    auth_token_path,
  } = deploymentConfig.google_drive || {};
  if (sheets_folders.length === 0) {
    throw new Error(`No google_drive.sheets_folders specified in config: ${externalSourcePath}`);
  }

  const downloadFolders: string[] = [];
  for (const { id, name } of sheets_folders) {
    // Downloads are cached locally (by folder id) so only the parsed jsons reach the external folder
    const outputPath = path.resolve(SHEETS_CACHE_PATH, id);
    if (!skipDownload) {
      const downloader = new GDriveDownloader({
        folderId: id,
        logPrefix: name,
        outputPath,
        credentialsPath: CREDENTIALS_PATH,
        authTokenPath: auth_token_path || AUTH_TOKEN_PATH,
        filterFn: sheets_filter_function,
      });
      await downloader.downloadFolder(id);
    }
    downloadFolders.push(outputPath);
  }

  const flows = parseDownloadedSheets(downloadFolders, verbose);
  const targetSheetsFolder = path.resolve(externalSourcePath, "app_data", "sheets");
  const updatedPaths = writeFlows(flows, targetSheetsFolder, verbose);

  logOutput({
    msg1: `Synced ${flows.length} flows, ${updatedPaths.length} updated`,
    msg2: targetSheetsFolder,
  });

  if (updatedPaths.length > 0) {
    processSheets({
      sourceSheetsFolder: targetSheetsFolder,
      targetAppDataFolder: path.resolve(SRC_ASSETS_PATH, "app_data"),
      filePaths: updatedPaths,
      verbose,
    });
  }
}

/** Read the external deployment path saved by the beta import command */
function readExternalSourcePath() {
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
  for (const folder of downloadFolders) {
    if (!fs.existsSync(folder)) {
      logWarning({ msg1: "Sheets download folder not found", msg2: folder });
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
  return Object.values(flowsByName);
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
};
