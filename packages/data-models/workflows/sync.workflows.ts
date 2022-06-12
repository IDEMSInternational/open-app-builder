import type { IDeploymentWorkflows } from "./workflow.model";
/** Default workflows made available to all deployments */
const workflows: IDeploymentWorkflows = {
  sync: {
    label: "Sync All Content",
    steps: [
      {
        name: "sync_parent",
        function: async ({ tasks, workflow, config }) => {
          if (config._parent_config) {
            const shouldSyncParent = await tasks.userInput.promptOptions(
              [
                { name: "No", value: false },
                { name: "Yes", value: true },
              ],
              `Would you like to sync parent [${config._parent_config.name}] content also`
            );
            if (shouldSyncParent) {
              await tasks.workflow.runWorkflow({ name: "sync_parent", parent: workflow });
            }
          }
        },
      },
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
      {
        name: "copy_to_app",
        function: async ({ tasks }) => tasks.appData.copyDeploymentDataToApp(),
      },
    ],
  },
  sync_parent: {
    steps: [
      {
        name: "sync_parent",
        function: async ({ tasks, workflow, config }) => {
          await tasks.deployment.set(config._parent_config.name);
          await tasks.workflow.runWorkflow({ name: "sync_sheets", parent: workflow });
          await tasks.workflow.runWorkflow({ name: "sync_assets", parent: workflow });
          await tasks.deployment.set(config.name);
        },
      },
    ],
  },
  sync_sheets: {
    // label: "Sync Latest Sheets",
    steps: [
      {
        name: "sheets_dl",
        function: async ({ tasks, config }) =>
          tasks.gdrive.download({
            folderId: config.google_drive.sheets_folder_id,
            filterFn: config.google_drive.sheets_filter_function,
          }),
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
            filterFn: config.google_drive.assets_filter_function,
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
};

export default workflows;
