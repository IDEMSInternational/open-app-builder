import { resolve } from "path";
import type { IDeploymentWorkflows } from "./workflow.model";
/** Default workflows made available to all deployments */
const workflows: IDeploymentWorkflows = {
  deployment: {
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
      // Copy app-data assets directly to src assets
      // Note - this is already done as part of `tasks.appData.copy`, so just for postinstall
      create: {
        label: "Create a new local deployment",
        steps: [
          {
            name: "deployment create",
            function: async ({ tasks }) => tasks.deployment.create(),
          },
          {
            name: "set deployment",
            function: async ({ tasks, workflow }) => {
              const shouldSet = await tasks.userInput.promptConfirmation(
                "Would you like to set the deployment as active?",
                true
              );
              if (shouldSet) {
                const deploymentName = workflow["deployment create"].output;
                await tasks.workflow.runWorkflow({
                  name: `deployment set ${deploymentName}`,
                  parent: workflow,
                });
              }
            },
          },
        ],
      },
      import: {
        label: "Import a remote deployment repository",
        steps: [
          {
            name: "deployment import",
            function: async ({ tasks, args }) => tasks.deployment.import(args[0]),
          },
          {
            name: "set deployment",
            function: async ({ tasks, workflow }) => {
              const shouldSet = await tasks.userInput.promptConfirmation(
                "Would you like to set the deployment as active?",
                true
              );
              if (shouldSet) {
                const deploymentName = workflow["deployment import"].output;
                await tasks.workflow.runWorkflow({
                  name: `deployment set ${deploymentName}`,
                  parent: workflow,
                });
              }
            },
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
            function: async ({ tasks, config }) =>
              tasks.encryption.encrypt(resolve(config._workspace_path, "encrypted")),
          },
        ],
      },
      decrypt: {
        label: "Decrypt deployment config",
        steps: [
          {
            name: "decrypt",
            function: async ({ tasks, config }) =>
              tasks.encryption.decrypt(resolve(config._workspace_path, "encrypted")),
          },
        ],
      },
    },
  },
};

export default workflows;
