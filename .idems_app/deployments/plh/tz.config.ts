import DEFAULT_CONFIG from "./default.config";

/** TZ config extends the default config **/

const config = DEFAULT_CONFIG;
config.name = "plh_tz";
config.app_data.sheets_filter_function = (flow) => !["debug"].includes(flow.flow_subtype);
config.translations.filter_language_codes = ["tz_en", "tz_sw"];

// Override constants
config.app_constants.APP_LANGUAGES.default = "tz_en";
config.app_constants.APP_SIDEMENU_DEFAULTS.title = "ParentApp (TZ)";

export default config;
