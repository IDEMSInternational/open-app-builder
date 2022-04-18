import { spawnSync } from "child_process";

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
};

export default { copy };
