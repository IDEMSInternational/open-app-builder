import type { IDeploymentWorkflows } from "./workflow.model";
/** Default workflows made available to all deployments */
const workflows: IDeploymentWorkflows = {
  // Copy app-data assets directly to src assets
  // Note - this is already done as part of `tasks.appData.copy`, so just for postinstall
  deployment_create: {
    label: "Create a new app deployment",
    steps: [
      {
        name: "deployment_create",
        function: async ({ tasks }) => tasks.deployment.create(),
      },
    ],
  },
  deployment_set: {
    label: "Set active deployment",
    steps: [
      {
        name: "deployment_set",
        function: async ({ tasks }) => tasks.deployment.set(),
      },
    ],
  },
};

export default workflows;
