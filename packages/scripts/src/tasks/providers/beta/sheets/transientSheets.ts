import { FlowTypes } from "data-models";
import fs from "fs-extra";
import path from "path";
import { SRC_ASSETS_PATH } from "../../../../paths";
import { logWarning } from "../../../../utils";
import { isValidFlowName } from "../utils";

export const APP_DATA_PATH = path.resolve(SRC_ASSETS_PATH, "app_data");
/**
 * List of flows with transient sheets (created from a flow json), checked by
 * `syncTransientSheets` so only these flows are updated
 */
export const TRANSIENT_SHEETS_LIST_PATH = path.resolve(APP_DATA_PATH, "transient_sheets.json");
/** Flow types that can have transient sheets (globals are combined from all sheets) */
export const TRANSIENT_FLOW_TYPES = ["data_list", "template"];

export interface ITransientSheetEntry {
  flow_type: string;
  flow_name: string;
  url: string;
}

export function readTransientSheets(): ITransientSheetEntry[] {
  if (!fs.existsSync(TRANSIENT_SHEETS_LIST_PATH)) return [];
  try {
    const entries = fs.readJsonSync(TRANSIENT_SHEETS_LIST_PATH);
    return Array.isArray(entries)
      ? entries.filter((e) => e && isValidFlowName(e.flow_name) && typeof e.url === "string")
      : [];
  } catch {
    logWarning({ msg1: "Failed to read transient sheets list", msg2: TRANSIENT_SHEETS_LIST_PATH });
    return [];
  }
}

export function findTransientSheet(flowType: string, flowName: string) {
  return readTransientSheets().find((e) => e.flow_type === flowType && e.flow_name === flowName);
}

/** Add or replace a flow in the transient sheets list */
export function addTransientSheet(entry: ITransientSheetEntry) {
  const entries = readTransientSheets().filter(
    (e) => !(e.flow_type === entry.flow_type && e.flow_name === entry.flow_name)
  );
  entries.push(entry);
  fs.ensureDirSync(path.dirname(TRANSIENT_SHEETS_LIST_PATH));
  fs.writeJsonSync(TRANSIENT_SHEETS_LIST_PATH, entries, { spaces: 2 });
}

/** `_source` and transient tag added to the end of a flow */
export function transientTag(_source: FlowTypes.FlowTypeBase["_source"]) {
  return { _source, transient: "true" };
}

/** Add `_source` and the transient tag to a flow json and its contents entry in app_data */
export function tagAppDataFlow(
  flowType: string,
  flowName: string,
  _source: FlowTypes.FlowTypeBase["_source"]
) {
  const flowPath = getAppDataFlowPath(flowType, flowName);
  const flow = readAppDataFlow(flowType, flowName);
  if (!flow) {
    logWarning({ msg1: `Flow not in app assets, run an import or sync first`, msg2: flowPath });
    return;
  }
  const {
    _source: _,
    transient: __,
    ...data
  } = flow as FlowTypes.FlowTypeWithData & { transient?: string };
  fs.writeJsonSync(flowPath, { ...data, ...transientTag(_source) }, { spaces: 2 });

  const contentsPath = path.resolve(APP_DATA_PATH, "sheets", "contents.json");
  if (fs.existsSync(contentsPath)) {
    const contents = fs.readJsonSync(contentsPath);
    const entry = contents[flowType]?.[flowName];
    if (entry) {
      contents[flowType][flowName] = { ...entry, ...transientTag(_source) };
      fs.writeJsonSync(contentsPath, contents, { spaces: 2 });
    }
  }
}

export function getAppDataFlowPath(flowType: string, flowName: string) {
  return path.resolve(APP_DATA_PATH, "sheets", flowType, `${flowName}.json`);
}

export function readAppDataFlow(flowType: string, flowName: string) {
  const flowPath = getAppDataFlowPath(flowType, flowName);
  if (!fs.existsSync(flowPath)) return undefined;
  try {
    return fs.readJsonSync(flowPath) as FlowTypes.FlowTypeWithData;
  } catch {
    return undefined;
  }
}
