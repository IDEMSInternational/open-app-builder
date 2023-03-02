import { resolve } from "path";
import type { IDeploymentWorkflows } from "./workflow.model";
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
        condition: async ({ options }) => !!options.contentWatch,
        function: async ({ tasks, workflow, options }) => {
          if (options.contentWatch) {
            tasks.workflow.runWorkflow({ name: "sync_watch", parent: workflow });
          } else {
            console.log('Use "--content-watch" or "-cw" to enable live sync\n');
          }
        },
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
    steps: [
      {
        name: "assets_dl",
        function: async ({ tasks, config }) =>
          tasks.gdrive.download({
            folderId: config.google_drive.assets_folder_id,
            // filterFn: config.google_drive.assets_filter_function,
          }),
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
        name: "sheets_process",
        function: async ({ tasks, config }) =>
          tasks.template.process({ inputFolder: config.local_drive.sheets_path }),
      },
      // NOTE - translations not currently included in local version
      {
        name: "app_copy_data",
        function: async ({ tasks, workflow, config }) => {
          // HACK - skipping translations step but still use previously processed strings
          const sourceTranslationsFolder = resolve(
            config.workflows.task_cache_path,
            "tasks",
            "translate",
            "outputs",
            "strings"
          );
          // copy files
          tasks.appData.postProcessSheets({
            sourceSheetsFolder: workflow.sheets_process.output,
            sourceTranslationsFolder,
          });
          // TODO - add support for assets
          tasks.appData.copyDeploymentDataToApp();
        },
      },
      {
        name: "watch_changes",
        function: async ({ tasks, workflow, config }) =>
          tasks.file.watchFolder({
            src: [config.local_drive.assets_path, config.local_drive.sheets_path],
            // HACK - want to just call same as above but hard to do and not cause multiple listeners
            onUpdate: async () => {
              const output = tasks.template.process({
                inputFolder: config.local_drive.sheets_path,
              });
              // HACK - skipping translations step but still use previously processed strings
              const sourceTranslationsFolder = resolve(
                config.workflows.task_cache_path,
                "tasks",
                "translate",
                "outputs",
                "strings"
              );
              // copy files
              tasks.appData.postProcessSheets({
                sourceSheetsFolder: output,
                sourceTranslationsFolder,
              });
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
};

export default workflows;
