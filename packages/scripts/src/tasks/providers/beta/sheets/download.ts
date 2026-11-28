import { GDriveDownloader, IGdriveEntry } from "@idemsInternational/gdrive-tools";
import { FlowTypes } from "data-models";
import fs from "fs-extra";
import path from "path";
import { IDeploymentConfigJson } from "../../../../commands/deployment/common";
import { CREDENTIALS_PATH, SCRIPTS_WORKSPACE_PATH } from "../../../../paths";
import { logOutput, logWarning, recursiveFindByExtension } from "../../../../utils";
import { SheetConvertor } from "./sheetConvertor";

/** Downloader metadata file listing drive entries (including file ids) for a folder */
const DOWNLOAD_METADATA_FILENAME = "_metadata.json";

/**
 * Sheets from the deployment config `google_drive.sheets_folders` (`fixed`), or from the folder
 * that transient sheets are created in (`transient`, see `createTransientSheet`)
 */
export type ISheetsType = "fixed" | "transient";

/** Local cache of downloaded workbooks (by folder id), used to only download changed files */
const SHEETS_CACHE_PATHS: { [type in ISheetsType]: string } = {
  fixed: path.resolve(SCRIPTS_WORKSPACE_PATH, "cache", "beta_sheets"),
  transient: path.resolve(SCRIPTS_WORKSPACE_PATH, "cache", "beta_transient_sheets"),
};

export interface IDownloadSheetsOptions {
  type: ISheetsType;
  authTokenPath: string;
  /** Only download drive entries that match (e.g. config `google_drive.sheets_filter_function`) */
  filterFn?: (gdriveEntry: IGdriveEntry) => boolean;
}

export interface IDownloadSheetsResult {
  /** Number of workbooks downloaded */
  sheets: number;
  /** Flows from the downloaded workbooks, each with a `_source` linking to its sheet */
  flows: FlowTypes.FlowTypeWithData[];
  /** Whether every folder was downloaded, so flows missing from `flows` were removed in drive */
  allFoldersFound: boolean;
}

/**
 * Download sheets from google drive folders and convert them to basic flow jsons. Each flow
 * includes a `_source` block with the drive folder, workbook path and sheet url
 */
export async function downloadSheets(
  folders: { id: string; name: string }[],
  options: IDownloadSheetsOptions
): Promise<IDownloadSheetsResult> {
  const { type, authTokenPath, filterFn } = options;
  const downloadFolders = await downloadDriveFolders(folders, {
    cachePath: SHEETS_CACHE_PATHS[type],
    authTokenPath,
    filterFn,
  });
  return parseDownloadedSheets(downloadFolders);
}

/** Google drive folders listed in the deployment config to download fixed sheets from */
export function getFixedSheetsFolders(
  deploymentConfig: IDeploymentConfigJson,
  externalSourcePath: string
) {
  const { sheets_folders = [], sheets_filter_function } = deploymentConfig.google_drive || {};
  if (sheets_folders.length === 0) {
    throw new Error(`No google_drive.sheets_folders specified in config: ${externalSourcePath}`);
  }
  return { folders: sheets_folders, filterFn: sheets_filter_function };
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
    /** Skip download and use the previously downloaded cache (used by assets sync) */
    skipDownload?: boolean;
  }
) {
  const { cachePath, authTokenPath, filterFn, skipDownload = false } = options;
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

/** Google drive file id of a sheet url, e.g. `https://docs.google.com/spreadsheets/d/<id>` */
export function getSheetId(url: unknown) {
  if (typeof url !== "string") return undefined;
  return url.match(/\/spreadsheets\/d\/([a-zA-Z0-9_-]+)/)?.[1];
}

/**
 * Convert all downloaded xlsx files to flows, warning on duplicate flow names
 * @returns flows, number of workbooks, and whether all download folders were found
 */
function parseDownloadedSheets(downloadFolders: string[]) {
  const flowsByName: { [flow_name: string]: FlowTypes.FlowTypeWithData } = {};
  const flowSources: { [flow_name: string]: string } = {};
  let allFoldersFound = true;
  let sheets = 0;
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
    sheets += xlsxPaths.length;
    for (const xlsxPath of xlsxPaths) {
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
  return { flows: Object.values(flowsByName), sheets, allFoldersFound };
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
