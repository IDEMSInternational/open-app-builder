import { IDeploymentConfig } from "data-models";
import { DEFAULT_CONSTANTS } from "data-models";

/**
 * The default config should ideally be a superset of any extended configs
 * to allow for easier post-processing
 */
const config: IDeploymentConfig = {
  name: "plh_global",
  app_constants: DEFAULT_CONSTANTS,
  google_drive: {
    sheets_folder_id: "1n221Zv9LYuwxmjhiboq8vhQg67_K9L5f",
    assets_folder_id: "1dp9QAQ84m8pm0IBQTSPXe1ramyynKPNn",
  },
  // Legacy mapping to output to existing workspace
  app_data: {
    sheets_output_path: "packages/app-data/sheets",
    assets_output_path: "packages/app-data/assets",
    translations_output_path: "packages/app-data/translations",
  },
  translations: {
    translated_strings_path: "packages/app-data/translations_source/from_translators",
    source_strings_path: "packages/app-data/translations_source/to_translate",
  },
  workflows: ["default.workflows.ts"],
};
export default config;
