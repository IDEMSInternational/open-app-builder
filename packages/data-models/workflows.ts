import { IDeploymentWorkflows } from "./workflow.model";
/** Default workflows made available to all deployments */
export const WORKFLOW_DEFAULTS: IDeploymentWorkflows = {
  sync: {
    label: "Sync All Content",
    steps: [
      {
        name: "sync_sheets",
        function: async ({ tasks, workflow }) =>
          tasks.workflow.runWorkflow({ name: "sync_sheets", parent: workflow }),
      },
      {
        name: "sync_assets",
        function: async ({ tasks, workflow }) =>
          tasks.workflow.runWorkflow({ name: "sync_assets", parent: workflow }),
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
        name: "app_copy_add_data",
        function: async ({ tasks, workflow, config }) =>
          tasks.appData.copy({
            localAssetsFolder: workflow.assets_dl.output,
            appAssetsFolder: config.app_data.assets_output_path,
          }),
      },
    ],
  },
  // Copy app-data assets directly to src assets
  // Note - this is already done as part of `tasks.appData.copy`, so just for postinstall
  populate_src_assets: {
    label: "Copy Assets to Src",
    steps: [
      {
        name: "populate_src_assets",
        function: async ({ tasks, workflow, config }) =>
          tasks.appData.populateSrcAssets({
            appAssetsFolder: config.app_data.assets_output_path,
            appSheetsFolder: config.app_data.sheets_output_path,
            appTranslationsFolder: config.app_data.translations_output_path,
          }),
      },
    ],
  },
  clear_workflow_cache: {
    label: "Clear workflow caches",
    steps: [
      {
        name: "Clear",
        function: async ({ tasks, config }) =>
          tasks.file.remove({ src: config.workflows.task_cache_path }),
      },
    ],
  },
};
