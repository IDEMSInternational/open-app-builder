import { spawnSync } from "child_process";

// const qualityCheckAssets = () => {};

/**
 *
 */
const copy = (options: { localSheetsFolder?: string; localAssetsFolder?: string }) => {
  const scriptsExec = `yarn workspace scripts start`;

  const { localAssetsFolder, localSheetsFolder } = options;

  let args = ``;
  if (localAssetsFolder) args += `--local-assets ${localAssetsFolder} `;
  if (!localAssetsFolder) args += `--skip-assets `;
  if (localSheetsFolder) args += `--local-sheets ${localSheetsFolder} `;
  if (!localSheetsFolder) args += `--skip-sheets `;

  let copyCmd = `app-data copy ${args}`;

  spawnSync(`${scriptsExec} ${copyCmd}`, { stdio: "inherit", shell: true });
};

export default { copy };
