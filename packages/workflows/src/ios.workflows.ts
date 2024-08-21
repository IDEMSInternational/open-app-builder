import type { IDeploymentWorkflows } from "./workflow.model";

const childWorkflows: IDeploymentWorkflows = {
  configure: {
    label: "Configure ios build app id, name and version codes",
    steps: [
      {
        name: "configure",
        function: async ({ config, tasks }) => {
          const { ios, git } = config;
          const { app_id, app_name } = ios;
          const { content_tag_latest } = git;
          return tasks.ios.configure({
            appId: app_id,
            appName: app_name,
            versionName: content_tag_latest,
          });
        },
      },
    ],
  },
  set_icons_and_splash_images: {
    label:
      "Generate app launcher icon and splash screen image from icon-only.png and splash.png asset respectively. Then if provided, it will generate adaptive icon from icon-foreground.png and icon-background.png. Copy generated files to relevant folders.",
    steps: [
      {
        name: "set_icons_and_splash_images",
        function: async ({ tasks, config }) =>
          tasks.ios.set_icons_and_splash_images({ assetPath: config.ios.assets_path }),
      },
    ],
  },
  // Generate iOS assets from source images (splash.png, icon.png and, optionally, icon-foreground.png and icon-background.png)
  // Icon images must be at least 1024×1024px, splash image must be at least 2732×2732px
  // Further specification here: https://capacitorjs.com/docs/guides/splash-screens-and-icons
};

/** Default workflows made available to all deployments */
const defaultWorkflows: IDeploymentWorkflows = {
  ios: {
    label: `Run ios workflows: ${Object.keys(childWorkflows).join(",")}`,
    // default workflow runs all child workflows
    steps: [
      {
        name: "Configure Core",
        function: async ({ tasks, workflow }) =>
          await tasks.workflow.runWorkflow({ name: "ios configure", parent: workflow }),
      },
      {
        name: "Set Icons and Splash Images",
        function: async ({ tasks, workflow }) =>
          await tasks.workflow.runWorkflow({
            name: "ios set_icons_and_splash_images",
            parent: workflow,
          }),
      },
    ],
    children: childWorkflows,
  },
};

export default defaultWorkflows;
