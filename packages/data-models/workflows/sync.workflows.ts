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
        name: "translations_copy_for_export",
        function: async ({ tasks, workflow }) =>
          tasks.translate.copyContentForTranslators({
            inputFolder: workflow.sheets_process.output,
          }),
      },
      {
        name: "app_copy_sheets",
        function: async ({ tasks, workflow, config }) =>
          tasks.appData.copy({
            localSheetsFolder: workflow.translations_apply.output.sheets,
            localTranslationsFolder: workflow.translations_apply.output.strings,
            appSheetsFolder: config.app_data.sheets_output_path,
            appTranslationsFolder: config.app_data.translations_output_path,
          }),
      },
    ],
  },
  sync_assets: {
    label: "Sync Latest Assets",
    steps: [
      {
        name: "assets_dl",
        function: async ({ tasks, config }) =>
          tasks.gdrive.download({ folderId: config.google_drive.assets_folder_id }),
      },
      {
        name: "app_copy_add_data",
        function: async ({ tasks, workflow, config }) =>
          tasks.appData.copy({
            localAssetsFolder: workflow.assets_dl.output,
            appAssetsFolder: config.app_data.assets_output_path,
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
