import { resolve } from "path";
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
        function: async ({ tasks }) => tasks.appData.copyDeploymentDataToApp(),
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
          const { output_path } = config.app_data;
          const translationsPath = resolve(output_path, "translations");
          const assetsPath = resolve(output_path, "assets");
          await tasks.subtitles.translateAllVttFilesAndSave(translationsPath, assetsPath, "global");
        },
      },
    ],
  },
};

export default workflows;
