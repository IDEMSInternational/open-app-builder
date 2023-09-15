import type { IDeploymentWorkflows } from "./workflow.model";
/** Default workflows made available to all deployments */
const workflows: IDeploymentWorkflows = {
  // Generate Android assets from source images (splash.png, icon.png and, optionally, icon-foreground.png and icon-background.png)
  // Icon images must be at least 1024×1024px, splash image must be at least 2732×2732px
  // Further specifications provided here: https://www.npmjs.com/package/cordova-res
  populate_android_assets: {
    label: "Populate Android assets (app icon and splash screen)",
    steps: [
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
        function: async ({ tasks, config }) => {
          tasks.android.set_splash_image(config.android.splash_asset_path);
        },
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

export default workflows;
