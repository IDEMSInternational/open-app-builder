import { generateFolderFlatMap, Logger, logOutput } from "../../utils";
import { WorkflowRunner } from "../../commands/workflow/run";
import path from "path";
import { existsSync } from "fs-extra";

/**
 * Generate asset pack
 */
const generate = async (options: { folderPath: string }) => {
  // Convert relative path to absolute path
  const absolutePath = path.resolve(
    WorkflowRunner.config.app_data.output_path,
    "assets",
    options.folderPath
  );

  logOutput({
    msg1: "Asset pack generation",
    msg2: `Folder path: ${absolutePath}`,
  });

  console.log("Asset pack generation");
  console.log(`Folder path: ${absolutePath}`);

  if (!existsSync(absolutePath)) {
    Logger.error({ msg1: `Folder path does not exist: ${absolutePath}` });
    return Promise.reject(new Error(`Folder path does not exist: ${absolutePath}`));
  }

  const assetPack = generateFolderFlatMap(absolutePath);
  console.log(assetPack);
  // TODO: Implement asset pack generation logic
  return Promise.resolve();
};

export default {
  generate,
};
