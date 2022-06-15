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
  populate_android_assets: {
    label: "Populate Android assets (app icon and splash screen)",
    steps: [
      {
        name: "Clear",
        function: async ({ tasks, config }) =>
          tasks.file.remove({ src: config.workflows.task_cache_path }),
      },
      {
        name: "set_splash_image",
        function: async ({ tasks, workflow }) =>
          tasks.workflow.runWorkflow({ name: "set_splash_image", parent: workflow }),
      },
      {
        name: "set_launcher_icon",
        function: async ({ tasks, workflow }) =>
          tasks.workflow.runWorkflow({ name: "set_launcher_icon", parent: workflow }),
      },
    ],
  },
  set_splash_image: {
    label: "Generate splash screen image from splash.png asset and copy to relevant folders",
    steps: [
      {
        name: "set_splash_image",
        function: async ({ tasks, config }) =>
          tasks.android.set_splash_image(config.app_data.assets_output_path, "global/android"),
      },
    ],
  },
  set_launcher_icon: {
    label:
      "Generate app launcher icon from icon.png asset and, if provided, generate adaptive icon from icon-foreground.png and icon-background.png. Copy generated files to relevant folders",
    steps: [
      {
        name: "set_launcher_icon",
        function: async ({ tasks, config }) =>
          tasks.android.set_launcher_icon(config.app_data.assets_output_path, "global/android"),
      },
    ],
  },
};

export default workflows;
