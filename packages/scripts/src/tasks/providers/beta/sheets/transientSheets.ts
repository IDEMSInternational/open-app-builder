import { FlowTypes } from "data-models";
import fs from "fs-extra";
import open from "open";
import path from "path";
import { logOutput, logWarning } from "../../../../utils";
import { loadExternalConfig, readExternalSourcePath } from "../deploymentConfig";
import { APP_DATA_PATH, isValidFlowName, TRANSIENT_FLOW_TYPES } from "../utils";
import { getAuthTokenPath } from "./auth";
import { getSheetId } from "./download";
import { authorizeDriveFiles, binDriveFile, createDriveFolder, uploadFlowsSheet } from "./upload";

/**
 * Google drive folder that transient sheets are created in, and the flows linked to transient
 * sheets (see `ITransientSheetsList`). Flows are only linked to their transient sheet by this
 * list: neither the external flow jsons nor the processed flows have the sheet url
 */
export const TRANSIENT_SHEETS_LIST_PATH = path.resolve(APP_DATA_PATH, "transient_sheets.json");

/** Flow name used to remove all transient sheets */
export const ALL_TRANSIENT_SHEETS = "ALL";

export interface ITransientSheetEntry {
  flow_type: string;
  flow_name: string;
  url: string;
  /**
   * Folder (relative to the external deployment sheets folder) the sheet was created for, with
   * all flows in that folder. Flows of a folder sheet are removed together
   */
  folder?: string;
  /**
   * Google drive folder the sheet is in, if it is the transient sheets folder, so the sheet is
   * binned with the folder (see `removeTransientSheet`)
   */
  drive_folder_id?: string;
}

/** Google drive folder transient sheets are created in, synced by `syncTransientSheets` */
export interface ITransientFolder {
  id: string;
  url: string;
  /** Google drive auth token the folder was created with, used to download it */
  auth_token_path: string;
}

/** Contents of `transient_sheets.json` */
export interface ITransientSheetsList {
  /** Created with the first transient sheet (see `createTransientSheet`), and binned with the last */
  folder?: ITransientFolder;
  /** Flows linked to transient sheets */
  sheets: ITransientSheetEntry[];
}

export interface ISheetOptions {
  /** Only match flows of this type, in case the same name is used by multiple types */
  flowType?: string;
  /** Drive folder to create the transient sheets folder in, if it is created. Defaults to My Drive */
  folderId?: string;
  /** Open the sheet in the browser (default true) */
  openBrowser?: boolean;
  /** Name of a new sheet in drive. Defaults to the (first) flow name */
  sheetName?: string;
  /**
   * Folder of the external deployment sheets folder the new sheet holds the flows of, recorded
   * in the transient sheets list so the flows can be removed together (see `removeTransientSheet`)
   */
  folder?: string;
}

export interface ISheetResult {
  /** First flow in the sheet */
  flow_name: string;
  /** All flows in the sheet, when created with several flows */
  flow_names?: string[];
  url: string;
  created: boolean;
}

export interface IRemoveTransientSheetResult {
  /** Flows unlinked from their transient sheet */
  removed: string[];
  /** Number of sheets moved to the google drive bin */
  deleted: number;
  /** Urls of sheets that could not be deleted (e.g. no permission), although their flows were unlinked */
  failed: string[];
}

/*************************************************************************************
 * Transient sheets list
 *************************************************************************************/

/** Read the transient sheets list. Older lists were an array of sheets, with no folder */
export function readTransientSheetsList(): ITransientSheetsList {
  if (!fs.existsSync(TRANSIENT_SHEETS_LIST_PATH)) return { sheets: [] };
  let json: any;
  try {
    json = fs.readJsonSync(TRANSIENT_SHEETS_LIST_PATH);
  } catch {
    logWarning({ msg1: "Failed to read transient sheets list", msg2: TRANSIENT_SHEETS_LIST_PATH });
    return { sheets: [] };
  }
  const sheets: any[] = Array.isArray(json) ? json : Array.isArray(json?.sheets) ? json.sheets : [];
  const folder = Array.isArray(json) ? undefined : json?.folder;
  const list: ITransientSheetsList = {
    sheets: sheets.filter((e) => e && isValidFlowName(e.flow_name) && typeof e.url === "string"),
  };
  if (typeof folder?.id === "string" && folder.id) list.folder = folder;
  return list;
}

export function writeTransientSheetsList(list: ITransientSheetsList) {
  const json: ITransientSheetsList = list.folder
    ? { folder: list.folder, sheets: list.sheets }
    : { sheets: list.sheets };
  fs.ensureDirSync(path.dirname(TRANSIENT_SHEETS_LIST_PATH));
  fs.writeJsonSync(TRANSIENT_SHEETS_LIST_PATH, json, { spaces: 2 });
}

export function readTransientSheets(): ITransientSheetEntry[] {
  return readTransientSheetsList().sheets;
}

export function findTransientSheet(flowType: string, flowName: string) {
  return readTransientSheets().find((e) => e.flow_type === flowType && e.flow_name === flowName);
}

/** Add or replace flows in the transient sheets list */
export function addTransientSheets(entries: ITransientSheetEntry[]) {
  const list = readTransientSheetsList();
  list.sheets = list.sheets.filter((e) => !entries.some((entry) => isSameFlow(e, entry)));
  list.sheets.push(...entries);
  writeTransientSheetsList(list);
}

/** Remove flows from the transient sheets list, and the folder if no flows are left */
export function removeTransientSheets(removed: ITransientSheetEntry[]) {
  const list = readTransientSheetsList();
  list.sheets = list.sheets.filter((e) => !removed.some((r) => isSameFlow(e, r)));
  if (list.sheets.length === 0) delete list.folder;
  writeTransientSheetsList(list);
}

/**
 * Add flows downloaded from the transient sheets folder that are not in the transient sheets
 * list (e.g. added to a sheet's `==content_list==`), with the `folder` of a listed flow from the
 * same sheet. Listed flows found in a different sheet are updated to link to it
 * @param flows downloaded flows, with the `_source` url of their sheet
 * @returns entries added to the list
 */
export function listDownloadedTransientFlows(
  flows: FlowTypes.FlowTypeWithData[],
  driveFolderId: string
) {
  const list = readTransientSheetsList();
  const added: ITransientSheetEntry[] = [];
  let changed = false;
  for (const { flow_type, flow_name, _source } of flows) {
    const url = _source?.url;
    if (!url) continue;
    const listed = list.sheets.find((e) => isSameFlow(e, { flow_type, flow_name }));
    if (listed) {
      if (listed.url !== url) {
        logWarning({ msg1: `Transient flow moved to another sheet: ${flow_name}`, msg2: url });
        listed.url = url;
        listed.drive_folder_id = driveFolderId;
        changed = true;
      }
      continue;
    }
    const sibling = list.sheets.find((e) => e.url === url);
    const entry: ITransientSheetEntry = {
      flow_type,
      flow_name,
      url,
      drive_folder_id: driveFolderId,
    };
    if (sibling?.folder) entry.folder = sibling.folder;
    list.sheets.push(entry);
    added.push(entry);
    changed = true;
    logOutput({ msg1: `New flow in transient sheet: ${flow_name}`, msg2: url });
  }
  if (changed) writeTransientSheetsList(list);
  return added;
}

function isSameFlow(a: { flow_type: string; flow_name: string }, b: typeof a) {
  return a.flow_type === b.flow_type && a.flow_name === b.flow_name;
}

/** Whether a downloaded flow can have a transient sheet, warning if not */
export function isTransientFlowType({ flow_type, flow_name }: FlowTypes.FlowTypeWithData) {
  if (TRANSIENT_FLOW_TYPES.includes(flow_type)) return true;
  logWarning({ msg1: `Skipping ${flow_type} flow in transient sheet`, msg2: flow_name });
  return false;
}

/*************************************************************************************
 * Transient sheets in google drive
 *************************************************************************************/

/**
 * Create a transient google sheet from one or more flows, so they can be edited and synced.
 * The sheet is created in the transient sheets folder, which is created first if there are no
 * transient sheets. Each flow is added to the transient sheets list. The external flow jsons are
 * not changed until the sheet is synced (see `syncTransientSheets`)
 */
export async function createTransientSheet(
  flows: FlowTypes.FlowTypeWithData[],
  options: ISheetOptions = {}
) {
  const { openBrowser = true, folderId, folder } = options;
  if (flows.length === 0) throw new Error("At least one flow is required");
  const names = flows.map((flow) => flow.flow_name);
  const sheetName = options.sheetName || names[0];
  for (const flow of flows) {
    if (!TRANSIENT_FLOW_TYPES.includes(flow.flow_type)) {
      throw new Error(
        `Sheets can only be created for: ${TRANSIENT_FLOW_TYPES.join(", ")} (${flow.flow_name} is ${flow.flow_type})`
      );
    }
    if (flow._source?.url) {
      logWarning({ msg1: `Flow already has a sheet: ${flow.flow_name}`, msg2: flow._source.url });
    }
  }

  const deploymentConfig = await loadExternalConfig(readExternalSourcePath());
  const authTokenPath = getAuthTokenPath(deploymentConfig);
  const drive = await authorizeDriveFiles(authTokenPath);
  // Sheets are synced from the transient sheets folder, so must be created in it
  const list = readTransientSheetsList();
  let driveFolder = list.folder;
  if (!driveFolder || list.sheets.length === 0) {
    const name = `${deploymentConfig.name} transient sheets`;
    const created = await createDriveFolder(drive, name, folderId);
    driveFolder = { ...created, auth_token_path: authTokenPath };
    writeTransientSheetsList({ folder: driveFolder, sheets: list.sheets });
    logOutput({ msg1: "Created transient sheets folder", msg2: driveFolder.url });
  }
  const driveFolderId = driveFolder.id;
  const url = await uploadFlowsSheet(drive, flows, { name: sheetName, folderId: driveFolderId });

  // Each flow is listed separately, syncTransientSheets downloads a shared sheet once
  addTransientSheets(
    flows.map(({ flow_type, flow_name }) => ({
      flow_type,
      flow_name,
      url,
      drive_folder_id: driveFolderId,
      ...(folder ? { folder } : {}),
    }))
  );

  logOutput({ msg1: `Created sheet: ${sheetName} (${names.join(", ")})`, msg2: url });
  if (openBrowser) await open(url);
  const result: ISheetResult = { flow_name: names[0], url, created: true };
  if (names.length > 1) result.flow_names = names;
  return result;
}

/**
 * Remove the transient sheet of a flow, or of all flows (`ALL`), or of all flows of a folder
 * sheet (`options.folder`, see `createTransientSheet`): the sheet is moved to the google drive bin,
 * and the flow is removed from the transient sheets list. A sheet containing several flows is
 * only deleted once none of them are listed. When no transient sheets are left, the transient
 * sheets folder is binned (with any sheets in it) and forgotten, so the next sheet creates a new
 * one. The flow content is not changed, so it keeps any edits synced from the sheet
 */
export async function removeTransientSheet(
  flowName: string | undefined,
  options: { flowType?: string; folder?: string } = {}
): Promise<IRemoveTransientSheetResult> {
  const { flowType, folder } = options;
  const { folder: transientFolder, sheets: entries } = readTransientSheetsList();
  const removeAll = !folder && flowName === ALL_TRANSIENT_SHEETS;
  if (!folder && !removeAll && !isValidFlowName(flowName)) {
    throw new Error(`Invalid flow name: ${flowName}`);
  }
  const isMatch = (e: ITransientSheetEntry) =>
    folder ? e.folder === folder : removeAll || e.flow_name === flowName;
  const removed = entries.filter((e) => isMatch(e) && (!flowType || e.flow_type === flowType));
  if (removed.length === 0) {
    if (folder) throw new Error(`No folder sheet for: ${folder}`);
    if (!removeAll) {
      throw new Error(`No transient sheet for: ${flowName}${flowType ? ` (${flowType})` : ""}`);
    }
    logOutput({ msg1: "No transient sheets to remove", msg2: TRANSIENT_SHEETS_LIST_PATH });
    return { removed: [], deleted: 0, failed: [] };
  }

  // Only delete sheets that no remaining flow is linked to
  const kept = entries.filter((e) => !removed.includes(e));
  const keptSheetIds = new Set(kept.map((e) => getSheetId(e.url)));
  // With no sheets left the folder is binned, which bins the sheets in it too
  const binFolder = !!transientFolder && kept.length === 0;
  const isInBinnedFolder = (e: ITransientSheetEntry) =>
    binFolder && e.drive_folder_id === transientFolder?.id;
  const folderSheetIds = uniqueSheetIds(removed.filter(isInBinnedFolder));
  const sheetIds = uniqueSheetIds(removed).filter(
    (id) => !keptSheetIds.has(id) && !folderSheetIds.includes(id)
  );

  let deleted = 0;
  const failed: string[] = [];
  if (sheetIds.length > 0 || binFolder) {
    const deploymentConfig = await loadExternalConfig(readExternalSourcePath());
    const drive = await authorizeDriveFiles(getAuthTokenPath(deploymentConfig));
    for (const sheetId of sheetIds) {
      const url = `https://docs.google.com/spreadsheets/d/${sheetId}`;
      if (await binDriveFile(drive, sheetId, url)) {
        deleted++;
        logOutput({ msg1: "Deleted sheet", msg2: url });
      } else {
        failed.push(url);
      }
    }
    if (binFolder && transientFolder) {
      if (await binDriveFile(drive, transientFolder.id, transientFolder.url)) {
        deleted += folderSheetIds.length;
        logOutput({ msg1: "Deleted transient sheets folder", msg2: transientFolder.url });
      } else {
        failed.push(transientFolder.url);
      }
    }
  }

  removeTransientSheets(removed);
  const names = removed.map((e) => e.flow_name);
  logOutput({
    msg1: `Removed ${removed.length} transient sheets, ${deleted} deleted from google drive`,
    msg2: names.join(", "),
  });
  return { removed: names, deleted, failed };
}

/** Distinct sheet ids of transient sheet entries */
function uniqueSheetIds(entries: ITransientSheetEntry[]) {
  return entries
    .map((e) => getSheetId(e.url))
    .filter((id, i, ids): id is string => !!id && ids.indexOf(id) === i);
}
