import type { IDeploymentWorkflows } from "./workflow.model";

const workflows: IDeploymentWorkflows = {
  beta: {
    label: "Manage deployments",
    steps: [
      {
        name: "",
        function: async ({ args }) => {
          const [childWorkflow] = args || [];
          const childWorkflows = workflows.beta.children;
          if (!childWorkflow || !childWorkflows?.childWorkflow) {
            console.log(
              "available commands",
              "\n\n" +
                Object.keys(childWorkflows as IDeploymentWorkflows)
                  .map((name) => `beta ${name}`)
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
        label: "Import deployment",
        options: [
          {
            flags: "-v, --verbose",
            description: "Show all logs",
          },
        ],
        steps: [
          {
            name: "import",
            function: async ({ tasks, args, options }) => {
              const sourcePath = args[0];
              if (!sourcePath) {
                throw new Error("Source path is required");
              }
              await tasks.beta.importExternalDeployment(sourcePath, !!options.verbose);
            },
          },
        ],
      },
      set: {
        label: "Set active deployment",
        steps: [
          {
            name: "set",
            function: async ({ tasks, args }) => {
              const deploymentName = args[0];
              await tasks.beta.setExternalDeployment(deploymentName);
            },
          },
        ],
      },
      "sync-libraries": {
        label: "Sync libraries from deployment config",
        steps: [
          {
            name: "sync-libraries",
            function: async ({ tasks }) => {
              await tasks.beta.syncLibraries();
            },
          },
        ],
      },
      "sync-sheets": {
        label: "Sync sheets from Google Drive overrides",
        steps: [
          {
            name: "sync-sheets",
            function: async ({ tasks }) => {
              await tasks.beta.syncSheets();
            },
          },
        ],
      },
      pull: {
        label: "Pull external app_data into deployment",
        steps: [
          {
            name: "pull",
            function: async ({ tasks }) => {
              await tasks.beta.pull();
            },
          },
        ],
      },
    },
  },
};

export default workflows;
