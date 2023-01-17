import { IDeploymentConfig } from "data-models";
import { getDefaultAppConfig } from "data-models";

const config: IDeploymentConfig = {
  name: "perinatal",
  google_drive: {
    sheets_folder_id: "",
    assets_folder_id: "",
  },
  app_data: {},
  translations: {
    translated_strings_path: "packages/app-data/translations_source/from_translators",
    source_strings_path: "packages/app-data/translations_source/to_translate",
  },
  app_config: getDefaultAppConfig(),
};
// Override constants
config.app_config!.APP_HEADER_DEFAULTS!.title = "Perinatal";
config.app_config!.APP_SIDEMENU_DEFAULTS!.title = "Perinatal";
config.app_config!.NOTIFICATION_DEFAULTS!.text = "You have a new message from Perinatal";

export default config;
