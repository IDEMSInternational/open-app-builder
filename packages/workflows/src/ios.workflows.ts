import { logWarning } from "shared";
import type { IDeploymentWorkflows } from "./workflow.model";

const childWorkflows: IDeploymentWorkflows = {
  configure: {
    label: "Configure ios build app id, name and version codes",
    steps: [
      {
        name: "configure",
        function: async ({ config, tasks }) => {
          const { ios, git, auth } = config;
          const { app_id, app_name, zoom_enabled } = ios;
          const { content_tag_latest } = git;
          const { provider } = auth;
          return tasks.ios.configure({
            appId: app_id,
            appName: app_name,
            authProvider: provider,
            versionName: content_tag_latest,
            zoomEnabled: zoom_enabled || false,
          });
        },
      },
    ],
  },
  /**
   * Generate iOS app icon and launch screen from logo + background colour.
   * Uses ios config if ios.logo_asset_path is set; otherwise uses android config (logo and colour from same source).
   */
  generate_assets: {
    label: "Generate launcher assets (icon + launch screen) from logo",
    steps: [
      {
        name: "generate_assets",
        function: async ({ tasks, config }) => {
          const { ios, android } = config;

          if (ios.logo_asset_path) {
            await tasks.ios.generateAssets({
              logoPath: ios.logo_asset_path,
              backgroundColor: ios.logo_background_color ?? "",
            });
            return;
          }

          if (android.logo_asset_path) {
            logWarning({
              msg1: "[ios generate_assets] Using android config (ios.logo_asset_path not set)",
              msg2: "Set ios.logo_asset_path and ios.logo_background_color to use ios-specific assets, or leave as-is to share with android.",
            });
            await tasks.ios.generateAssets({
              logoPath: android.logo_asset_path,
              backgroundColor: android.logo_background_color ?? "",
            });
            return;
          }

          console.log(
            "[ios generate_assets] No logo_asset_path found. Set ios.logo_asset_path or android.logo_asset_path."
          );
        },
      },
    ],
  },
};

/** Default workflows made available to all deployments */
const defaultWorkflows: IDeploymentWorkflows = {
  ios: {
    label: `Run ios workflows: ${Object.keys(childWorkflows).join(",")}`,
    // default workflow runs all child workflows
    steps: [
      {
        name: "Configure",
        function: async ({ tasks, workflow }) =>
          await tasks.workflow.runWorkflow({ name: "ios configure", parent: workflow }),
      },
      {
        name: "Generate Assets",
        function: async ({ tasks, workflow }) =>
          await tasks.workflow.runWorkflow({ name: "ios generate_assets", parent: workflow }),
      },
    ],
    children: childWorkflows,
  },
};

export default defaultWorkflows;
