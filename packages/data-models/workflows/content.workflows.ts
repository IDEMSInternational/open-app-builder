import type { IDeploymentWorkflows } from "./workflow.model";
/** Default workflows made available to all deployments */
const workflows: IDeploymentWorkflows = {
  content_repo_release: {
    label: "Create a new content release",
    steps: [
      {
        name: "TODO",
        function: async ({ tasks }) => {
          await tasks.git().createContentRelease();
          // await tasks.git.removeChanges();
          // await tasks.git.pullRemote();
          // await tasks.file.replicateDir();
          // await tasks.git.createPr('content/2022-05-26')
        },
      },
    ],
  },
};

export default workflows;
