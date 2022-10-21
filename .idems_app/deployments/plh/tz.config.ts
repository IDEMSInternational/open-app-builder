import { cloneConfig } from "data-models/deployment.model";
import DEFAULT_CONFIG from "./global.config";

/** TZ config extends the default config **/

const config = cloneConfig(DEFAULT_CONFIG);
config.name = "plh_tz";
config.app_data.sheets_filter_function = (flow) =>
  !["debug", "component_demo", "example_hardcoded", "campaign_rows_debug"].includes(
    flow.flow_subtype
  );
config.translations.filter_language_codes = ["tz_en", "tz_sw"];

// Override constants
config.app_config.APP_LANGUAGES.default = "tz_sw";
config.app_config.APP_SIDEMENU_DEFAULTS.title = "ParentApp (TZ)";
config.app_config.APP_AUTHENTICATION_DEFAULTS.enforceLogin = true;

export default config;
