import type { IDeploymentWorkflows } from "./workflow.model";

const childWorkflows: IDeploymentWorkflows = {
  configure: {
    label: "Configure android build app id, name and version codes",
    steps: [
      {
        name: "configure",
        function: async ({ config, tasks }) => {
          const { android, git } = config;
          const { app_id, app_name, zoom_enabled } = android;
          const { content_tag_latest } = git;
          return tasks.android.configure({
            appId: app_id,
            appName: app_name,
            versionName: content_tag_latest,
            zoomEnabled: zoom_enabled || false,
          });
        },
      },
    ],
  },
  // Generate Android assets from source images (splash.png, icon.png and, optionally, icon-foreground.png and icon-background.png)
  // Icon images must be at least 1024×1024px, splash image must be at least 2732×2732px
  // Further specifications provided here: https://www.npmjs.com/package/cordova-res
  set_splash_image: {
    label: "Generate splash screen image from splash.png asset and copy to relevant folders",
    steps: [
      {
        name: "set_splash_image",
        function: async ({ tasks, config }) =>
          tasks.android.set_splash_image(config.android.splash_asset_path),
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
          tasks.android.set_launcher_icon({
            iconAssetPath: config.android.icon_asset_path,
            iconAssetForegroundPath: config.android.icon_asset_foreground_path,
            iconAssetBackgroundPath: config.android.icon_asset_background_path,
          }),
      },
    ],
  },
};

/** Default workflows made available to all deployments */
const defaultWorkflows: IDeploymentWorkflows = {
  // TODO - add git notes about namespace change
  android: {
    label: `Run android workflows: ${Object.keys(childWorkflows).join(",")}`,
    // default workflow runs all child workflows
    steps: [
      {
        name: "Configure Core",
        function: async ({ tasks, workflow }) =>
          await tasks.workflow.runWorkflow({ name: "android configure", parent: workflow }),
      },
      {
        name: "Set Splash Image",
        function: async ({ tasks, workflow }) =>
          await tasks.workflow.runWorkflow({ name: "android set_splash_image", parent: workflow }),
      },
      {
        name: "Set Launcher Icon",
        function: async ({ tasks, workflow }) =>
          await tasks.workflow.runWorkflow({ name: "android set_launcher_icon", parent: workflow }),
      },
    ],
    children: childWorkflows,
  },
};

export default defaultWorkflows;
