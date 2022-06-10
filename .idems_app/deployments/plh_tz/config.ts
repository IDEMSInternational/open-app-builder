import { extendConfig } from "data-models/deployment.model";
import PARENT_CONFIG from "../plh/config";

const config = extendConfig(PARENT_CONFIG);
config.name = "plh_tz";
config.app_data.sheets_filter_function = (flow) =>
  !["debug", "component_demo", "example_hardcoded", "campaign_rows_debug"].includes(
    flow.flow_subtype
  );
config.translations.filter_language_codes = ["tz_en", "tz_sw"];

// Override constants
config.app_constants.APP_LANGUAGES.default = "tz_en";
config.app_constants.APP_SIDEMENU_DEFAULTS.title = "ParentApp (TZ)";
config.app_constants.APP_AUTHENTICATION_DEFAULTS.enforceLogin = true;


export default config;
