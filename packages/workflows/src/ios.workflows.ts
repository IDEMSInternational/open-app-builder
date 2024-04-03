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
    ],
    children: childWorkflows,
  },
};

export default defaultWorkflows;
