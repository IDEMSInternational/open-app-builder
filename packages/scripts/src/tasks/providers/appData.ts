import { spawnSync } from "child_process";
import path from "path";
import { WorkflowRunner } from "../../commands/workflow/run";
import { SRC_ASSETS_PATH } from "../../paths";
import { IContentsEntry, replicateDir } from "../../utils";

// const qualityCheckAssets = () => {};

/**
 *
 */
const copy = (options: {
  localSheetsFolder?: string;
  localAssetsFolder?: string;
  localTranslationsFolder?: string;
  appSheetsFolder?: string;
  appAssetsFolder?: string;
  appTranslationsFolder?: string;
}) => {
  const scriptsExec = `yarn workspace scripts start`;

  const {
    localAssetsFolder,
    localSheetsFolder,
    localTranslationsFolder,
    appAssetsFolder,
    appSheetsFolder,
    appTranslationsFolder,
  } = options;

  let args = ``;
  if (localAssetsFolder)
    args += ` --local-assets-folder ${localAssetsFolder} --app-assets-folder ${appAssetsFolder}`;
  if (!localAssetsFolder) args += ` --skip-assets `;
  if (localSheetsFolder)
    args += ` --local-sheets-folder ${localSheetsFolder} --app-sheets-folder ${appSheetsFolder}`;
  if (!localSheetsFolder) args += ` --skip-sheets `;
  if (localTranslationsFolder)
    args += ` --local-translations-folder ${localTranslationsFolder} --app-translations-folder ${appTranslationsFolder}`;

  let copyCmd = `app-data copy ${args}`;

  spawnSync(`${scriptsExec} ${copyCmd}`, { stdio: "inherit", shell: true });
  copyDeploymentDataToApp();
};

/**
 * HACK - make additional copy direct to app assets to force angular to detect changes if running
 * Note - ideally this will be removed when transitioning away from app-data (to standalone repos)
 * and direct copy can be included instead
 */
const copyDeploymentDataToApp = () => {
  const { _workspace_path } = WorkflowRunner.config;
  const copiedFolders = ["assets", "sheets", "translations"];
  // omit index files
  const filter_fn = (entry: IContentsEntry) => {
    const [baseDir] = entry.relativePath.split("/");
    return copiedFolders.includes(baseDir);
  };
  const source = path.resolve(_workspace_path, "app_data");
  const target = path.resolve(SRC_ASSETS_PATH, "app_data");

  replicateDir(source, target, filter_fn);
};

export default { copy, copyDeploymentDataToApp };
