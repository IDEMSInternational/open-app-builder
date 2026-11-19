import { FlowTypes } from "packages/data-models";

/** Flow types listed on the debug page */
export const DEBUG_SHEET_TYPES = ["template", "data_list"] as const;
export type IDebugSheetType = (typeof DEBUG_SHEET_TYPES)[number];

/** Folder used for sheets without a `_source.path` */
export const NO_PATH_FOLDER = "(no path)";

export interface IDebugSheet {
  flow_type: IDebugSheetType;
  flow_name: string;
  /** `_source.path`, relative to the external deployment sheets folder */
  path?: string;
  /** Url of the sheet the flow was synced from or created as */
  url?: string;
  /** Whether the flow is linked to a transient sheet (created from its json) */
  isTransient: boolean;
  /** Folder whose sheet the flow is in, if its transient sheet was created for a folder */
  sheetFolder?: string;
}

/** Sheet actions for the flows directly within a folder (not its subfolders) */
export interface IDebugFolderSheetState {
  /** All flows directly in the folder, ignoring any search or filters */
  flows: IDebugSheet[];
  /** No flow in the folder has a sheet, so one can be created for them all */
  canCreate: boolean;
  /** Url of the sheet created for the folder */
  url?: string;
}

export interface IDebugFolder {
  name: string;
  /** Path of the folder from the root, e.g. `google_drive/core` */
  path: string;
  folders: IDebugFolder[];
  sheets: IDebugSheet[];
  /** Total sheets within the folder and its subfolders */
  count: number;
}

/** Entry in `transient_sheets.json`, written by `beta open_sheet` */
export interface ITransientSheetEntry {
  flow_type: string;
  flow_name: string;
  url: string;
  /** Folder the sheet was created for, with all the flows in that folder */
  folder?: string;
}

/**
 * Sheets listed in `transient_sheets.json` (`{ folder, sheets }`). Older lists were an array of
 * sheets
 */
export function parseTransientSheetsList(json: unknown): ITransientSheetEntry[] {
  const sheets = Array.isArray(json) ? json : (json as { sheets?: unknown })?.sheets;
  return Array.isArray(sheets) ? sheets.filter((e) => e?.flow_name && e?.url) : [];
}

/**
 * Path relative to the external deployment sheets folder, with `/` separators. Older beta
 * imports wrote absolute paths, so anything up to `app_data/sheets/` is removed
 */
export function normaliseSourcePath(sourcePath?: string) {
  if (!sourcePath) return undefined;
  let normalised = sourcePath.replace(/\\/g, "/");
  const marker = "/app_data/sheets/";
  const index = normalised.lastIndexOf(marker);
  if (index >= 0) normalised = normalised.slice(index + marker.length);
  return normalised.replace(/^\.\//, "");
}

/**
 * Combine sheet contents entries with the transient sheets list. A flow is transient if it is
 * listed in the transient sheets list, as processed flows are not linked to their transient sheet
 */
export function toDebugSheets(
  flowType: IDebugSheetType,
  entries: FlowTypes.FlowTypeBase[],
  transientEntries: ITransientSheetEntry[] = []
): IDebugSheet[] {
  return entries.map((entry) => {
    const { _source } = entry;
    const listed = transientEntries.find(
      (e) => e.flow_type === flowType && e.flow_name === entry.flow_name
    );
    return {
      flow_type: flowType,
      flow_name: entry.flow_name,
      path: normaliseSourcePath(_source?.path),
      url: listed?.url || _source?.url,
      isTransient: !!listed,
      ...(listed?.folder ? { sheetFolder: listed.folder } : {}),
    };
  });
}

export function sortSheets(sheets: IDebugSheet[]) {
  return [...sheets].sort(
    (a, b) => a.flow_name.localeCompare(b.flow_name) || a.flow_type.localeCompare(b.flow_type)
  );
}

/** Folder path of a sheet in the folder tree, e.g. `google_drive/core/home.json` => `google_drive/core` */
export function getSheetFolderPath(sheet: IDebugSheet) {
  if (!sheet.path) return NO_PATH_FOLDER;
  return sheet.path.split("/").slice(0, -1).filter(Boolean).join("/");
}

/**
 * Sheet actions of each folder, by folder path, from the flows directly in it. A sheet can be
 * created for a folder when none of its flows has a sheet. Sheets without a path, or in the
 * root of the sheets folder, are not given folder actions
 */
export function getFolderSheetStates(sheets: IDebugSheet[]) {
  const flowsByFolder = new Map<string, IDebugSheet[]>();
  for (const sheet of sheets) {
    const folder = getSheetFolderPath(sheet);
    if (!folder || folder === NO_PATH_FOLDER) continue;
    flowsByFolder.set(folder, [...(flowsByFolder.get(folder) || []), sheet]);
  }
  const states = new Map<string, IDebugFolderSheetState>();
  for (const [folder, flows] of flowsByFolder) {
    const url = flows.find((s) => s.sheetFolder === folder && s.url)?.url;
    const canCreate = !url && flows.every((s) => !s.url && !s.isTransient);
    states.set(folder, { flows, canCreate, url });
  }
  return states;
}

/** Build a folder tree from the `path` of each sheet, with folders and sheets sorted by name */
export function buildFolderTree(sheets: IDebugSheet[]): IDebugFolder {
  const root: IDebugFolder = { name: "", path: "", folders: [], sheets: [], count: 0 };
  for (const sheet of sheets) {
    const segments = sheet.path ? sheet.path.split("/").slice(0, -1).filter(Boolean) : [];
    let folder = root;
    for (const name of sheet.path ? segments : [NO_PATH_FOLDER]) {
      let child = folder.folders.find((f) => f.name === name);
      if (!child) {
        const path = folder.path ? `${folder.path}/${name}` : name;
        child = { name, path, folders: [], sheets: [], count: 0 };
        folder.folders.push(child);
      }
      folder = child;
    }
    folder.sheets.push(sheet);
  }
  return finaliseFolder(root);
}

function finaliseFolder(folder: IDebugFolder): IDebugFolder {
  const folders = folder.folders
    .map((f) => finaliseFolder(f))
    // Sheets without a path are listed last
    .sort(
      (a, b) =>
        Number(a.name === NO_PATH_FOLDER) - Number(b.name === NO_PATH_FOLDER) ||
        a.name.localeCompare(b.name)
    );
  const count = folder.sheets.length + folders.reduce((total, f) => total + f.count, 0);
  return { ...folder, folders, sheets: sortSheets(folder.sheets), count };
}
