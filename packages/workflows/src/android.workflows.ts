import type { IDeploymentWorkflows } from "./workflow.model";

const childWorkflows: IDeploymentWorkflows = {
  configure: {
    label: "Configure android build app id, name and version codes",
    steps: [
      {
        name: "configure",
        function: async ({ config, tasks }) => {
          const { android, git } = config;
          const { app_id, app_name } = android;
          const { content_tag_latest } = git;
          return tasks.android.configure({
            appId: app_id,
            appName: app_name,
            versionName: content_tag_latest,
          });
        },
      },
    ],
  },
  // Generate Android assets from source images (splash.png, icon.png and, optionally, icon-foreground.png and icon-background.png)
  // Icon images must be at least 1024×1024px, splash image must be at least 2732×2732px
  // Further specifications provided here: https://www.npmjs.com/package/cordova-res
  // Cordova-res is considered legacy, so we now are migrating to using capacitor-assets instead
  // Further specification here: https://capacitorjs.com/docs/guides/splash-screens-and-icons
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
  set_icons_and_splash_images: {
    label:
      "Generate app launcher icon and splash screen image from icon.png and splash.png assets respectively. Copy generated files to relevant folders",
    steps: [
      {
        name: "set_icons_and_splash_images",
        function: async ({ tasks, config }) =>
          tasks.android.set_icons_and_splash_images({ assetPath: config.android.icon_asset_path }),
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
      {
        name: "Set Icons and Splash Images",
        function: async ({ tasks, workflow }) =>
          await tasks.workflow.runWorkflow({
            name: "android set_icons_and_splash_images",
            parent: workflow,
          }),
      },
    ],
    children: childWorkflows,
  },
};

export default defaultWorkflows;
