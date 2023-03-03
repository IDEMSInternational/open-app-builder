import { extendDeploymentConfig } from "scripts";
import { SKINS } from "../plh/skins";

/** Debug config extends the global config **/
const config = extendDeploymentConfig({ name: "plh_debug", parent: "plh" });

config.name = "plh_debug";

// Override constants
config.app_config.APP_SKINS.defaultSkinName = SKINS.debug.name;
// Limit available skins to only include debug skin, to force this skin to be applied on init
config.app_config.APP_SKINS.available = [SKINS.debug];

// Filter themes and languages to minimize bundle size
config.app_config.APP_THEMES.available = ["default"]
config.translations!.filter_language_codes = ["gb_en"];

config.app_config.APP_UPDATES.enabled = true
config.app_config.APP_UPDATES.forceUpdate = false
config.app_config.APP_UPDATES.completeUpdateTemplate = "complete_app_update"

export default config;
