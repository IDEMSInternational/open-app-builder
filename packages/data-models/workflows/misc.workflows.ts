import type { IDeploymentWorkflows } from "./workflow.model";
/** Default workflows made available to all deployments */
const workflows: IDeploymentWorkflows = {
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
