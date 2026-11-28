import { FlowTypes } from "data-models";
import fs from "fs-extra";
import path from "path";
import { logWarning, recursiveFindByExtension } from "../../../../utils";
import { readExternalSourcePath } from "../deploymentConfig";
import {
  APP_DATA_PATH,
  getExternalFlowsFolder,
  isFixedFlow,
  isValidFlowName,
  isWithinFolder,
  TRANSIENT_FLOW_TYPES,
} from "../utils";

/**
 * Find the json a flow was imported from, using the `_source.path` of its copy in app_data.
 * If that is missing or does not contain the flow (e.g. the external deployment has moved),
 * search the external deployment sheets folder instead (see `findSourceFlow`)
 */
export function findFlowBySourcePath(flowName: string, flowType?: string) {
  if (!isValidFlowName(flowName)) {
    throw new Error(`Invalid flow name: ${flowName}`);
  }
  const sheetsFolder = getExternalFlowsFolder(readExternalSourcePath());
  for (const type of flowType ? [flowType] : TRANSIENT_FLOW_TYPES) {
    const sourcePath = readAppDataFlow(type, flowName)?._source?.path;
    if (!sourcePath) continue;
    // Relative to the sheets folder (older imports wrote absolute paths, which resolve as-is)
    const filePath = path.resolve(sheetsFolder, sourcePath);
    if (!path.isAbsolute(sourcePath) && !isWithinFolder(filePath, sheetsFolder)) continue;
    if (path.extname(filePath) !== ".json" || !fs.existsSync(filePath)) continue;
    let flow: FlowTypes.FlowTypeWithData;
    try {
      flow = fs.readJsonSync(filePath);
    } catch {
      continue;
    }
    if (flow?.flow_name !== flowName || flow.flow_type !== type) continue;
    // Same rule as findSourceFlow: only synced files link to a sheet, others may be copies
    if (!isFixedFlow(filePath, sheetsFolder)) delete flow._source;
    return { filePath, flow };
  }
  return findSourceFlow(flowName, flowType);
}

/** Find a flow json by name anywhere within the external deployment sheets folder */
export function findSourceFlow(flowName: string, flowType?: string) {
  if (!isValidFlowName(flowName)) {
    throw new Error(`Invalid flow name: ${flowName}`);
  }
  const sheetsFolder = getExternalFlowsFolder(readExternalSourcePath());
  const matches: { filePath: string; flow: FlowTypes.FlowTypeWithData }[] = [];
  for (const filePath of recursiveFindByExtension(sheetsFolder, "json")) {
    if (path.basename(filePath) !== `${flowName}.json`) continue;
    let flow: FlowTypes.FlowTypeWithData;
    try {
      flow = fs.readJsonSync(filePath);
    } catch {
      continue;
    }
    if (flow?.flow_name !== flowName) continue;
    if (flowType && flow.flow_type !== flowType) continue;
    // Same rule as processFlows: only synced files link to a sheet, others may be copies
    if (!isFixedFlow(filePath, sheetsFolder)) delete flow._source;
    matches.push({ filePath, flow });
  }
  if (matches.length === 0) {
    throw new Error(`Flow not found: ${flowName}${flowType ? ` (${flowType})` : ""}`);
  }
  // Prefer a copy linked to a sheet, e.g. the google_drive copy over a leftover local one
  const match = matches.find(({ flow }) => flow._source?.url) || matches[0];
  if (matches.length > 1) {
    logWarning({
      msg1: `Multiple files for flow: ${flowName}`,
      msg2: `Using ${match.filePath}`,
    });
  }
  return match;
}

/** Path of a processed flow json in the app assets app_data folder */
export function getAppDataFlowPath(flowType: string, flowName: string) {
  return path.resolve(APP_DATA_PATH, "sheets", flowType, `${flowName}.json`);
}

/** Processed flow json in the app assets app_data folder, if it exists */
export function readAppDataFlow(flowType: string, flowName: string) {
  const flowPath = getAppDataFlowPath(flowType, flowName);
  if (!fs.existsSync(flowPath)) return undefined;
  try {
    return fs.readJsonSync(flowPath) as FlowTypes.FlowTypeWithData;
  } catch {
    return undefined;
  }
}
