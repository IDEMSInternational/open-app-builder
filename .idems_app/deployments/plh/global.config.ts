import { IDeploymentConfig } from "data-models";
import { getDefaultAppConstants } from "data-models/constants";

const app_constants = getDefaultAppConstants();

/**
 * The default config should ideally be a superset of any extended configs
 * to allow for easier post-processing
 */
const config: IDeploymentConfig = {
  name: "plh_global",
  app_constants,
  google_drive: {
    sheets_folder_id: "1n221Zv9LYuwxmjhiboq8vhQg67_K9L5f",
    assets_folder_id: "1dp9QAQ84m8pm0IBQTSPXe1ramyynKPNn",
  },
  app_data: {
    android_assets_subpath: "global/android"
  },
  translations: {
    translated_strings_path: "packages/app-data/translations_source/from_translators",
    source_strings_path: "packages/app-data/translations_source/to_translate",
  },
  _version: 1.0,
};

config.app_constants.APP_LANGUAGES.default = "gb_en";
config.app_constants.APP_SIDEMENU_DEFAULTS.title = "ParentApp";
config.app_constants.APP_HEADER_DEFAULTS.title = "ParentApp";
config.app_constants.NOTIFICATION_DEFAULTS.title = "New message from PLH";
config.app_constants.NOTIFICATION_DEFAULTS.text = "You have a new message from ParentApp";

export default config;
