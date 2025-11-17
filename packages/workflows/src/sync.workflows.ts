import { normalize, resolve } from "path";
import { logWarning, replicateDir } from "shared";
import type { IDeploymentWorkflows, IWorkflowStepContext } from "./workflow.model";
import type { IDeploymentConfigJson } from "data-models";

/** Default workflows made available to all deployments */
const workflows: IDeploymentWorkflows = {
  sync: {
    label: "Sync All Content",
    options: [
      {
        flags: "-cw, --content-watch",
        description: "Listen for realtime updates to content drive",
      },
    ],
    steps: [
      {
        condition: async ({ config }) => config.git?.content_repo !== undefined,
        name: "sync_remote",
        function: async ({ tasks }) => tasks.git().refreshRemoteRepo(),
      },
      {
        name: "sync_assets",
        function: async ({ tasks, workflow }) =>
          tasks.workflow.runWorkflow({ name: "sync_assets", parent: workflow }),
      },
      {
        name: "sync_sheets",
        function: async ({ tasks, workflow }) =>
          tasks.workflow.runWorkflow({ name: "sync_sheets", parent: workflow }),
      },
      {
        name: "copy_to_app",
        function: async ({ tasks }) => tasks.appData.copyDeploymentDataToApp(),
      },
      {
        name: "sync_watch",
        condition: async ({ options }) => options.contentWatch === true,
        function: async ({ tasks, workflow }) =>
          tasks.workflow.runWorkflow({ name: "sync_watch", parent: workflow }),
      },
      {
        name: "report",
        function: async ({ tasks }) => tasks.appData.generateReports(),
      },
    ],
  },
  sync_sheets: {
    label: "Sync Latest Sheets",
    options: [
      {
        flags: "-s, --skip-download",
        description: "Skip download and just process local sheets",
      },
    ],
    steps: [
      {
        name: "sheets_dl",
        function: async ({ tasks, config, options }) => {
          // HACK - ensure drive id provided as array (can be removed once deprecation removed)
          const { sheets_folders } = migrateLegacyGdriveConfig(config.google_drive);

          /** Return output of paths to downloaded sheets */
          let outputs: string[] = [];
          // If skipping download still need to return download folder for next step
          if (options.skipDownload) {
            outputs = sheets_folders.map(({ id, name }) =>
              tasks.gdrive.getOutputFolder("sheets", id, name)
            );
          } else {
            const { sheets_filter_function } = config.google_drive;
            for (const { id: folderId, name: folderName } of sheets_folders) {
              const output = await tasks.gdrive.download({
                type: "sheets",
                folderId,
                folderName,
                filterFn: sheets_filter_function,
              });
              outputs.push(output);
            }
          }
          return outputs;
        },
      },
      {
        name: "sheets_process",
        function: async ({ tasks, workflow, config }) => {
          // Process sheets
          const outputDir = await tasks.template.process({
            inputFolders: workflow.sheets_dl.output,
          });

          // Store copy of intermediate sheet jsons to content repo
          const sheetsIntermediateDir = resolve(outputDir, "../sheet_json");
          const outputIntermediateDir = resolve(
            config._workspace_path,
            "source_data",
            "sheet_json"
          );
          tasks.file.replicate(sheetsIntermediateDir, outputIntermediateDir);

          // Return output dir to continue processing
          return outputDir;
        },
      },
      {
        name: "translations_apply",
        function: async ({ tasks, workflow }) =>
          tasks.translate.apply({ inputFolder: workflow.sheets_process.output }),
      },
      {
        name: "sheets_post_process",
        function: async ({ tasks, workflow }) =>
          tasks.appData.postProcessSheets({
            sourceSheetsFolder: workflow.translations_apply.output.sheets,
            sourceTranslationsFolder: workflow.translations_apply.output.strings,
          }),
      },
    ],
  },
  sync_assets: {
    // label: "Sync Latest Assets",
    options: [
      {
        flags: "-s, --skip-download",
        description: "Skip download and just process local sheets",
      },
    ],
    steps: [
      {
        name: "assets_dl",
        function: async ({ tasks, config, options }) => {
          // HACK - ensure drive id provided as array (can be removed once deprecation removed)
          const { assets_folders } = migrateLegacyGdriveConfig(config.google_drive);
          /** Return output of paths to downloaded assets and folder metadata */
          let outputs: Array<{ path: string; folderConfig: (typeof assets_folders)[0] }> = [];
          // If skipping download still need to return download folder for next step
          if (options.skipDownload) {
            outputs = assets_folders.map((folderConfig) => ({
              path: tasks.gdrive.getOutputFolder("assets", folderConfig.id, folderConfig.name),
              folderConfig,
            }));
          } else {
            const { assets_filter_function } = config.google_drive;
            for (const folderConfig of assets_folders) {
              const output = await tasks.gdrive.download({
                type: "assets",
                folderId: folderConfig.id,
                folderName: folderConfig.name,
                filterFn: assets_filter_function,
              });
              outputs.push({ path: output, folderConfig });
            }
          }
          return outputs;
        },
      },
      {
        name: "assets_post_process",
        function: async ({ tasks, workflow }) => {
          // Build folder metadata map from download results
          const folderMetadata = new Map<string, { remote?: boolean; folderName?: string }>();
          const sourceAssetsFolders: string[] = [];

          for (const { path, folderConfig } of workflow.assets_dl.output) {
            sourceAssetsFolders.push(path);
            if (folderConfig.remote) {
              folderMetadata.set(path, {
                remote: true,
                folderName: folderConfig.name,
              });
            }
          }

          return tasks.appData.postProcessAssets({
            sourceAssetsFolders,
            folderMetadata,
          });
        },
      },
    ],
  },
  sync_local: {
    label: "Sync direct edits to local sheets",
    steps: [
      {
        name: "sync_local",
        function: async (context) => processLocalFiles(context),
      },
      {
        name: "watch_changes",
        function: async (context) =>
          context.tasks.file.watchFolder({
            src: [context.config.local_drive.assets_path, context.config.local_drive.sheets_path],
            onUpdate: async (filepath) => {
              const { assets_path, sheets_path } = context.config.local_drive;
              const only_sheets = normalize(filepath).startsWith(normalize(sheets_path));
              const only_assets = normalize(filepath).startsWith(normalize(assets_path));
              await processLocalFiles(context, { only_assets, only_sheets });
            },
          }),
      },
    ],
  },
  sync_watch: {
    label: "View options for sync live reload (🧪 experimental)",
    steps: [
      {
        name: "sync_watch",
        function: async ({ tasks, config, workflow }) => {
          const { sheets_folders } = migrateLegacyGdriveConfig(config.google_drive);
          for (const { id: folderId, name: folderName } of sheets_folders) {
            tasks.gdrive.liveReload({
              type: "sheets",
              folderId,
              folderName,
              onUpdate: async (filepath) => {
                // only respond to xlsx file changes
                if (filepath.endsWith(".xlsx")) {
                  // TODO - add better methods to process single sheet instead of all
                  await tasks.workflow.runWorkflow({
                    name: "sync_sheets",
                    parent: workflow,
                    args: ["--skip-download"],
                  });
                  await tasks.appData.copyDeploymentDataToApp();
                }
              },
            });
          }
        },
      },
    ],
  },
  sync_authorize: {
    label: "Authorize Google Drive for content sync",
    steps: [
      {
        name: "authorize",
        function: async ({ tasks }) => {
          await tasks.gdrive.authorize();
          process.exit(0);
        },
      },
    ],
  },
  report: {
    label: "Generate App Data Reports",
    steps: [
      {
        name: "Report",
        function: async ({ tasks }) => tasks.appData.generateReports(),
      },
    ],
  },
};

export default workflows;

/**
 * When processing local files omit download process but instead replicate files
 * to download folder to allow processing as part of regular workflow
 * @param context
 */
const processLocalFiles = async (
  { tasks, config, workflow }: IWorkflowStepContext,
  options: { only_assets?: boolean; only_sheets?: boolean } = {}
) => {
  // HACK - copy local files to expected gdrive folder so can continue as if downloaded
  const { assets_folders, sheets_folders } = migrateLegacyGdriveConfig(config.google_drive);
  for (const { id, name } of assets_folders) {
    replicateDir(config.local_drive.assets_path, tasks.gdrive.getOutputFolder("assets", id, name));
  }
  for (const { id, name } of sheets_folders) {
    replicateDir(config.local_drive.sheets_path, tasks.gdrive.getOutputFolder("sheets", id, name));
  }

  // Run rest of standard sync workflow
  const { only_assets, only_sheets } = options;
  if (!only_sheets) {
    await tasks.workflow.runWorkflow({
      name: "sync_assets",
      parent: workflow,
      args: ["--skip-download"],
    });
  }
  if (!only_assets) {
    await tasks.workflow.runWorkflow({
      name: "sync_sheets",
      parent: workflow,
      args: ["--skip-download"],
    });
  }

  await tasks.appData.copyDeploymentDataToApp();
};

/** Migrate deprecated asset and sheet folder id formats */
export function migrateLegacyGdriveConfig(config: IDeploymentConfigJson["google_drive"]) {
  let { assets_folder_id, assets_folder_ids, assets_folders } = config;
  if (assets_folder_id && !assets_folders) {
    logWarning({
      msg1: "[assets_folder_id] config property is deprecated",
      msg2: "use [assets_folders] instead",
    });
    assets_folders = [{ id: assets_folder_id, name: assets_folder_id }];
  }
  if (assets_folder_ids && !assets_folders) {
    logWarning({
      msg1: "[assets_folder_ids] config property is deprecated",
      msg2: "use [assets_folders] instead",
    });
    assets_folders = assets_folder_ids.map((id) => ({ id, name: id }));
  }
  let { sheets_folder_id, sheets_folder_ids, sheets_folders } = config;
  if (sheets_folder_id && !sheets_folders) {
    logWarning({
      msg1: "[sheets_folder_id] config property is deprecated",
      msg2: "use [sheets_folders] instead",
    });
    sheets_folders = [{ id: sheets_folder_id, name: sheets_folder_id }];
  }
  if (sheets_folder_ids && !sheets_folders) {
    logWarning({
      msg1: "[sheets_folder_ids] config property is deprecated",
      msg2: "use [sheets_folders] instead",
    });
    sheets_folders = sheets_folder_ids.map((id) => ({ id, name: id }));
  }
  return { assets_folders, sheets_folders };
}
