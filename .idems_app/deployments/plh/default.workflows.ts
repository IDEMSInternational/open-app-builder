import { IDeploymentWorkflows } from "data-models/workflow.model";

/*************************************************************************************
 * Workflows
 ************************************************************************************/

const workflows: IDeploymentWorkflows = {
  sync: {
    label: "Sync All Content",
    steps: [
      {
        name: "sync_templates",
        function: async ({ tasks }) => tasks.workflow.runWorkflow({ name: "sync_templates" }),
      },
      {
        name: "sync_assets",
        function: async ({ tasks }) => tasks.workflow.runWorkflow({ name: "sync_assets" }),
      },
    ],
  },
  sync_templates: {
    label: "Sync Latest Templates",
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
        function: async ({ tasks, workflow }) =>
          tasks.appData.copy({ localSheetsFolder: workflow.translations_apply.output }),
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
        function: async ({ tasks, workflow }) =>
          tasks.appData.copy({ localAssetsFolder: workflow.assets_dl.output }),
      },
    ],
  },
  setup: {
    label: "(TODO) - Setup Deployment",
    steps: [],
  },
};

export default workflows;
