import type { IDeploymentWorkflows } from "./workflow.model";
/** Default workflows made available to all deployments */
const workflows: IDeploymentWorkflows = {
  content_release: {
    label: "Tag a new content version for release",
    steps: [
      {
        name: "Create github release",
        function: async ({ tasks }) => {
          await tasks.git().createContentRelease();
        },
      },
    ],
  },
};

export default workflows;
