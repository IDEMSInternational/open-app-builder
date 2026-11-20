import path from "path";
import { SRC_ASSETS_PATH } from "../../../paths";

/** App assets folder that external deployment flows are processed into */
export const APP_DATA_PATH = path.resolve(SRC_ASSETS_PATH, "app_data");

/** Flow types that can have transient sheets (globals are combined from all sheets) */
export const TRANSIENT_FLOW_TYPES = ["data_list", "template"];

/**
 * Whether a flow_name is safe to use as a filename. Flows are written as `{flow_name}.json`,
 * so names containing path separators, relative segments or absolute paths are rejected to
 * prevent writing outside the target folder
 */
export function isValidFlowName(flow_name: unknown): flow_name is string {
  return (
    typeof flow_name === "string" &&
    flow_name !== "." &&
    flow_name !== ".." &&
    !/[\\/]/.test(flow_name) &&
    !path.isAbsolute(flow_name) &&
    !path.win32.isAbsolute(flow_name)
  );
}

/**
 * Subfolder of the external sheets folder that downloaded flows are written to, keeping them
 * separate from flow jsons that are edited directly
 */
/** Folder of flow jsons in an external deployment */
export function getExternalFlowsFolder(externalSourcePath: string) {
  return path.resolve(externalSourcePath, "app_data", "sheets");
}

export const FIXED_SHEETS_FOLDER = "google_drive";

export function isWithinFolder(filePath: string, folder: string) {
  const relative = path.relative(folder, filePath);
  return !relative.startsWith("..") && !path.isAbsolute(relative);
}

/**
 * Whether a flow json was written by the google drive sync, so its `_source` links to the sheet
 * it came from. Files elsewhere may be copies of synced files, so their `_source` is not trusted
 */
export function isFixedFlow(filePath: string, sheetsFolder: string) {
  return isWithinFolder(filePath, path.resolve(sheetsFolder, FIXED_SHEETS_FOLDER));
}
