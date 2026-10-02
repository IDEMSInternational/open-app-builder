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
              await tasks.beta.importExternalDeployment(sourcePath, {
                verbose: !!options.verbose,
              });
            },
          },
        ],
      },
      import_sync: {
        label: "Sync sheets and assets then import deployment",
        options: [
          {
            flags: "-s, --skip-download",
            description: "Skip download and just process local sheets and assets",
          },
          {
            flags: "-v, --verbose",
            description: "Show all logs",
          },
        ],
        steps: [
          {
            name: "import_sync",
            function: async ({ tasks, args, options }) => {
              const sourcePath = args[0];
              if (!sourcePath) {
                throw new Error("Source path is required");
              }
              await tasks.beta.importExternalDeployment(sourcePath, {
                sync: true,
                skipDownload: !!options.skipDownload,
                verbose: !!options.verbose,
              });
            },
          },
        ],
      },
      sync_sheets: {
        label: "Sync sheets to external deployment",
        options: [
          {
            flags: "-s, --skip-download",
            description: "Skip download and just process local sheets",
          },
          {
            flags: "-v, --verbose",
            description: "Show all logs",
          },
        ],
        steps: [
          {
            name: "sync_sheets",
            function: async ({ tasks, options }) => {
              await tasks.beta.syncExternalSheets({
                skipDownload: !!options.skipDownload,
                verbose: !!options.verbose,
              });
            },
          },
        ],
      },
      sync_assets: {
        label: "Sync assets to external deployment",
        options: [
          {
            flags: "-s, --skip-download",
            description: "Skip download and just process local assets",
          },
          {
            flags: "-v, --verbose",
            description: "Show all logs",
          },
        ],
        steps: [
          {
            name: "sync_assets",
            function: async ({ tasks, options }) => {
              await tasks.beta.syncExternalAssets({
                skipDownload: !!options.skipDownload,
                verbose: !!options.verbose,
              });
            },
          },
        ],
      },
    },
  },
};

export default workflows;
