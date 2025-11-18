import type { IDeploymentWorkflows } from "./workflow.model";

/** Sheet editing workflows */
const workflows: IDeploymentWorkflows = {
  edit_sheet_authorize: {
    label: "Authorize Google Sheets access for editing",
    steps: [
      {
        name: "authorize_sheets",
        function: async ({ tasks }) => {
          // Use the gdrive task authorize method which will get the expanded permissions
          await tasks.gdrive.authorize();
          process.exit(0);
        },
      },
    ],
  },
  edit_sheet: {
    label: "Edit external deployment sheets",
    steps: [
      {
        name: "edit_sheet_main",
        function: async ({ args, tasks }) => {
          // Parse arguments to determine action and path
          const [pathParam] = args || [];

          if (!pathParam) {
            console.log(
              "Usage:",
              "\n" +
                "yarn workflow edit_sheet <folder_or_file_path> - Create Google Sheet from JSON files\n" +
                "yarn workflow edit_sheet update <folder_or_file_path> - Update JSON files from Google Sheet\n" +
                "\n" +
                "Examples:\n" +
                "yarn workflow edit_sheet data_list/lifecycle_actions - Edit entire lifecycle_actions folder\n" +
                "yarn workflow edit_sheet data_list/launch_actions.json - Edit single file\n" +
                "yarn workflow edit_sheet update data_list/lifecycle_actions - Update from sheet changes\n"
            );
            return;
          }

          if (pathParam === "update") {
            // Handle update command
            const [, actualPath] = args || [];
            if (!actualPath) {
              throw new Error("Please specify the folder or file path to update");
            }
            return await tasks.sheetEditor.updateJsonFromSheet(actualPath, tasks.gdrive);
          } else {
            // Handle create command (default)
            return await tasks.sheetEditor.createSheetFromJson(pathParam, tasks.gdrive);
          }
        },
      },
    ],
  },
};

export default workflows;
