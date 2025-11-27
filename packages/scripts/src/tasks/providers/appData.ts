import { writeFileSync } from "fs-extra";
import path from "path";
import packageJSON from "../../../../../package.json";
import { WorkflowRunner } from "../../commands/workflow/run";
import { SRC_ASSETS_PATH } from "../../paths";
import { IContentsEntry, replicateDir } from "../../utils";
import { IDeploymentConfigJson, IDeploymentRuntimeConfig } from "data-models";
import {
  AssetsPostProcessor,
  AppDataOptimiser,
  ReportGenerator,
  SheetsPostProcessor,
} from "../../lib/app-data";

/** Prepare sourcely cached assets for population to app */
const postProcessAssets = async (options: {
  sourceAssetsFolders: string[];
  folderMetadata?: Map<string, { remote?: boolean; folderName?: string }>;
}) => {
  const { sourceAssetsFolders, folderMetadata } = options;
  return new AssetsPostProcessor({ sourceAssetsFolders, folderMetadata }).run();
};

/** Prepare sourcely cached seets for population to app */
const postProcessSheets = async (options: {
  sourceSheetsFolder: string;
  sourceTranslationsFolder: string;
}) => {
  const { sourceSheetsFolder, sourceTranslationsFolder } = options;
  return new SheetsPostProcessor({ sourceSheetsFolder, sourceTranslationsFolder }).run();
};

const generateReports = async () => {
  const config = WorkflowRunner.config;
  return new ReportGenerator(config).process();
};

/**
 * Copy data from source deployment folder to running app assets folder
 */
const copyDeploymentDataToApp = async () => {
  const { app_data } = WorkflowRunner.config;

  // copy filtered subset of app_data
  const copiedFolders = ["assets", "sheets", "translations"];
  const filter_fn = (entry: IContentsEntry) => {
    const [baseDir] = entry.relativePath.split("/");
    return copiedFolders.includes(baseDir);
  };
  // copy folders
  const sourceFolder = app_data.output_path;
  const targetFolder = path.resolve(SRC_ASSETS_PATH, "app_data");
  replicateDir(sourceFolder, targetFolder, { filter_fn });

  // HACK - Angular webpack won't always live-reload when changes only made to asset files
  // so write an arbitrary variable that can be imported into the app and will trigger reload
  // https://github.com/angular/angular-cli/issues/22751
  // https://github.com/webpack/webpack-dev-server/issues/3794
  writeFileSync(
    path.resolve(targetFolder, "index.ts"),
    `export const DEV_COMPILE_TIME = ${new Date().getTime()}`
  );

  // write runtime deployment config
  const configTarget = path.resolve(targetFolder, "deployment.json");
  const runtimeConfig = generateRuntimeConfig(WorkflowRunner.config);
  writeFileSync(configTarget, JSON.stringify(runtimeConfig, null, 2));
};
const optimiseBuild = async () => new AppDataOptimiser(WorkflowRunner.config).run();

function generateRuntimeConfig(deploymentConfig: IDeploymentConfigJson): IDeploymentRuntimeConfig {
  const {
    analytics,
    api,
    app_config,
    auth,
    campaigns,
    error_logging,
    firebase,
    git,
    name,
    remote_assets,
    shared_data,
    supabase,
    web,
    useReactiveTemplates,
  } = deploymentConfig;

  return {
    _app_builder_version: packageJSON.version,
    _content_version: git.content_tag_latest || "",
    analytics,
    api,
    app_config,
    auth,
    campaigns,
    error_logging,
    firebase,
    name,
    remote_assets,
    shared_data,
    supabase,
    web,
    useReactiveTemplates,
  };
}

export default {
  generateReports,
  postProcessAssets,
  postProcessSheets,
  copyDeploymentDataToApp,
  optimiseBuild,
};
