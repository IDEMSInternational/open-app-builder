import { authorizeGDrive, GDriveDownloader, IGdriveEntry } from "@idemsInternational/gdrive-tools";
import { FlowTypes } from "data-models";
import fs from "fs-extra";
import path from "path";
import { IDeploymentConfigJson } from "../../../../commands/deployment/common";
import { CREDENTIALS_PATH, SCRIPTS_WORKSPACE_PATH } from "../../../../paths";
import {
  cleanupEmptyFolders,
  logOutput,
  logWarning,
  recursiveFindByExtension,
} from "../../../../utils";
import { FIXED_SHEETS_FOLDER, isValidFlowName, isWithinFolder } from "../utils";
import { getAuthTokenPath } from "./auth";
import { SheetConvertor } from "./sheetConvertor";
import { ITransientSheetEntry, readAppDataFlow, transientTag } from "./transientSheets";

/** Local cache of workbooks downloaded from google drive, used to only download changed files */
const SHEETS_CACHE_PATH = path.resolve(SCRIPTS_WORKSPACE_PATH, "cache", "beta_sheets");
/** Working folder for downloaded transient flows before they are processed into app_data */
export const TRANSIENT_SHEETS_CACHE_PATH = path.resolve(
  SCRIPTS_WORKSPACE_PATH,
  "cache",
  "beta_transient_sheets"
);
/** Downloader metadata file listing drive entries (including file ids) for a folder */
const DOWNLOAD_METADATA_FILENAME = "_metadata.json";
const XLSX_MIMETYPE = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";

export interface IDownloadOptions {
  skipDownload?: boolean;
  verbose?: boolean;
}

/**
 * Download sheets from the google drive folders listed in the external deployment config,
 * convert to basic flow jsons and write to the external deployment app_data/sheets/google_drive
 * folder. Each flow includes a `_source` block with the drive folder, workbook path and sheet url.
 * Existing json files in the google_drive folder that do not match a downloaded flow are deleted.
 * Files elsewhere in the sheets folder are not changed, so they can be edited directly
 */
export async function downloadFixedSheets(
  externalSourcePath: string,
  deploymentConfig: IDeploymentConfigJson,
  options: IDownloadOptions
) {
  const { skipDownload = false, verbose = false } = options;
  const { sheets_folders = [], sheets_filter_function } = deploymentConfig.google_drive || {};
  if (sheets_folders.length === 0) {
    throw new Error(`No google_drive.sheets_folders specified in config: ${externalSourcePath}`);
  }

  // Downloads are cached locally so only the parsed jsons reach the external folder
  const downloadFolders = await downloadDriveFolders(sheets_folders, {
    cachePath: SHEETS_CACHE_PATH,
    authTokenPath: getAuthTokenPath(deploymentConfig),
    filterFn: sheets_filter_function,
    skipDownload,
  });

  const { flows, allFoldersFound } = parseDownloadedSheets(downloadFolders, verbose);
  const sheetsFolder = path.resolve(externalSourcePath, "app_data", "sheets");
  const targetSheetsFolder = path.resolve(sheetsFolder, FIXED_SHEETS_FOLDER);
  warnLocalDuplicates(flows, sheetsFolder);
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
 * Download the sheets of the given transient sheet entries and write the listed flows to
 * `TRANSIENT_SHEETS_CACHE_PATH` (emptied first), tagged with `_source` and `"transient": "true"`.
 * Flows in a sheet that are not listed are ignored
 * @returns number of sheets and paths of the flow jsons written
 */
export async function downloadTransientSheets(
  entries: ITransientSheetEntry[],
  deploymentConfig: IDeploymentConfigJson,
  options: { verbose?: boolean } = {}
) {
  const { verbose = false } = options;
  // Group listed flows by sheet, as one workbook can contain several flows
  const entriesBySheetId: { [sheetId: string]: ITransientSheetEntry[] } = {};
  for (const entry of entries) {
    const sheetId = getSheetId(entry.url);
    if (!sheetId) {
      logWarning({ msg1: `Transient sheet has no valid url: ${entry.flow_name}`, msg2: entry.url });
      continue;
    }
    (entriesBySheetId[sheetId] ??= []).push(entry);
  }
  const sheetIds = Object.keys(entriesBySheetId);

  const { drive } = await authorizeGDrive({
    credentialsPath: CREDENTIALS_PATH,
    authTokenPath: getAuthTokenPath(deploymentConfig),
  });

  fs.ensureDirSync(TRANSIENT_SHEETS_CACHE_PATH);
  fs.emptyDirSync(TRANSIENT_SHEETS_CACHE_PATH);
  const filePaths: string[] = [];
  for (const sheetId of sheetIds) {
    const url = `https://docs.google.com/spreadsheets/d/${sheetId}`;
    let xlsxData: Buffer;
    try {
      const res = await drive.files.export(
        { fileId: sheetId, mimeType: XLSX_MIMETYPE },
        { responseType: "arraybuffer" }
      );
      xlsxData = Buffer.from(res.data as ArrayBuffer);
    } catch (error) {
      logWarning({ msg1: `Failed to download sheet: ${url}`, msg2: (error as Error).message });
      continue;
    }
    const flows = SheetConvertor.sheetToFlow(xlsxData, url);
    for (const entry of entriesBySheetId[sheetId]) {
      const parsed = flows.find(
        (f) => f.flow_name === entry.flow_name && f.flow_type === entry.flow_type
      );
      if (!parsed) {
        logWarning({ msg1: `Flow not found in sheet: ${entry.flow_name}`, msg2: url });
        continue;
      }
      const existingSource = readAppDataFlow(entry.flow_type, entry.flow_name)?._source;
      const flow = { ...parsed, ...transientTag({ ...existingSource, url }) };
      const filePath = path.resolve(TRANSIENT_SHEETS_CACHE_PATH, `${entry.flow_name}.json`);
      fs.writeFileSync(filePath, JSON.stringify(flow, null, 2) + "\n");
      filePaths.push(filePath);
      if (verbose) {
        logOutput({ msg1: `Downloaded flow: ${entry.flow_name}`, msg2: url });
      }
    }
  }
  return { sheets: sheetIds.length, filePaths };
}

/**
 * Download google drive folders to a local cache (by folder id)
 * @returns paths to the cached download folders
 */
export async function downloadDriveFolders(
  folders: { id: string; name: string }[],
  options: {
    cachePath: string;
    authTokenPath: string;
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
        authTokenPath,
        filterFn,
      });
      await downloader.downloadFolder(id);
    }
    downloadFolders.push(outputPath);
  }
  return downloadFolders;
}

/** Extract the file id from a google sheets url */
function getSheetId(url: unknown) {
  if (typeof url !== "string") return undefined;
  return url.match(/\/spreadsheets\/d\/([a-zA-Z0-9_-]+)/)?.[1];
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
    const driveIds = readDriveFileIds(folder);
    // Ignore transient lock files created when a workbook is open in excel
    const xlsxPaths = recursiveFindByExtension(folder, "xlsx").filter(
      (filePath) => !path.basename(filePath).startsWith("~$")
    );
    for (const xlsxPath of xlsxPaths) {
      if (verbose) {
        logOutput({ msg1: "Parsing workbook", msg2: xlsxPath });
      }
      const relativePath = path.relative(folder, xlsxPath).split(path.sep).join("/");
      const driveId = driveIds[relativePath];
      // Same format as the main sync, added last so it appears at the bottom of each file
      const _source: FlowTypes.FlowTypeBase["_source"] = {
        name: path.basename(folder),
        path: relativePath,
        ...(driveId && { url: `https://docs.google.com/spreadsheets/d/${driveId}` }),
      };
      for (const parsedFlow of SheetConvertor.sheetToFlow(fs.readFileSync(xlsxPath), xlsxPath)) {
        const flow = { ...parsedFlow, _source };
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
 * Read the drive file ids written by the gdrive downloader, keyed by path relative to the
 * download folder. Returns an empty map if no metadata is available
 */
function readDriveFileIds(downloadFolder: string) {
  const ids: { [relativePath: string]: string } = {};
  const metadataPath = path.resolve(downloadFolder, DOWNLOAD_METADATA_FILENAME);
  if (!fs.existsSync(metadataPath)) return ids;
  try {
    const entries: IGdriveEntry[] = fs.readJsonSync(metadataPath);
    for (const { id, relativePath } of entries) {
      if (id && relativePath) ids[relativePath] = id;
    }
  } catch (error) {
    logWarning({ msg1: "Failed to read download metadata", msg2: metadataPath });
  }
  return ids;
}

/**
 * Warn when a downloaded flow has the same filename as a json outside the google_drive folder,
 * as both will be processed and only one kept
 */
function warnLocalDuplicates(flows: FlowTypes.FlowTypeWithData[], sheetsFolder: string) {
  if (!fs.existsSync(sheetsFolder)) return;
  const driveFolder = path.resolve(sheetsFolder, FIXED_SHEETS_FOLDER);
  const localPaths = listExistingFilePaths(sheetsFolder, (filePath) =>
    isWithinFolder(filePath, driveFolder)
  );
  for (const { flow_name } of flows) {
    const localPath = localPaths[`${flow_name}.json`];
    if (localPath) {
      logWarning({
        msg1: `Flow also exists outside ${FIXED_SHEETS_FOLDER}`,
        msg2: localPath,
      });
    }
  }
}

/**
 * Write flows to the target folder. Files that already exist anywhere within the folder
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
function listExistingFilePaths(folder: string, excludeFn?: (filePath: string) => boolean) {
  const existingPaths: { [filename: string]: string } = {};
  for (const filePath of recursiveFindByExtension(folder, "json")) {
    if (excludeFn?.(filePath)) continue;
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
