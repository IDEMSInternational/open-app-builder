import type { IDeploymentWorkflows } from "./workflow.model";
/** Default workflows made available to all deployments */
const workflows: IDeploymentWorkflows = {
  // Copy app-data assets directly to src assets
  // Note - this is already done as part of `tasks.appData.copy`, so just for postinstall
  deployment_create: {
    label: "Create a new local deployment",
    steps: [
      {
        name: "deployment_create",
        function: async ({ tasks }) => tasks.deployment.create(),
      },
    ],
  },
  deployment_import: {
    label: "Import a remote deployment repository",
    steps: [
      {
        name: "deployment_import",
        function: async ({ tasks, args }) => tasks.git().importRemoteRepo(args[0]),
      },
      {
        name: "set_deployment",
        function: async ({ tasks, workflow }) =>
          tasks.workflow.runWorkflow({ name: "deployment_set", parent: workflow }),
      },
    ],
  },
  deployment_set: {
    label: "Set active deployment",
    steps: [
      {
        name: "deployment_set",
        function: async ({ tasks, args }) => {
          await tasks.deployment.set(args[0]);
        },
      },
      {
        name: "refresh_remote_content",
        function: async ({ tasks, config }) => {
          if (config.git?.content_repo) {
            await tasks.git().refreshRemoteRepo();
          }
        },
      },
      {
        name: "copy_app_data",
        function: async ({ tasks }) => {
          tasks.appData.copyDeploymentDataToApp();
        },
      },
    ],
  },
};

export default workflows;
