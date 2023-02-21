import { extendDeploymentConfig } from "scripts";

/** ZA config extends the default config **/
const config = extendDeploymentConfig({ name: "plh_za", parent: "plh" });

config.app_data!.sheets_filter_function = (flow) =>
  !["debug", "component_demo", "example_hardcoded", "campaign_rows_debug"].includes(
    flow.flow_subtype!
  );
config.translations!.filter_language_codes = ["za_en", "za_zu", "za_xh", "za_tn", "za_st", "za_af"];

// Override constants
config.app_config!.APP_LANGUAGES!.default = "za_en";
config.app_config!.APP_SIDEMENU_DEFAULTS!.title = "ParentApp (ZA)";

config.error_logging!.dsn='https://45f6a26d9dfd494d844a980c6881c35f@app.glitchtip.com/2437'
export default config;
