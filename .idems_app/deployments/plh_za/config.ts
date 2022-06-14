import {extendDeploymentConfig} from 'scripts'

const config = extendDeploymentConfig("plh_global");
config.name = "plh_za";
config.google_drive.sheets_folder_id="1_-mSeISZQXrD6dmVnruFT9LfRjozYcBk"
// TODO - this is currently the same as the parent, needs consideration
config.google_drive.assets_folder_id="1dp9QAQ84m8pm0IBQTSPXe1ramyynKPNn"
config.google_drive.assets_filter_function = (entry)=>entry.folderPath.startsWith('za_')
config.app_data.sheets_filter_function = (flow) =>
  !["debug", "component_demo", "example_hardcoded", "campaign_rows_debug"].includes(
    flow.flow_subtype as string
  );
config.translations.filter_language_codes = ["za_en", "za_zu", "za_xh", "za_tn", "za_st", "za_af"];

// Override constants
config.app_constants.APP_LANGUAGES.default = "za_en";
config.app_constants.APP_SIDEMENU_DEFAULTS.title = "ParentApp (ZA)";

export default config;