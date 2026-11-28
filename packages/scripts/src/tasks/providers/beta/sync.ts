import fs from "fs-extra";
import { logOutput, logWarning } from "../../../utils";
import { readExternalSourcePath } from "./deploymentConfig";
import { syncFlowFiles } from "./flows";
import { syncFixedSheetsToExternalFolder, syncTransientSheetsToExternalFolder } from "./sheets";
import { getTranslatedFolder } from "./translations/po";

/**
 * Syncs combining google drive sheets (`sheets`) with the external deployment flows (`flows`),
 * which do not use each other. Sheets are synced to the external deployment, then the external
 * flow jsons that changed are processed into the app assets app_data folder (see `syncFiles`)
 */

/** Sync sheets from the external deployment config `google_drive.sheets_folders` */
export async function syncFixedSheets(options: { verbose?: boolean } = {}) {
  await syncFixedSheetsToExternalFolder();
  syncFiles(options);
}

/**
 * Sync the transient sheets folder recorded in the transient sheets list
 * (see `syncTransientSheetsToExternalFolder`), then process the changed flow jsons
 * @returns number of sheets and flows downloaded, external jsons updated and flows added to
 * the transient sheets list
 */
export async function syncTransientSheets(options: { verbose?: boolean } = {}) {
  const result = await syncTransientSheetsToExternalFolder();
  syncFiles(options);
  return result;
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
