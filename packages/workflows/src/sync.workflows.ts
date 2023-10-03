import { normalize } from "path";
import { replicateDir } from "shared";
import type { IDeploymentWorkflows, IWorkflowStepContext } from "./workflow.model";

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
          const folderId = config.google_drive.sheets_folder_id;
          // If skipping download still need to return download folder for next step
          if (options.skipDownload) {
            return tasks.gdrive.getOutputFolder(folderId);
          } else {
            return tasks.gdrive.download({ folderId });
          }
        },
      },
      {
        name: "sheets_process",
        function: async ({ tasks, workflow }) =>
          tasks.template.process({ inputFolder: workflow.sheets_dl.output }),
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
          const folderId = config.google_drive.assets_folder_id;
          const filterFn = config.google_drive.assets_filter_function;
          // If skipping download still need to return download folder for next step
          if (options.skipDownload) {
            return tasks.gdrive.getOutputFolder(folderId);
          } else {
            return tasks.gdrive.download({ folderId, filterFn });
          }
        },
      },
      {
        name: "assets_post_process",
        function: async ({ tasks, workflow }) =>
          tasks.appData.postProcessAssets({
            sourceAssetsFolder: workflow.assets_dl.output,
          }),
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
          tasks.gdrive.liveReload({
            folderId: config.google_drive.sheets_folder_id,
            onUpdate: async (filepath) => {
              // only respond to xlsx file changes
              if (filepath.endsWith(".xlsx")) {
                // TODO - add better methods to process single sheet instead of all
                await tasks.workflow.runWorkflow({
                  name: "sync_sheets",
                  parent: workflow,
                  args: ["--skip-download"],
                });
                tasks.appData.copyDeploymentDataToApp();
              }
            },
          });
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
          tasks.gdrive.authorize();
          process.exit(0);
        },
      },
    ],
  },
  canto_wip: {
    label: "Test Canto methods",
    steps: [
      {
        name: "Run debug function",
        function: async ({ tasks }) => {
          return tasks.canto.debugFunction();
        },
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
  const { assets_folder_id, sheets_folder_id } = config.google_drive;
  replicateDir(config.local_drive.sheets_path, tasks.gdrive.getOutputFolder(sheets_folder_id));
  replicateDir(config.local_drive.assets_path, tasks.gdrive.getOutputFolder(assets_folder_id));

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

  tasks.appData.copyDeploymentDataToApp();
};
