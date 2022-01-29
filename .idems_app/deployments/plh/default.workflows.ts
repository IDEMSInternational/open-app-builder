import { IDeploymentWorkflows } from "data-models/workflow.model";

/*************************************************************************************
 * Workflows
 ************************************************************************************/

const workflows: IDeploymentWorkflows = {
  setup: {
    label: "Setup Deployment",
    steps: [],
  },
  sync: {
    label: "Sync All Content",
    steps: [
      {
        name: "sync_sheets",
        function: async ({ tasks, config }) =>
          tasks.workflow.runWorkflow({ name: "sync_templates" }),
      },
      {
        name: "sync_assets",
        function: async ({ tasks, config }) => tasks.workflow.runWorkflow({ name: "sync_assets" }),
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
    ],
  },
};

export default workflows;
