import type { IDeploymentWorkflows } from "./workflow.model";
/** Default workflows made available to all deployments */
const workflows: IDeploymentWorkflows = {
  deployment: {
    steps: [
      {
        name: "",
        function: async ({ args }) => {
          console.log("deployment workflow", args);
          const [childWorkflow] = args || [];
          const childWorkflows = workflows.deployment.children;
          if (!childWorkflow || !(childWorkflow in childWorkflows)) {
            console.log(
              "available commands",
              "\n\n" +
                Object.keys(childWorkflows)
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
      // Copy app-data assets directly to src assets
      // Note - this is already done as part of `tasks.appData.copy`, so just for postinstall
      create: {
        label: "Create a new local deployment",
        steps: [
          {
            name: "deployment create",
            function: async ({ tasks }) => tasks.deployment.create(),
          },
        ],
      },
      set: {
        label: "Set active deployment",
        steps: [
          {
            name: "deployment set",
            function: async ({ tasks, args }) => {
              await tasks.deployment.set(args[0]);
            },
          },
        ],
      },
      encrypt: {
        label: "Encrypt deployment config",
        steps: [
          {
            name: "encrypt",
            function: async ({ tasks }) => tasks.encryption.encrypt(),
          },
        ],
      },
    },
  },
};

export default workflows;
