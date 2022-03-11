import DEFAULT_CONFIG from "./default.config";

/** ZA config extends the default config **/

const config = DEFAULT_CONFIG;
config.name = "plh_za";
config.app_data.sheets_filter_function = (flow) => !["debug"].includes(flow.flow_subtype);
config.app_constants = { APP_LANGUAGES: { default: "za_en" } };
config.translations.filter_language_codes = ["za_en, za_zu", "za_xh", "za_tn", "za_st", "za_af"];

export default config;
