import fs from "fs-extra";
import path from "path";
import { FlowTypes } from "data-models";
import { logOutput, logWarning, recursiveFindByExtension } from "../../../utils";
import { combineGlobals, parseDataList, parseTemplate } from "./parsers";

/** Flow types copied from the source sheets folder. All other flow types are skipped */
export const IMPORTED_FLOW_TYPES = ["data_list", "global", "template"] as const;
type IImportedFlowType = (typeof IMPORTED_FLOW_TYPES)[number];
type IFlowsByType = { [flowType in IImportedFlowType]: FlowTypes.FlowTypeWithData[] };
type IContentsJson = { [flowType: string]: { [flow_name: string]: FlowTypes.FlowTypeBase } };

/** Parsers applied to each flow before it is written. Globals are handled separately */
const FLOW_PARSERS: {
  [flowType in Exclude<IImportedFlowType, "global">]: (
    flow: FlowTypes.FlowTypeWithData
  ) => FlowTypes.FlowTypeWithData;
} = {
  data_list: parseDataList,
  template: parseTemplate,
};

interface IProcessSheetsOptions {
  /** Folder containing source flow jsons (including subfolders) */
  sourceSheetsFolder: string;
  /** Target app_data folder, where flows are written to `sheets` and listed in `contents.json` */
  targetAppDataFolder: string;
  /**
   * Specific source json files to process. If omitted, all files in the source folder are
   * processed and any previously processed flows are replaced
   */
  filePaths?: string[];
  verbose?: boolean;
}

/**
 * Process source flow jsons into the target app_data folder, grouped into data_list, global
 * and template folders based on their flow_type, and update contents.json.
 *
 * When `filePaths` are provided only those flows are written and merged into the existing
 * contents.json. Globals are combined into a single output, so if any global is updated all
 * globals are re-read from the source folder
 */
export function processSheets(options: IProcessSheetsOptions): IFlowsByType {
  const { sourceSheetsFolder, targetAppDataFolder, filePaths, verbose = false } = options;
  if (!fs.existsSync(sourceSheetsFolder)) {
    throw new Error(`Sheets folder not found in source path: ${sourceSheetsFolder}`);
  }
  const isPartialUpdate = filePaths !== undefined;
  const targetSheetsFolder = path.resolve(targetAppDataFolder, "sheets");

  const flowsByType = readFlowFiles(
    filePaths ?? recursiveFindByExtension(sourceSheetsFolder, "json"),
    verbose
  );

  if (isPartialUpdate) {
    removeRenamedFlowTypes(flowsByType, targetAppDataFolder);
  } else {
    // Replace any previously processed flows
    for (const flowType of IMPORTED_FLOW_TYPES) {
      fs.emptyDirSync(path.resolve(targetSheetsFolder, flowType));
    }
  }

  for (const flowType of Object.keys(FLOW_PARSERS) as (keyof typeof FLOW_PARSERS)[]) {
    const parser = FLOW_PARSERS[flowType];
    const targetFolder = path.resolve(targetSheetsFolder, flowType);
    fs.ensureDirSync(targetFolder);
    for (const flow of flowsByType[flowType]) {
      const parsed = parser(flow);
      fs.writeJsonSync(path.resolve(targetFolder, `${parsed.flow_name}.json`), parsed, {
        spaces: 2,
      });
    }
  }

  if (!isPartialUpdate || flowsByType.global.length > 0) {
    const allGlobals = isPartialUpdate
      ? readFlowFiles(recursiveFindByExtension(sourceSheetsFolder, "json")).global
      : flowsByType.global;
    combineGlobals(allGlobals, path.resolve(targetSheetsFolder, "global"), verbose);
  }

  writeContentsJson(flowsByType, targetAppDataFolder, isPartialUpdate);

  logOutput({
    msg1: isPartialUpdate ? "Updated sheets" : "Imported sheets",
    msg2: IMPORTED_FLOW_TYPES.map((type) => `${type}: ${flowsByType[type].length}`).join(", "),
  });

  return flowsByType;
}

/**
 * Write contents.json listing flows by type and name, excluding rows.
 * If merging, entries are added to the existing contents.json instead of replacing it
 */
function writeContentsJson(flowsByType: IFlowsByType, targetAppDataFolder: string, merge: boolean) {
  const contents: IContentsJson = merge ? readContentsJson(targetAppDataFolder) : {};
  for (const flowType of IMPORTED_FLOW_TYPES) {
    contents[flowType] ??= {};
    for (const flow of flowsByType[flowType]) {
      const { rows, status, ...keptFields } = flow;
      contents[flowType][flow.flow_name] = keptFields as FlowTypes.FlowTypeBase;
    }
  }
  fs.writeJsonSync(path.resolve(targetAppDataFolder, "contents.json"), contents, { spaces: 2 });
}

function readContentsJson(targetAppDataFolder: string): IContentsJson {
  const contentsPath = path.resolve(targetAppDataFolder, "contents.json");
  return fs.existsSync(contentsPath) ? fs.readJsonSync(contentsPath) : {};
}

/**
 * When partially updating, remove any existing output and contents entry for a flow that
 * now has a different flow_type, so it is not listed twice
 */
function removeRenamedFlowTypes(flowsByType: IFlowsByType, targetAppDataFolder: string) {
  const contents = readContentsJson(targetAppDataFolder);
  let changed = false;
  for (const flowType of IMPORTED_FLOW_TYPES) {
    for (const { flow_name } of flowsByType[flowType]) {
      for (const otherType of IMPORTED_FLOW_TYPES) {
        if (otherType === flowType || !contents[otherType]?.[flow_name]) continue;
        delete contents[otherType][flow_name];
        fs.removeSync(path.resolve(targetAppDataFolder, "sheets", otherType, `${flow_name}.json`));
        changed = true;
      }
    }
  }
  if (changed) {
    fs.writeJsonSync(path.resolve(targetAppDataFolder, "contents.json"), contents, { spaces: 2 });
  }
}

/** Load json flows from a list of files, grouped by supported flow_type */
function readFlowFiles(filePaths: string[], verbose = false) {
  const flowsByType: IFlowsByType = {
    data_list: [],
    global: [],
    template: [],
  };
  const seenFlowPaths: { [key: string]: string } = {};

  for (const filePath of filePaths) {
    let flow: FlowTypes.FlowTypeWithData;
    try {
      flow = fs.readJsonSync(filePath);
    } catch (error) {
      logWarning({ msg1: `Failed to read json: ${filePath}`, msg2: (error as Error).message });
      continue;
    }
    const { flow_type, flow_name } = flow || ({} as FlowTypes.FlowTypeWithData);
    if (!isImportedFlowType(flow_type)) {
      if (verbose) {
        logOutput({ msg1: `Skipping flow_type: ${flow_type}`, msg2: filePath });
      }
      continue;
    }
    if (!flow_name) {
      logWarning({ msg1: "Skipping flow with no flow_name", msg2: filePath });
      continue;
    }
    // Flows are written flat by name, so warn if the same name appears in multiple subfolders
    const key = `${flow_type}/${flow_name}`;
    if (seenFlowPaths[key]) {
      logWarning({
        msg1: `Duplicate ${flow_type} flow: ${flow_name}`,
        msg2: `${seenFlowPaths[key]} will be overwritten by ${filePath}`,
      });
      flowsByType[flow_type] = flowsByType[flow_type].filter((f) => f.flow_name !== flow_name);
    }
    seenFlowPaths[key] = filePath;
    flowsByType[flow_type].push(flow);
  }
  return flowsByType;
}

function isImportedFlowType(flowType: string): flowType is IImportedFlowType {
  return IMPORTED_FLOW_TYPES.includes(flowType as IImportedFlowType);
}
