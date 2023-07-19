import { extendDeploymentConfig } from "scripts";

/** TZ config extends the default config **/
const config = extendDeploymentConfig({ name: "plh_tz", parent: "plh" });

config.app_data!.sheets_filter_function = (flow) =>
  !["debug", "component_demo", "example_hardcoded", "campaign_rows_debug"].includes(
    flow.flow_subtype!
  );
config.translations!.filter_language_codes = ["tz_en", "tz_sw"];

// Override constants
config.app_config!.APP_LANGUAGES!.default = "tz_sw";
config.app_config!.APP_SIDEMENU_DEFAULTS!.title = "ParentApp (TZ)";
config.app_config!.APP_AUTHENTICATION_DEFAULTS!.enforceLogin = true;
config.error_logging = { dsn: "https://1bfed3b77f4e4a0f9b55b510915c7f1c@app.glitchtip.com/2233" };

export default config;
