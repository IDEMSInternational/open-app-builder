import { extendDeploymentConfig } from "scripts";
import { SKINS } from "../plh/skins";

/** Debug config extends the global config **/
const config = extendDeploymentConfig({ name: "plh_debug", parent: "plh" });

config.name = "plh_debug";

// Override constants
config.app_config.APP_SKINS.defaultSkinName = SKINS.debug.name;
// Limit available skins to only include debug skin, to force this skin to be applied on init
config.app_config.APP_SKINS.available = [SKINS.debug];

config.app_config.MIGRATION_ACTIONS={
  enabled:true,
  dataListName:'app_version_actions'
}

export default config;
