import fs from "fs-extra";
import path from "path";
import { SCRIPTS_WORKSPACE_PATH } from "../../../../paths";
import { getFileMD5Checksum, logOutput, recursiveFindByExtension } from "../../../../utils";
import { readExternalSourcePath } from "../deploymentConfig";
import { getTranslatedFolder } from "../translations/po";
import { APP_DATA_PATH, getExternalFlowsFolder } from "../utils";
import { IFlowsByType, processFlows, toRelativeSourcePath } from "./processFlows";

/**
 * Checksums of the external flow jsons when they were last all processed or synced, used by
 * `syncFlowFiles` to only process changed files
 */
const FLOW_FILES_MANIFEST_PATH = path.resolve(
  SCRIPTS_WORKSPACE_PATH,
  "cache",
  "beta_flow_files.json"
);

/**
 * Process flow jsons in the previously imported external deployment `app_data/sheets` folder
 * into the app assets app_data folder. Only files that changed since they were last processed
 * are processed (see `FLOW_FILES_MANIFEST_PATH`), unless any file was removed, no previous
 * checksums exist, or `refreshAll` is set, when all flows are processed (replacing previously
 * processed flows). Nothing is downloaded
 * @returns number of flow files, changed and removed files, and flows processed
 */
export function syncFlowFiles(options: { refreshAll?: boolean; verbose?: boolean } = {}) {
  const { refreshAll = false, verbose = false } = options;
  const externalSourcePath = readExternalSourcePath();
  const sourceFlowsFolder = getExternalFlowsFolder(externalSourcePath);
  // Read before processing, so files changed while processing are picked up by the next sync
  const { checksums, changed, removed, processAll } = getFlowFileChanges(sourceFlowsFolder);
  const files = Object.keys(checksums).length;

  if (!refreshAll && !processAll && changed.length === 0) {
    logOutput({ msg1: `No changed flow files (${files})`, msg2: sourceFlowsFolder });
    return { files, changed: 0, removed: 0, flows: 0 };
  }

  const flowsByType = processFlows({
    sourceFlowsFolder,
    targetAppDataFolder: APP_DATA_PATH,
    // All files when undefined
    filePaths:
      refreshAll || processAll
        ? undefined
        : changed.map((file) => path.resolve(sourceFlowsFolder, file)),
    translationsFolder: getTranslatedFolder(externalSourcePath),
    verbose,
  });
  writeFlowFilesManifest(sourceFlowsFolder, checksums);
  const flows = countFlows(flowsByType);
  logOutput({
    msg1: `Synced flow files: ${changed.length} changed, ${removed.length} removed, ${flows} flows processed`,
    msg2: sourceFlowsFolder,
  });
  return { files, changed: changed.length, removed: removed.length, flows };
}

/**
 * Compare the current flow file checksums with those recorded when flows were last processed
 * @returns current checksums, changed (or added) and removed files, and whether all flows must
 * be processed, as there are no previous checksums or a partial update cannot remove flows
 */
function getFlowFileChanges(sourceFlowsFolder: string) {
  const checksums = readFlowFileChecksums(sourceFlowsFolder);
  const previous = readFlowFilesManifest(sourceFlowsFolder);
  const changed = Object.keys(checksums).filter((file) => previous?.[file] !== checksums[file]);
  const removed = previous ? Object.keys(previous).filter((file) => !(file in checksums)) : [];
  const processAll = !previous || removed.length > 0;
  return { checksums, changed, removed, processAll };
}

function countFlows(flowsByType: IFlowsByType) {
  return Object.values(flowsByType).reduce((total, list) => total + list.length, 0);
}

/** md5 checksum of each flow json in a folder, by path relative to the folder */
function readFlowFileChecksums(sourceFlowsFolder: string) {
  const checksums: { [file: string]: string } = {};
  if (!fs.existsSync(sourceFlowsFolder)) return checksums;
  for (const filePath of recursiveFindByExtension(sourceFlowsFolder, "json")) {
    checksums[toRelativeSourcePath(sourceFlowsFolder, filePath)] = getFileMD5Checksum(filePath);
  }
  return checksums;
}

/** Checksums recorded when flows were last processed, if from the same folder */
function readFlowFilesManifest(sourceFlowsFolder: string) {
  try {
    const manifest = fs.readJsonSync(FLOW_FILES_MANIFEST_PATH);
    if (manifest?.sourceFlowsFolder !== sourceFlowsFolder) return undefined;
    return manifest.files as { [file: string]: string };
  } catch {
    return undefined;
  }
}

function writeFlowFilesManifest(sourceFlowsFolder: string, files: { [file: string]: string }) {
  fs.outputJsonSync(FLOW_FILES_MANIFEST_PATH, { sourceFlowsFolder, files }, { spaces: 2 });
}
