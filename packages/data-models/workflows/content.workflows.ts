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
          // await tasks.git.createPr('content/2022-05-26')
        },
      },
    ],
  },
};

export default workflows;
