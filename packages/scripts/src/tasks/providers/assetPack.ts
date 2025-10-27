import { generateFolderFlatMap, Logger, logOutput } from "../../utils";
import { WorkflowRunner } from "../../commands/workflow/run";
import path from "path";
import { existsSync, ensureDirSync } from "fs-extra";

/**
 * Generate asset pack
 */
const generate = async (options: { folderPath: string; assetPackName: string }) => {
  // Source folder path
  const sourcePath = path.resolve(
    WorkflowRunner.config.app_data.output_path,
    "assets",
    options.folderPath
  );

  // Output folder path for the asset pack
  const outputPath = path.resolve(
    WorkflowRunner.config.app_data.output_path,
    "asset_packs",
    options.assetPackName
  );

  logOutput({
    msg1: "Asset pack generation",
    msg2: `Source: ${sourcePath}\nOutput: ${outputPath}`,
  });

  console.log("Asset pack generation");
  console.log(`Source path: ${sourcePath}`);
  console.log(`Asset pack name: ${options.assetPackName}`);
  console.log(`Output path: ${outputPath}`);

  // Check if source folder exists
  if (!existsSync(sourcePath)) {
    Logger.error({ msg1: `Source folder does not exist: ${sourcePath}` });
    return Promise.reject(new Error(`Source folder does not exist: ${sourcePath}`));
  }

  // Ensure output directory exists (creates if it doesn't exist)
  ensureDirSync(outputPath);
  console.log(`Created/ensured output directory: ${outputPath}`);

  const assetPack = generateFolderFlatMap(sourcePath);
  console.log(assetPack);
  // TODO: Implement asset pack generation logic
  return Promise.resolve();
};

export default {
  generate,
};
