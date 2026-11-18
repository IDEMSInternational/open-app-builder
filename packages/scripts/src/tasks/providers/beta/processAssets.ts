import fs from "fs-extra";
import path from "path";
import { IDeploymentConfigJson } from "../../../commands/deployment/common";
import {
  checkTotalAssetSize,
  filterAppAssets,
  handleAssetOverrides,
} from "../../../lib/app-data/postProcess/asset-processors";
import {
  generateFolderFlatMap,
  logOutput,
  logWarning,
  replicateDir,
  sortJsonKeys,
} from "../../../utils";

/** Files generated in the target assets folder, ignored if present in the source */
const GENERATED_FILES = ["contents.json", "untracked-assets.json"];

interface IProcessAssetsOptions {
  /** Folder containing source assets (including subfolders) */
  sourceAssetsFolder: string;
  /** Target app_data folder, where assets are written to `assets` and listed in `assets/contents.json` */
  targetAppDataFolder: string;
  /** Deployment config used to apply asset, language and theme filters */
  deploymentConfig: IDeploymentConfigJson;
  verbose?: boolean;
}

/**
 * Replicate source assets into the target app_data assets folder, applying deployment filters,
 * and write contents.json listing tracked assets (with theme and language overrides).
 * Any existing target files not present in the filtered source are removed
 */
export function processAssets(options: IProcessAssetsOptions) {
  const { sourceAssetsFolder, targetAppDataFolder, deploymentConfig, verbose = false } = options;
  const targetAssetsFolder = path.resolve(targetAppDataFolder, "assets");
  if (!fs.existsSync(sourceAssetsFolder)) {
    logWarning({ msg1: "Assets folder not found in source path", msg2: sourceAssetsFolder });
    fs.emptyDirSync(targetAssetsFolder);
    fs.writeJsonSync(path.resolve(targetAssetsFolder, "contents.json"), {}, { spaces: 2 });
    return;
  }

  const sourceAssets = generateFolderFlatMap(sourceAssetsFolder, {
    includeLocalPath: true,
    filterFn: (relativePath) => !GENERATED_FILES.includes(relativePath),
  });
  const filteredAssets = filterAppAssets(sourceAssets, deploymentConfig);

  const ops = replicateDir(sourceAssetsFolder, targetAssetsFolder, {
    filter_fn: (entry) => entry.relativePath in filteredAssets,
    cleanEmpty: true,
  });
  if (verbose) {
    for (const { relativePath } of ops.copy) {
      logOutput({ msg1: "Copied asset", msg2: relativePath });
    }
  }

  const entries = handleAssetOverrides(filteredAssets);
  fs.writeFileSync(
    path.resolve(targetAssetsFolder, "contents.json"),
    JSON.stringify(sortJsonKeys(entries.tracked), null, 2)
  );
  writeUntrackedAssetsFile(targetAssetsFolder, entries.untracked);
  checkTotalAssetSize(entries);

  logOutput({
    msg1: "Imported assets",
    msg2: `tracked: ${Object.keys(entries.tracked).length}, copied: ${ops.copy.length}, removed: ${ops.delete.length}`,
  });
}

/** Write untracked (override-only) assets file, removing any previous version */
function writeUntrackedAssetsFile(
  targetAssetsFolder: string,
  untracked: ReturnType<typeof handleAssetOverrides>["untracked"]
) {
  const untrackedPath = path.resolve(targetAssetsFolder, "untracked-assets.json");
  fs.removeSync(untrackedPath);
  if (Object.keys(untracked).length > 0) {
    logWarning({
      msg1: "Assets override found without corresponding entry",
      msg2: Object.keys(untracked).join("\n"),
    });
    fs.writeFileSync(untrackedPath, JSON.stringify(sortJsonKeys(untracked), null, 2));
  }
}
