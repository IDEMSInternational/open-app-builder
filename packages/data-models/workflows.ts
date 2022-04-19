import { IDeploymentWorkflows } from "./workflow.model";
/** Default workflows made available to all deployments */
export const WORKFLOW_DEFAULTS: IDeploymentWorkflows = {
  sync: {
    label: "Sync All Content",
    steps: [
      {
        name: "sync_sheets",
        function: async ({ tasks }) => tasks.workflow.runWorkflow({ name: "sync_sheets" }),
      },
      {
        name: "sync_assets",
        function: async ({ tasks }) => tasks.workflow.runWorkflow({ name: "sync_assets" }),
      },
    ],
  },
  sync_sheets: {
    label: "Sync Latest Sheets",
    steps: [
      {
        name: "sheets_dl",
        function: async ({ tasks, config }) =>
          tasks.gdrive.download({ folderId: config.google_drive.sheets_folder_id }),
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
        name: "app_copy_assets",
        function: async ({ tasks, workflow, config }) =>
          tasks.appData.copy({
            localAssetsFolder: workflow.assets_dl.output,
            appAssetsFolder: config.app_data.assets_output_path,
          }),
      },
    ],
  },
  setup: {
    label: "(TODO) - Setup Deployment",
    steps: [],
  },
};
