import type { IDeploymentWorkflows } from "./workflow.model";
/** Default workflows made available to all deployments */
const workflows: IDeploymentWorkflows = {
  // Copy app-data assets directly to src assets
  // Note - this is already done as part of `tasks.appData.copy`, so just for postinstall
  content_repo_init: {
    label: "Initialise deployment content repo",
    steps: [
      {
        name: "content_repo_init",
        function: async ({ tasks }) =>
          tasks.git().clone({
            repoPath: "https://github.com/c-squared-dev/idems-app-data-demo",
          }),
      },
    ],
  },
  content_repo_update: {
    label: "Upload local content to remote repo",
    steps: [
      {
        /**
         * - Clear local changes
         * - Sync remote
         * - Replicate app-data
         * - Create branch
         * - Create PR
         * - Revert branch
         */
        name: "TODO",
        function: async ({ tasks }) => {
          // await tasks.git.removeChanges();
          // await tasks.git.pullRemote();
          // await tasks.file.replicateDir();
          // await tasks.git.createPr('content/2022-05-26')
        },
      },
    ],
  },
  content_repo_download: {
    label: "Download ",
    steps: [
      {
        name: "TODO",
        function: async () => null,
      },
    ],
  },
  content_repo_release: {
    label: "Create a new content release",
    steps: [
      {
        name: "TODO",
        function: async () => null,
      },
    ],
  },
};

export default workflows;
