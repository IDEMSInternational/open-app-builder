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
   * Canonical: logo_asset_path + logo_background_color (optional; default white with warning).
   * Legacy (deprecated): icon_asset_path + splash_asset_path (+ optional foreground/background).
   */
  generate_assets: {
    label: "Generate launcher assets (icon + splash) from configured source images",
    steps: [
      {
        name: "generate_assets",
        function: async ({ tasks, config }) => {
          const { android } = config;
          const hasLogoConfig = android.logo_asset_path;
          const hasLegacyConfig = android.icon_asset_path && android.splash_asset_path;

          if (hasLogoConfig) {
            await tasks.android.generateAssets({
              logoPath: android.logo_asset_path,
              backgroundColor: android.logo_background_color ?? "",
            });
          } else if (hasLegacyConfig) {
            await tasks.android.generateSplash({
              splashAssetPath: android.splash_asset_path,
            });
            await tasks.android.generateIcon({
              iconAssetPath: android.icon_asset_path,
              iconAssetForegroundPath: android.icon_asset_foreground_path,
              iconAssetBackgroundPath: android.icon_asset_background_path,
            });
          } else {
            console.log(
              "[android generate_assets] No asset config found. " +
                "Set logo_asset_path and logo_background_color."
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
