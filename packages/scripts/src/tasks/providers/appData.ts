import chalk from "chalk";
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
  IDownloadedAssetSource,
} from "../../lib/app-data";

/** Prepare sourcely cached assets for population to app */
const postProcessAssets = async (options: { sources: IDownloadedAssetSource[] }) => {
  const { sources } = options;
  return new AssetsPostProcessor({ sources }).run();
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
  // files generated below, not copied from source
  const configFile = "deployment.json";
  const devSyncFile = "dev_sync.json";

  // copy folders
  const sourceFolder = app_data.output_path;
  const targetFolder = path.resolve(SRC_ASSETS_PATH, "app_data");
  replicateDir(sourceFolder, targetFolder, {
    filter_fn,
    // Use current time as modified time for copied files, as the dev server only re-reads
    // assets with a changed modified time (which may not be the case for src files)
    preserveTimestamps: false,
    // Overwrite generated files in place, so they are not briefly missing from a running app
    keepTargetFiles: [configFile, devSyncFile],
  });

  // write runtime deployment config
  const configTarget = path.resolve(targetFolder, configFile);
  const runtimeConfig = generateRuntimeConfig(WorkflowRunner.config);
  writeFileSync(configTarget, JSON.stringify(runtimeConfig, null, 2));

  // Written last: polled by the app in development to reload once all changes are served,
  // as the dev server does not reload the browser for asset-only changes (see `dev-sync.utils.ts`)
  const devSyncTarget = path.resolve(targetFolder, devSyncFile);
  writeFileSync(devSyncTarget, JSON.stringify({ timestamp: new Date().getTime() }));

  console.log(
    chalk.green("App data copied to src/assets. Any running dev server will reload shortly")
  );
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
    remote_functions,
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
    remote_functions,
    shared_data,
    supabase,
    web,
    useReactiveTemplates,
  };
}

/**
 * Sync remote assets to external provider (e.g. Supabase/Firebase)
 * Currently a placeholder for future implementation
 */
const syncRemoteAssets = async () => {
  // TODO: Implement actual sync logic, including:
  // - Upload asset packs to remote provider
  // - Delete old asset packs from remote provider (TBC how to handle, legacy app users may still require previous versions)
  console.log("[Not implemented] Syncing remote assets...");
};

export default {
  generateReports,
  postProcessAssets,
  postProcessSheets,
  copyDeploymentDataToApp,
  optimiseBuild,
  syncRemoteAssets,
};
