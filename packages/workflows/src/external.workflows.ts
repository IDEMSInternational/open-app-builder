import type { IDeploymentWorkflows } from "./workflow.model";

const workflows: IDeploymentWorkflows = {
  external: {
    label: "Manage external deployments",
    steps: [
      {
        name: "",
        function: async ({ args }) => {
          const [childWorkflow] = args || [];
          const childWorkflows = workflows.external.children;
          if (!childWorkflow || !childWorkflows?.childWorkflow) {
            console.log(
              "available commands",
              "\n\n" +
                Object.keys(childWorkflows as IDeploymentWorkflows)
                  .map((name) => `external ${name}`)
                  .join("\n"),
              "\n"
            );
            return;
          }
        },
      },
    ],
    children: {
      import: {
        label: "Import external deployment",
        steps: [
          {
            name: "import",
            function: async ({ tasks, args }) => {
              const sourcePath = args[0];
              if (!sourcePath) {
                throw new Error("Source path is required");
              }
              await tasks.external.import(sourcePath);
            },
          },
        ],
      },
      set: {
        label: "Set active external deployment",
        steps: [
          {
            name: "set",
            function: async ({ tasks, args }) => {
              const deploymentName = args[0];
              if (!deploymentName) {
                throw new Error("Deployment name is required");
              }
              await tasks.external.set(deploymentName);
            },
          },
        ],
      },
      pull: {
        label: "Pull external data",
        steps: [
          {
            name: "pull",
            function: async ({ tasks }) => {
              await tasks.external.pull();
            },
          },
        ],
      },
      "sync-libraries": {
        label: "Sync libraries",
        steps: [
          {
            name: "sync-libraries",
            function: async ({ tasks }) => {
              await tasks.external.syncLibraries();
            },
          },
        ],
      },
      "sync-sheets": {
        label: "Sync sheets",
        steps: [
          {
            name: "sync-sheets",
            function: async ({ tasks }) => {
              await tasks.external.syncSheets();
            },
          },
        ],
      },
    },
  },
};

export default workflows;
