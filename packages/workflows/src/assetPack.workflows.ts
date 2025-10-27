import type { IDeploymentWorkflows } from "./workflow.model";
import path from "path";

const childWorkflows: IDeploymentWorkflows = {
  generate: {
    label: "Generate asset pack configuration",
    steps: [
      // Prompt folder path if not specified
      {
        name: "folder path",
        condition: async ({ args }) => !args[0],
        function: async ({ tasks, args }) => {
          const folderPath = await tasks.userInput.promptInput("Enter folder path:");
          args[0] = folderPath;
        },
      },
      // Prompt asset pack name if not specified
      {
        name: "asset pack name",
        condition: async ({ args }) => !args[1],
        function: async ({ tasks, args }) => {
          const folderPath = args[0];
          const defaultName = path.basename(folderPath);
          const assetPackName = await tasks.userInput.promptInput(
            `Enter asset pack name:`,
            defaultName
          );
          args[1] = assetPackName;
        },
      },
      {
        name: "generate",
        function: async ({ tasks, args, config }) => {
          const folderPath = args[0];
          const assetPackName = args[1];
          return tasks.assetPack.generate({ folderPath, assetPackName });
        },
      },
    ],
  },
};

/** Default workflows made available to all deployments */
const defaultWorkflows: IDeploymentWorkflows = {
  asset_pack: {
    label: `Run asset pack workflows: ${Object.keys(childWorkflows).join(",")}`,
    // default workflow runs all child workflows
    steps: [
      {
        name: "Generate Asset Pack",
        function: async ({ tasks, workflow }) =>
          await tasks.workflow.runWorkflow({ name: "asset_pack generate", parent: workflow }),
      },
    ],
    children: childWorkflows,
  },
};

export default defaultWorkflows;
