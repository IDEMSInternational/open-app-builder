import DEFAULT_CONFIG from "./default.config";

/** ZA config extends the default config **/

const config = DEFAULT_CONFIG;
config.name = "plh_tz";
config.app_data.sheets_filter_function = (flow) => !["debug"].includes(flow.flow_subtype);
config.translations.filter_language_codes = ["za_zu", "za_xh", "za_tn", "za_st", "za_af"];

export default config;
