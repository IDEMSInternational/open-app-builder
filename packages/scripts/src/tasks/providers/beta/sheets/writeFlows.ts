import { FlowTypes } from "data-models";
import fs from "fs-extra";
import path from "path";
import {
  cleanupEmptyFolders,
  logOutput,
  logWarning,
  recursiveFindByExtension,
} from "../../../../utils";
import { isValidFlowName, isWithinFolder } from "../utils";

export interface IWriteFlowsOptions {
  /**
   * Folder the flows are written within. Each flow replaces the json of the same name anywhere
   * in it, and new flows are written alongside other flows from the same workbook, or to its root
   */
  targetFolder: string;
  /** Subfolders of the target folder whose jsons are not replaced (or deleted) */
  excludeFolders?: string[];
  /** Write each flow's `_source` (drive folder, workbook path and sheet url) */
  includeSource: boolean;
  /** Delete jsons within the target folder that do not match a flow */
  deleteRemoved?: boolean;
  /**
   * Folder of all flow jsons, checked for files of the same name outside the target folder, as
   * both would be processed. Defaults to the target folder
   */
  flowsFolder?: string;
}

/**
 * Write flows (e.g. downloaded from google drive sheets) to an external deployment folder.
 * Files with unchanged content are not rewritten
 * @returns paths of files created or updated, and deleted
 */
export function writeExternalFlows(
  flows: FlowTypes.FlowTypeWithData[],
  options: IWriteFlowsOptions
) {
  const { targetFolder, includeSource, deleteRemoved = false } = options;
  const excludeFolders = (options.excludeFolders || []).map((f) => path.resolve(targetFolder, f));
  const isExcluded = (filePath: string) => excludeFolders.some((f) => isWithinFolder(filePath, f));
  const flowsFolder = options.flowsFolder || targetFolder;
  fs.ensureDirSync(targetFolder);

  const existingPaths = listExistingFilePaths(targetFolder, isExcluded);
  const otherPaths = listOtherFilePaths(flowsFolder, existingPaths);
  // Folder of each workbook's existing flows, so new flows are written alongside them
  const workbookFolders: { [workbook: string]: string } = {};
  for (const flow of flows) {
    const existingPath = existingPaths[`${flow.flow_name}.json`];
    if (existingPath) workbookFolders[workbookKey(flow)] ??= path.dirname(existingPath);
  }

  const updatedPaths: string[] = [];
  for (const flow of flows) {
    if (!isValidFlowName(flow.flow_name)) {
      throw new Error(`Invalid flow name: ${flow.flow_name}`);
    }
    const filename = `${flow.flow_name}.json`;
    const targetPath =
      existingPaths[filename] ||
      path.resolve(workbookFolders[workbookKey(flow)] || targetFolder, filename);
    if (otherPaths[filename]) {
      logWarning({
        msg1: `Flow also exists in another file: ${flow.flow_name}`,
        msg2: `${targetPath} and ${otherPaths[filename]} will both be processed`,
      });
    }
    const { _source, ...data } = flow;
    const output = includeSource ? flow : data;
    // Match fs.writeJsonSync output so unchanged files can be skipped
    const json = JSON.stringify(output, null, 2) + "\n";
    if (fs.existsSync(targetPath) && fs.readFileSync(targetPath, "utf8") === json) continue;
    fs.outputFileSync(targetPath, json);
    updatedPaths.push(targetPath);
  }

  const deletedPaths = deleteRemoved ? deleteRemovedFlows(flows, targetFolder, isExcluded) : [];
  return { updatedPaths, deletedPaths };
}

/** Flows from the same workbook share its drive folder and path */
function workbookKey({ _source }: FlowTypes.FlowTypeWithData) {
  return `${_source?.name}/${_source?.path}`;
}

/**
 * Delete json files within the target folder (including subfolders) that do not match a flow,
 * and remove any folders left empty
 * @returns paths of files that were deleted
 */
function deleteRemovedFlows(
  flows: FlowTypes.FlowTypeWithData[],
  targetFolder: string,
  isExcluded: (filePath: string) => boolean
) {
  const flowFilenames = new Set(flows.map(({ flow_name }) => `${flow_name}.json`));
  const deletedPaths: string[] = [];
  for (const filePath of recursiveFindByExtension(targetFolder, "json")) {
    if (isExcluded(filePath) || flowFilenames.has(path.basename(filePath))) continue;
    fs.removeSync(filePath);
    deletedPaths.push(filePath);
  }
  cleanupEmptyFolders(targetFolder);
  // Keep the root folder (removed if empty) as it is required when processing sheets
  fs.ensureDirSync(targetFolder);
  return deletedPaths;
}

/** List existing json files within a folder (including subfolders) by filename */
function listExistingFilePaths(folder: string, excludeFn?: (filePath: string) => boolean) {
  const existingPaths: { [filename: string]: string } = {};
  for (const filePath of recursiveFindByExtension(folder, "json")) {
    if (excludeFn?.(filePath)) continue;
    const filename = path.basename(filePath);
    if (existingPaths[filename]) {
      logWarning({
        msg1: `Multiple existing files named: ${filename}`,
        msg2: `${filePath} will be ignored, using ${existingPaths[filename]}`,
      });
      continue;
    }
    existingPaths[filename] = filePath;
  }
  return existingPaths;
}

/** Json files in the flows folder, by filename, other than the given files */
function listOtherFilePaths(flowsFolder: string, existingPaths: { [filename: string]: string }) {
  const otherPaths: { [filename: string]: string } = {};
  if (!fs.existsSync(flowsFolder)) return otherPaths;
  const existing = new Set(Object.values(existingPaths).map((p) => path.resolve(p)));
  for (const filePath of recursiveFindByExtension(flowsFolder, "json")) {
    if (existing.has(path.resolve(filePath))) continue;
    otherPaths[path.basename(filePath)] ??= filePath;
  }
  return otherPaths;
}
