import { IDeploymentConfig } from "data-models";

/**
 * The default config should ideally be a superset of any extended configs
 * to allow for easier post-processing
 */
const config: IDeploymentConfig = {
  name: "Early Family Math",
  google_drive: {
    sheets_folder_id: "1hiIYr8nnLcP1kd2xTFAQx3MvVp7IlPQL",
    assets_folder_id: "1VkoezEbbeCIeV5IksorFt5lFp6AURYur",
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
