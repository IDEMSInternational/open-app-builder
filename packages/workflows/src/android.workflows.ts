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
  /**
   * Generate Android launcher assets (icon + splash).
   * Two approaches are supported – asset-based takes precedence if both are configured:
   * 1. Asset-based: provide icon_asset_path + splash_asset_path (+ optional foreground/background)
   * 2. Logo-based: provide logo_asset_path + background colors (generates everything from one logo)
   */
  generate_assets: {
    label: "Generate launcher assets (icon + splash) from configured source images",
    steps: [
      {
        name: "generate_assets",
        function: async ({ tasks, config }) => {
          const { android } = config;
          const hasAssetConfig = android.icon_asset_path && android.splash_asset_path;
          const hasLogoConfig = android.logo_asset_path;

          if (hasAssetConfig) {
            // Asset-based approach: separate icon and splash images
            if (android.splash_asset_path) {
              await tasks.android.generateSplash({
                splashAssetPath: android.splash_asset_path,
                splashAssetPathDark: android.splash_asset_path_dark,
              });
            }
            if (android.icon_asset_path) {
              await tasks.android.generateIcon({
                iconAssetPath: android.icon_asset_path,
                iconAssetForegroundPath: android.icon_asset_foreground_path,
                iconAssetBackgroundPath: android.icon_asset_background_path,
              });
            }
          } else if (hasLogoConfig) {
            // Logo-based approach: generate everything from a single logo
            await tasks.android.generateFromLogo({
              logoPath: android.logo_asset_path,
              logoPathDark: android.logo_asset_path_dark,
              iconBackgroundColor: android.icon_background_color,
              splashBackgroundColor: android.splash_background_color,
              splashBackgroundColorDark: android.splash_background_color_dark,
            });
          } else {
            console.log(
              "[android generate_assets] No asset config found. " +
                "Provide icon_asset_path + splash_asset_path, or logo_asset_path."
            );
          }
        },
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
        name: "Generate Assets",
        function: async ({ tasks, workflow }) =>
          await tasks.workflow.runWorkflow({ name: "android generate_assets", parent: workflow }),
      },
    ],
    children: childWorkflows,
  },
};

export default defaultWorkflows;
