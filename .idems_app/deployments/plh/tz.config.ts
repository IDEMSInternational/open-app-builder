import DEFAULT_CONFIG from "./default.config";

/** ZA config extends the default config **/

const config = DEFAULT_CONFIG;
config.name = "PLH TZ";
config.app_data.sheets_filter_function = (flow) => !["debug"].includes(flow.flow_subtype);
config.translations.filter_language_codes = ["tz_sw"];

export default config;
