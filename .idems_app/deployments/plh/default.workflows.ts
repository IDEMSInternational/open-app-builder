import { IDeploymentWorkflows } from "data-models/workflow.model";

/*************************************************************************************
 * Workflows
 ************************************************************************************/

const workflows: IDeploymentWorkflows = {
  sync: {
    label: "Sync All Content",
    steps: [
      {
        name: "sheets_dl",
        function: async ({ config, tasks }) =>
          tasks.gdrive.download({ folderId: config.google_drive.assets_folder_id }),
      },
      {
        name: "sheets_process",
        function: async ({ workflow, tasks }) =>
          tasks.template.process({ inputFolder: workflow.sheets_dl.output }),
      },
      {
        name: "assets_dl",
        function: async ({ config, tasks }) =>
          tasks.gdrive.download({ folderId: config.google_drive.assets_folder_id }),
      },
    ],
  },
  first_run: {
    label: "First Run",
    steps: [],
  },
  sync_templates: {
    label: "Sync Latest Templates",
    steps: [],
  },
  sync_assets: {
    label: "Sync Latest Assets",
    steps: [],
  },
};

export default workflows;
