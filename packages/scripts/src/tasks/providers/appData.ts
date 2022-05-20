import { spawnSync } from "child_process";
import path from "path";
import { ROOT_DIR } from "../../paths";
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
  populateSrcAssets({ appSheetsFolder, appAssetsFolder, appTranslationsFolder });
};

/**
 * HACK - make additional copy direct to app assets to force angular to detect changes if running
 * Note - ideally this will be removed when transitioning away from app-data (to standalone repos)
 * and direct copy can be included instead
 */
const populateSrcAssets = (options: {
  appSheetsFolder?: string;
  appAssetsFolder?: string;
  appTranslationsFolder?: string;
}) => {
  const { appSheetsFolder, appAssetsFolder, appTranslationsFolder } = options;
  // omit index files
  const filter_fn = (entry: IContentsEntry) => entry.relativePath !== "index.ts";
  if (appSheetsFolder) {
    const targetFolder = path.resolve(ROOT_DIR, "src", "assets", "app_data", "sheets");
    replicateDir(appSheetsFolder, targetFolder, filter_fn);
  }
  if (appAssetsFolder) {
    const targetFolder = path.resolve(ROOT_DIR, "src", "assets", "app_data", "assets");
    replicateDir(appAssetsFolder, targetFolder, filter_fn);
  }
  if (appTranslationsFolder) {
    const targetFolder = path.resolve(ROOT_DIR, "src", "assets", "app_data", "translations");
    replicateDir(appTranslationsFolder, targetFolder, filter_fn);
  }
};

export default { copy, populateSrcAssets };
