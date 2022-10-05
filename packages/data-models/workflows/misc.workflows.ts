import type { IDeploymentWorkflows } from "./workflow.model";
/** Default workflows made available to all deployments */
const workflows: IDeploymentWorkflows = {
  // Copy app-data assets directly to src assets
  // Note - this is already done as part of `tasks.appData.copy`, so just for postinstall
  populate_src_assets: {
    label: "Copy Assets to Src",
    steps: [
      {
        name: "populate_src_assets",
        function: async ({ tasks, config }) =>
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
  translate_vtt_files: {
    label: "Find .vtt files and generate new ones translated to the target language",
    steps: [
      {
        name: "translate_vtt_files",
        function: async ({ tasks, config }) => {
          await tasks.subtitles.translateAllVttFilesAndSave(
            config.app_data.translations_output_path,
            config.app_data.assets_output_path,
            "global"
          );
        },
      },
    ],
  },
};

export default workflows;
