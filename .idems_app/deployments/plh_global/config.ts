import { generateDeploymentConfig } from "scripts";

const config = generateDeploymentConfig("plh_global");

config.google_drive= {
  sheets_folder_id: "1n221Zv9LYuwxmjhiboq8vhQg67_K9L5f",
  assets_folder_id: "1dp9QAQ84m8pm0IBQTSPXe1ramyynKPNn",
  /* TODO - may need to reconsider how best to organise/filter global vs deployment assets */
  assets_filter_function: (entry)=>entry.folderPath.startsWith('global')
},
config.translations= {
  translated_strings_path: "packages/app-data/translations_source/from_translators",
  source_strings_path: "packages/app-data/translations_source/to_translate",
},
config._version= 1.0,

config.app_constants.APP_LANGUAGES.default = "gb_en";
config.app_constants.APP_SIDEMENU_DEFAULTS.title = "ParentApp";
config.app_constants.APP_HEADER_DEFAULTS.title = "ParentApp";
config.app_constants.NOTIFICATION_DEFAULTS.title = "New message from PLH";
config.app_constants.NOTIFICATION_DEFAULTS.text = "You have a new message from ParentApp";


export default config;
