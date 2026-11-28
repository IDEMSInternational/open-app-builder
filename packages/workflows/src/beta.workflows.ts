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
          if (!childWorkflow || !childWorkflows?.[childWorkflow]) {
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
            description: "Skip download of assets and just process local assets",
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
      sync_flow_files: {
        label:
          "Process flow jsons that changed in the external deployment app_data/sheets folder (no download)",
        options: [
          {
            flags: "-a, --all",
            description: "Process all flow jsons, not just changed ones",
          },
          {
            flags: "-v, --verbose",
            description: "Show all logs",
          },
        ],
        steps: [
          {
            name: "sync_flow_files",
            function: async ({ tasks, options }) => {
              tasks.beta.syncFlowFiles({ refreshAll: !!options.all, verbose: !!options.verbose });
            },
          },
        ],
      },
      refresh_all: {
        label:
          "Re-process all flow jsons in the external deployment app_data/sheets folder, without downloads or cached data",
        options: [
          {
            flags: "-v, --verbose",
            description: "Show all logs",
          },
        ],
        steps: [
          {
            name: "refresh_all",
            function: async ({ tasks, options }) => {
              tasks.beta.syncFlowFiles({ refreshAll: true, verbose: !!options.verbose });
            },
          },
        ],
      },
      sync_fixed_sheets: {
        label: "Sync sheets to external deployment",
        steps: [
          {
            name: "sync_fixed_sheets",
            function: async ({ tasks }) => {
              await tasks.beta.syncFixedSheets();
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
      sync_transient_sheets: {
        label: "Sync sheets created from flows (open_sheet/create_sheet) and process into the app",
        steps: [
          {
            name: "sync_transient_sheets",
            function: async ({ tasks }) => {
              await tasks.beta.syncTransientSheets();
            },
          },
        ],
      },
      update_translations: {
        label:
          "Extract strings to translate from the external flows to app_data/translations/source/<language>/*.pot",
        options: [
          {
            flags: "--split-by-subtype",
            description:
              "Write strings from flows with a flow_subtype to <flow_subtype>.pot (others to main.pot)",
          },
          {
            flags: "-v, --verbose",
            description: "Show all logs",
          },
        ],
        steps: [
          {
            name: "update_translations",
            function: async ({ tasks, options }) => {
              tasks.beta.updateTranslations({
                splitBySubtype: !!options.splitBySubtype,
                verbose: !!options.verbose,
              });
            },
          },
        ],
      },
      sync_translations: {
        label:
          "Re-process all external flows with the latest translations (app_data/translations/translated)",
        options: [
          {
            flags: "-v, --verbose",
            description: "Show all logs",
          },
        ],
        steps: [
          {
            name: "sync_translations",
            function: async ({ tasks, options }) => {
              tasks.beta.syncTranslations({ verbose: !!options.verbose });
            },
          },
        ],
      },
      open_sheet: {
        label: "Open the google sheet for a flow, creating one if it has no _source",
        options: [
          {
            flags: "-t, --type <flow_type>",
            description: "Only match flows of this type",
          },
          {
            flags: "-f, --folder <folder_id>",
            description:
              "Drive folder to create the transient sheets folder in, if it is created (default: My Drive)",
          },
        ],
        steps: [
          {
            name: "open_sheet",
            function: async ({ tasks, args, options }) => {
              const flowName = args[0];
              if (!flowName) throw new Error("Flow name is required");
              await tasks.beta.openFlowSheet(flowName, {
                flowType: options.type as string,
                folderId: options.folder as string,
              });
            },
          },
        ],
      },
      create_sheet: {
        label:
          "Create a google sheet from one or more flow jsons (one ==content_list== and a tab per flow)",
        options: [
          {
            flags: "-t, --type <flow_type>",
            description: "Only match flows of this type",
          },
          {
            flags: "-f, --folder <folder_id>",
            description:
              "Drive folder to create the transient sheets folder in, if it is created (default: My Drive)",
          },
          {
            flags: "-n, --name <sheet_name>",
            description: "Name of the new sheet (default: the first flow name)",
          },
        ],
        steps: [
          {
            name: "create_sheet",
            function: async ({ tasks, args, options }) => {
              const flowNames = positionalArgs(args);
              if (flowNames.length === 0) throw new Error("At least one flow name is required");
              await tasks.beta.createFlowSheet(flowNames, {
                flowType: options.type as string,
                folderId: options.folder as string,
                sheetName: options.name as string,
              });
            },
          },
        ],
      },
      remove_transient_sheet: {
        label:
          "Delete the transient sheet of a flow (or ALL) from google drive and unlink it from the app",
        options: [
          {
            flags: "-t, --type <flow_type>",
            description: "Only match flows of this type",
          },
          {
            flags: "--folder <folder>",
            description:
              "Remove the sheet created for a folder (relative to app_data/sheets) instead of a flow",
          },
        ],
        steps: [
          {
            name: "remove_transient_sheet",
            function: async ({ tasks, args, options }) => {
              const [flowName] = positionalArgs(args);
              const folder = options.folder as string | undefined;
              if (!flowName && !folder) throw new Error("Flow name (or ALL) is required");
              await tasks.beta.removeTransientSheet(flowName, {
                flowType: options.type as string,
                folder,
              });
            },
          },
        ],
      },
      dev_server: {
        label: "Start a local server so the app can run beta commands (e.g. open sheets)",
        options: [
          {
            // No short flag, as `-p` is used by the workflow runner for `--parent`
            flags: "--port <port>",
            description: "Port to listen on (default 3010)",
          },
        ],
        steps: [
          {
            name: "dev_server",
            function: async ({ tasks, options }) => {
              tasks.beta.startDevServer({ port: Number(options.port) || undefined });
              // Keep the workflow running until the process is stopped
              await new Promise(() => {});
            },
          },
        ],
      },
    },
  },
};

/**
 * Positional values from workflow args, which also contain the raw option flags.
 * Assumes every option takes a value, e.g. `a b -t template c` => `["a", "b", "c"]`
 */
function positionalArgs(args: string[] = []) {
  const values: string[] = [];
  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg.startsWith("-")) {
      if (!arg.includes("=")) i++;
      continue;
    }
    values.push(arg);
  }
  return values;
}

export default workflows;
