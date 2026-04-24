import { spawnSync } from "child_process";
import type { IDeploymentWorkflows } from "./workflow.model";
/** Default workflows made available to all deployments */
const workflows: IDeploymentWorkflows = {
  repo: {
    label: "Tag a new content version for release",
    steps: [
      {
        name: "",
        function: async ({ args }) => {
          const [childWorkflow] = args || [];
          const childWorkflows = workflows.deployment.children;
          if (!childWorkflow || !childWorkflows?.childWorkflow) {
            console.log(
              "available commands",
              "\n\n" +
                Object.keys(childWorkflows as IDeploymentWorkflows)
                  .map((name) => `deployment ${name}`)
                  .join("\n"),
              "\n"
            );
            return;
          }
        },
      },
    ],
    children: {
      actions: {
        label: "Configure Github Actions for repo",
        steps: [
          {
            name: "Github Actions setup",
            function: async ({ tasks }) => {
              tasks.actions.setup();
            },
          },
        ],
      },
      open: {
        label: "Open child repo in VSCode",
        steps: [
          {
            name: "open",
            function: async ({ config }) =>
              spawnSync(`code ${config._workspace_path}`, { shell: true, stdio: "inherit" }),
          },
        ],
      },
      publish: {
        label: "Create github release",
        steps: [
          {
            name: "publish",
            function: async ({ tasks }) => {
              await tasks.git().createContentRelease();
            },
          },
        ],
      },
    },
  },
};

export default workflows;
