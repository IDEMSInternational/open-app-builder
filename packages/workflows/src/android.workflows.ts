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
  // Icon images should be at least 1024×1024px, splash image should be at least 2732×2732px
  // Assets are generated using @capacitor/assets – see Capacitor docs for up-to-date guidance.
  generate_splash: {
    label: "Generate splash screen assets from splash.png",
    steps: [
      {
        name: "generate_splash",
        function: async ({ tasks, config }) =>
          tasks.android.generate_splash({
            splashAssetPath: config.android.splash_asset_path,
          }),
      },
    ],
  },
  generate_icon: {
    label:
      "Generate launcher icon assets from icon.png (and adaptive icon if foreground/background provided)",
    steps: [
      {
        name: "generate_icon",
        function: async ({ tasks, config }) =>
          tasks.android.generate_icon({
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
  android: {
    label: `Run android workflows: ${Object.keys(childWorkflows).join(",")}`,
    // default workflow runs all child workflows
    steps: [
      {
        name: "Configure",
        function: async ({ tasks, workflow }) =>
          await tasks.workflow.runWorkflow({ name: "android configure", parent: workflow }),
      },
      {
        name: "Generate Splash",
        function: async ({ tasks, workflow }) =>
          await tasks.workflow.runWorkflow({ name: "android generate_splash", parent: workflow }),
      },
      {
        name: "Generate Icon",
        function: async ({ tasks, workflow }) =>
          await tasks.workflow.runWorkflow({ name: "android generate_icon", parent: workflow }),
      },
    ],
    children: childWorkflows,
  },
};

export default defaultWorkflows;
