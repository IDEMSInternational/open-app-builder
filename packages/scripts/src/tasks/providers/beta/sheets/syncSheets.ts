import { IGdriveEntry } from "@idemsInternational/gdrive-tools";
import { FlowTypes } from "data-models";
import path from "path";
import { logOutput, logWarning } from "../../../../utils";
import { FIXED_SHEETS_FOLDER, getExternalFlowsFolder, TRANSIENT_FLOW_TYPES } from "../utils";
import { downloadSheets, getFixedSheetsFolders, ISheetsType } from "./download";
import { writeExternalFlows } from "./writeFlows";
import { loadExternalConfig, readExternalSourcePath } from "../deploymentConfig";
import { getAuthTokenPath } from "./auth";
import {
  isTransientFlowType,
  listDownloadedTransientFlows,
  readTransientSheetsList,
  TRANSIENT_SHEETS_LIST_PATH,
} from "./transientSheets";

/** How downloaded sheets of each type are written to the external deployment sheets folder */
const SHEETS_WRITE_SETTINGS: {
  [type in ISheetsType]: {
    /** Subfolder of the sheets folder flows are written within */
    folder: string;
    /** Subfolders of that folder that are not written to */
    excludeFolders: string[];
    /** Write the `_source` linking each flow to its sheet */
    includeSource: boolean;
    /** Delete flow jsons in the folder that are no longer in drive */
    deleteRemoved: boolean;
  };
} = {
  // Synced files are kept separate from flow jsons that are edited directly
  fixed: {
    folder: FIXED_SHEETS_FOLDER,
    excludeFolders: [],
    includeSource: true,
    deleteRemoved: true,
  },
  // Edits replace the flow jsons the sheets were created from, linked by the transient sheets list
  transient: {
    folder: "",
    excludeFolders: [FIXED_SHEETS_FOLDER],
    includeSource: false,
    deleteRemoved: false,
  },
};

export interface ISyncSheetsOptions {
  type: ISheetsType;
  authTokenPath: string;
  /** Only download drive entries that match (e.g. config `google_drive.sheets_filter_function`) */
  filterFn?: (gdriveEntry: IGdriveEntry) => boolean;
  /** Only write flows that match */
  flowFilter?: (flow: FlowTypes.FlowTypeWithData) => boolean;
}

/**
 * Download sheets from the external deployment config `google_drive.sheets_folders` and write
 * their flows to the external deployment fixed sheets folder. Flows are not processed into app_data
 */
export async function syncFixedSheetsToExternalFolder() {
  const externalSourcePath = readExternalSourcePath();
  const deploymentConfig = await loadExternalConfig(externalSourcePath);
  const { folders, filterFn } = getFixedSheetsFolders(deploymentConfig, externalSourcePath);
  return syncSheets(externalSourcePath, folders, {
    type: "fixed",
    authTokenPath: getAuthTokenPath(deploymentConfig),
    filterFn,
  });
}

/**
 * Download the transient sheets folder recorded in the transient sheets list, using the auth
 * token it was created with (the deployment config is not used). Flows replace the json of the
 * same name in the external deployment (outside the fixed sheets folder), without `_source`, so
 * their edits are kept there. Flows added to a sheet are added to the transient sheets list.
 * Flows are not processed into app_data
 * @returns number of sheets and flows downloaded, external jsons updated and flows added to
 * the transient sheets list
 */
export async function syncTransientSheetsToExternalFolder() {
  const { folder } = readTransientSheetsList();
  if (!folder) {
    logOutput({ msg1: "No transient sheets folder to sync", msg2: TRANSIENT_SHEETS_LIST_PATH });
    return { sheets: 0, flows: 0, updated: 0, added: 0 };
  }
  const externalSourcePath = readExternalSourcePath();
  const folders = [{ id: folder.id, name: "transient sheets" }];
  const result = await syncSheets(externalSourcePath, folders, {
    type: "transient",
    authTokenPath: folder.auth_token_path,
    flowFilter: isTransientFlowType,
  });
  const flows = result.flows.filter((flow) => TRANSIENT_FLOW_TYPES.includes(flow.flow_type));
  const added = listDownloadedTransientFlows(flows, folder.id).length;
  const { sheets, updated } = result;
  logOutput({
    msg1: `Synced ${sheets} transient sheets, ${flows.length} flows, ${updated} updated, ${added} added`,
    msg2: folder.url,
  });
  return { sheets, flows: flows.length, updated, added };
}

/**
 * Download sheets from google drive folders and write their flows to the external deployment
 * sheets folder, as set for the sheets type (see `SHEETS_WRITE_SETTINGS`)
 * @returns number of workbooks downloaded, downloaded flows (with `_source`), and number of
 * external flow jsons updated and deleted
 */
export async function syncSheets(
  externalSourcePath: string,
  folders: { id: string; name: string }[],
  options: ISyncSheetsOptions
) {
  const { type, flowFilter = () => true } = options;
  const settings = SHEETS_WRITE_SETTINGS[type];
  const download = await downloadSheets(folders, options);
  const flowsFolder = getExternalFlowsFolder(externalSourcePath);
  const targetFolder = path.resolve(flowsFolder, settings.folder);
  // Only remove files when all sources are available, so a missing download does not delete
  // every flow it would have contained
  const deleteRemoved = settings.deleteRemoved && download.allFoldersFound;
  if (settings.deleteRemoved && !deleteRemoved) {
    logWarning({ msg1: "Skipping removal of deleted flows", msg2: "Not all folders were found" });
  }
  const { updatedPaths, deletedPaths } = writeExternalFlows(download.flows.filter(flowFilter), {
    targetFolder,
    excludeFolders: settings.excludeFolders,
    includeSource: settings.includeSource,
    deleteRemoved,
    flowsFolder,
  });
  const { sheets, flows } = download;
  logOutput({
    msg1: `Synced ${sheets} ${type} sheets, ${flows.length} flows, ${updatedPaths.length} updated, ${deletedPaths.length} deleted`,
    msg2: targetFolder,
  });
  return { sheets, flows, updated: updatedPaths.length, deleted: deletedPaths.length };
}
