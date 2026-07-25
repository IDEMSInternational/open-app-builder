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
    },
  },
};

export default workflows;
