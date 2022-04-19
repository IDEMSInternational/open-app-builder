import { IDeploymentConfig } from "data-models";
import { DEFAULT_CONSTANTS } from "data-models";

/**
 * The default config should ideally be a superset of any extended configs
 * to allow for easier post-processing
 */
const config: IDeploymentConfig = {
  name: "early_family_math",
  google_drive: {
    sheets_folder_id: "1hiIYr8nnLcP1kd2xTFAQx3MvVp7IlPQL",
    assets_folder_id: "1VkoezEbbeCIeV5IksorFt5lFp6AURYur",
  },
  translations: {
    filter_language_codes: ["us_en"],
    translated_strings_path: "packages/app-data/translations_source/from_translators",
    source_strings_path: "packages/app-data/translations_source/to_translate",
  },
  app_constants: DEFAULT_CONSTANTS,
};
// Override constants
config.app_constants.APP_LANGUAGES.default = "us_en";
config.app_constants.APP_HEADER_DEFAULTS.title = "Early Family Math";
config.app_constants.APP_SIDEMENU_DEFAULTS.title = "EFM";
config.app_constants.NOTIFICATION_DEFAULTS.text = "You have a new message from Early Family Math";

export default config;
