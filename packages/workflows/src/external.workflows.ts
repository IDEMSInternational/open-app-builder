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
    },
  },
};

export default workflows;
