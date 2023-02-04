import { spawnSync } from "child_process";
import path from "path";
import { WorkflowRunner } from "../../commands/workflow/run";
import { SRC_ASSETS_PATH } from "../../paths";
import { IContentsEntry, replicateDir } from "../../utils";

/** Prepare sourcely cached assets for population to app */
const postProcessAssets = (options: { sourceAssetsFolder: string }) => {
  const scriptsExec = `yarn workspace scripts start`;
  const { sourceAssetsFolder } = options;
  let args = `--source-assets-folder ${sourceAssetsFolder}`;
  let cmd = `app-data post-process assets ${args}`;

  spawnSync(`${scriptsExec} ${cmd}`, { stdio: "inherit", shell: true });
};

/** Prepare sourcely cached seets for population to app */
const postProcessSheets = (options: {
  sourceSheetsFolder: string;
  sourceTranslationsFolder: string;
}) => {
  const scriptsExec = `yarn workspace scripts start`;
  const { sourceSheetsFolder, sourceTranslationsFolder } = options;
  let args = `--source-sheets-folder ${sourceSheetsFolder} --source-translations-folder ${sourceTranslationsFolder}`;
  let cmd = `app-data post-process sheets ${args}`;
  spawnSync(`${scriptsExec} ${cmd}`, { stdio: "inherit", shell: true });
};

/**
 * Copy data from source deployment folder to running app assets folder
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

export default { postProcessAssets, postProcessSheets, copyDeploymentDataToApp };
