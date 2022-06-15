import { extendDeploymentConfig } from "scripts";

const config = extendDeploymentConfig({ name: "plh_tz", parent: "plh_global" });

config.google_drive.sheets_folder_id = "10Vj5UJbKRK33_82U7BQ8gj7DQzP7f_NA";
// TODO - this is currently the same as the parent, needs consideration
config.google_drive.assets_folder_id = "1dp9QAQ84m8pm0IBQTSPXe1ramyynKPNn";
config.google_drive.assets_filter_function = (entry) => entry.folderPath.startsWith("tz_");
config.app_data.sheets_filter_function = (flow) =>
  !["debug", "component_demo", "example_hardcoded", "campaign_rows_debug"].includes(
    flow.flow_subtype as string
  );
config.translations.filter_language_codes = ["tz_en", "tz_sw"];

// Override constants
config.app_constants.APP_LANGUAGES.default = "tz_en";
config.app_constants.APP_SIDEMENU_DEFAULTS.title = "ParentApp (TZ)";
config.app_constants.APP_AUTHENTICATION_DEFAULTS.enforceLogin = true;

export default config;
