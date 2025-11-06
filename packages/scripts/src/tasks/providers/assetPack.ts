import { logOutput, replicateDir } from "../../utils";
import { WorkflowRunner } from "../../commands/workflow/run";
import path from "path";
import { ensureDirSync } from "fs-extra";
import type { IGdriveEntry } from "@idemsInternational/gdrive-tools";
import gdrive from "./gdrive";

/**
 * Download and copy asset pack from remote Google Drive folder
 * Returns the output path where assets are copied
 */
const generate = async (options: {
  folderId: string;
  assetPackName: string;
  filterFn?: (entry: IGdriveEntry) => boolean;
}) => {
  const { folderId, assetPackName, filterFn } = options;
  const config = WorkflowRunner.config;

  // Download assets from Google Drive (similar to sync_assets workflow)
  const downloadPath = await gdrive.download({
    type: "assets",
    folderId,
    folderName: assetPackName,
    filterFn,
  });

  // Output folder path for the asset pack
  const outputPath = path.resolve(config.app_data.output_path, "remote_assets", assetPackName);

  logOutput({
    msg1: "Asset pack download",
    msg2: `Downloaded from: ${downloadPath}\nOutput: ${outputPath}`,
  });

  // Ensure output directory exists (creates if it doesn't exist)
  ensureDirSync(outputPath);

  // Copy downloaded files to output directory
  replicateDir(downloadPath, outputPath);

  return outputPath;
};

export default {
  generate,
};
