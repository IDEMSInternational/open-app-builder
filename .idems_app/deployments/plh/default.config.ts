import { IDeploymentConfig } from "data-models";

/**
 * The default config should ideally be a superset of any extended configs
 * to allow for easier post-processing
 */
const config: IDeploymentConfig = {
  name: "PLH",
  google_drive: {
    sheets_folder_id: "1n221Zv9LYuwxmjhiboq8vhQg67_K9L5f",
    assets_folder_id: "1dp9QAQ84m8pm0IBQTSPXe1ramyynKPNn",
    // exclude anything in an 'old' folder, e.g. sheets/core/old/navigation
    sheets_filter_function: (gdriveEntry) =>
      !gdriveEntry.folderPath
        .split("/")
        .map((folder) => folder.toLowerCase())
        .includes("old"),
  },
  // Legacy mapping to output to existing workspace
  app_data: {
    sheets_output_path: "packages/app-data/data",
    assets_output_path: "packages/app-data/assets",
  },
  translations: {
    translated_strings_path: "packages/app-data/translations/from_translators",
    source_strings_path: "packages/app-data/translations/to_translate",
  },
};
export default config;
