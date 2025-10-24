import type { IDeploymentWorkflows } from "./workflow.model";

const childWorkflows: IDeploymentWorkflows = {
  generate: {
    label: "Generate asset pack configuration",
    steps: [
      {
        name: "generate",
        function: async ({ tasks }) => {
          // TODO: Add configuration options as needed
          return tasks.assetPack.generate({});
        },
      },
    ],
  },
};

/** Default workflows made available to all deployments */
const defaultWorkflows: IDeploymentWorkflows = {
  asset_pack: {
    label: `Run asset pack workflows: ${Object.keys(childWorkflows).join(",")}`,
    // default workflow runs all child workflows
    steps: [
      {
        name: "Generate Asset Pack",
        function: async ({ tasks, workflow }) =>
          await tasks.workflow.runWorkflow({ name: "asset_pack generate", parent: workflow }),
      },
    ],
    children: childWorkflows,
  },
};

export default defaultWorkflows;
