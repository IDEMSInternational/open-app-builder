import type { IDeploymentWorkflows } from "./workflow.model";
/** Default workflows made available to all deployments */
const workflows: IDeploymentWorkflows = {
  deployment: {
    steps: [
      {
        name: "",
        function: async ({ args }) => {
          const [childWorkflow] = args;
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
      import: {
        label: "Import a remote deployment repository",
        steps: [
          {
            name: "deployment import",
            function: async ({ tasks, args }) => tasks.git().importRemoteRepo(args[0]),
          },
          {
            name: "set_deployment",
            function: async ({ tasks, workflow }) =>
              tasks.workflow.runWorkflow({ name: "deployment set", parent: workflow }),
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
          {
            name: "refresh_remote_content",
            function: async ({ tasks, config }) => {
              if (config.git?.content_repo) {
                await tasks.git().refreshRemoteRepo();
              }
            },
          },
          {
            name: "copy_app_data",
            function: async ({ tasks }) => {
              tasks.appData.copyDeploymentDataToApp();
            },
          },
        ],
      },
    },
  },
};

export default workflows;
