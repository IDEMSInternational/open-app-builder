import { writeFileSync } from "fs-extra";
import path from "path";
import { parseCommand } from "../../commands";
import { WorkflowRunner } from "../../commands/workflow/run";
import { SRC_ASSETS_PATH } from "../../paths";
import { IContentsEntry, replicateDir } from "../../utils";

/** Prepare sourcely cached assets for population to app */
const postProcessAssets = async (options: { sourceAssetsFolders: string[] }) => {
  const { sourceAssetsFolders } = options;
  let args = `--source-assets-folders ${sourceAssetsFolders.join(",")}`;
  let cmd = `app-data post-process assets ${args}`;

  await parseCommand(`${cmd}`);
};

/** Prepare sourcely cached seets for population to app */
const postProcessSheets = async (options: {
  sourceSheetsFolder: string;
  sourceTranslationsFolder: string;
}) => {
  const { sourceSheetsFolder, sourceTranslationsFolder } = options;
  let args = `--source-sheets-folder ${sourceSheetsFolder} --source-translations-folder ${sourceTranslationsFolder}`;
  let cmd = `app-data post-process sheets ${args}`;
  await parseCommand(`${cmd}`);
};

/**
 * Copy data from source deployment folder to running app assets folder
 */
const copyDeploymentDataToApp = () => {
  const { app_data } = WorkflowRunner.config;
  const copiedFolders = ["assets", "sheets", "translations"];
  // omit index files
  const filter_fn = (entry: IContentsEntry) => {
    const [baseDir] = entry.relativePath.split("/");
    return copiedFolders.includes(baseDir);
  };
  const source = app_data.output_path;
  const target = path.resolve(SRC_ASSETS_PATH, "app_data");
  replicateDir(source, target, { filter_fn });

  // HACK - Angular webpack won't always live-reload when changes only made to asset files
  // so write an arbitrary variable that can be imported into the app and will trigger reload
  // https://github.com/angular/angular-cli/issues/22751
  // https://github.com/webpack/webpack-dev-server/issues/3794
  writeFileSync(
    path.resolve(target, "index.ts"),
    `export const DEV_COMPILE_TIME = ${new Date().getTime()}`
  );
};

export default { postProcessAssets, postProcessSheets, copyDeploymentDataToApp };
