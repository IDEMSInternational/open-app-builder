import { cloneConfig } from "data-models/deployment.model";
import DEFAULT_CONFIG from "./global.config";
import { SKINS } from "./skins";

/** TZ config extends the default config **/

const config = cloneConfig(DEFAULT_CONFIG);
config.name = "plh_debug";

// Override constants
config.app_config!.APP_SKINS!.defaultSkinName = SKINS.debug.name;
config.app_config!.APP_SKINS!.available = [SKINS.modular, SKINS.weekly_workshop, SKINS.debug];

export default config;
