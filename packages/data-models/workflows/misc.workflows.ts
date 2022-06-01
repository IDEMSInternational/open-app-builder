import type { IDeploymentWorkflows } from "./workflow.model";
/** Default workflows made available to all deployments */
const workflows: IDeploymentWorkflows = {
  clear_workflow_cache: {
    label: "Clear workflow caches",
    steps: [
      {
        name: "Clear",
        function: async ({ tasks, config }) =>
          tasks.file.remove({ src: config.workflows.task_cache_path }),
      },
    ],
  },
};

export default workflows;
