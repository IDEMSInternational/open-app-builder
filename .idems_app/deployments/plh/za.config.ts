import { extendConfig } from "data-models/deployment.model";
import PARENT_CONFIG from "./global.config";

/** ZA config extends the default config **/

const config = extendConfig(PARENT_CONFIG);
config.name = "plh_za";
config.app_data.sheets_filter_function = (flow) =>
  !["debug", "component_demo", "example_hardcoded", "campaign_rows_debug"].includes(
    flow.flow_subtype
  );
config.translations.filter_language_codes = ["za_en", "za_zu", "za_xh", "za_tn", "za_st", "za_af"];

// Override constants
config.app_constants.APP_LANGUAGES.default = "za_en";
config.app_constants.APP_SIDEMENU_DEFAULTS.title = "ParentApp (ZA)";

export default config;
