import fs from "fs-extra";
import { logOutput, logWarning } from "../../../utils";
import { readExternalSourcePath } from "./deploymentConfig";
import { syncFlowFiles } from "./flows";
import {
  isTransientFlowType,
  listDownloadedTransientFlows,
  readTransientSheetsList,
  syncSheets,
  TRANSIENT_SHEETS_LIST_PATH,
  syncFixedSheetsToExternalFolder,
} from "./sheets";
import { getTranslatedFolder } from "./translations/po";
import { TRANSIENT_FLOW_TYPES } from "./utils";

/**
 * Syncs combining google drive sheets (`sheets`) with the external deployment flows (`flows`),
 * which do not use each other. Sheets are synced to the external deployment, then the external
 * flow jsons that changed are processed into the app assets app_data folder (see `syncFiles`)
 */

/** Sync sheets from the external deployment config `google_drive.sheets_folders` */
export async function syncFixedSheets() {
  await syncFixedSheetsToExternalFolder();
  syncFiles();
}

/**
 * Sync the transient sheets folder recorded in the transient sheets list, using the auth token it
 * was created with. The deployment config is not used. Flows replace the json of the same name
 * in the external deployment (outside the `google_drive` folder), without `_source`, so their
 * edits are kept there. Flows added to a sheet are added to the transient sheets list
 * @returns number of sheets and flows downloaded, external jsons updated and flows added to
 * the transient sheets list
 */
export async function syncTransientSheets() {
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
  syncFiles();
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
 * Process flow jsons changed in the external deployment, or all of them with `refreshAll`
 * (see `syncFlowFiles`)
 */
export function syncFiles(options: { refreshAll?: boolean; verbose?: boolean } = {}) {
  return syncFlowFiles(options);
}

/**
 * Re-process all flows from the previously imported external deployment, so the latest
 * translated `.po` files (`app_data/translations/translated`) are added to them. Nothing is
 * downloaded
 * @returns number of flows processed
 */
export function syncTranslations(options: { verbose?: boolean } = {}) {
  const translationsFolder = getTranslatedFolder(readExternalSourcePath());
  if (!fs.existsSync(translationsFolder)) {
    logWarning({ msg1: "No translated files found", msg2: translationsFolder });
  }
  const { flows } = syncFiles({ ...options, refreshAll: true });
  logOutput({ msg1: `Re-processed ${flows} flows with translations`, msg2: translationsFolder });
  return { flows };
}
