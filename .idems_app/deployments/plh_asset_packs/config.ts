import { extendDeploymentConfig } from "scripts";
import { Logger } from "scripts/src/utils";

const config = extendDeploymentConfig({ name: "plh_asset_packs", parent: "plh" });
// override app constants here
config.app_config.APP_HEADER_DEFAULTS.title = "plh_asset_packs";
config.app_config.APP_SIDEMENU_DEFAULTS.title = "plh_asset_packs";

config.app_config.ASSET_PACKS = {
  enabled: true,
  bucketName: "plh_asset_packs",
  folderName: "asset-packs",
};

// set supabase config if decrypted values available
try {
  const supabaseConfig = require("./encrypted/supabaseConfig.json");
  config.supabase = { ...supabaseConfig, enabled: true };
} catch {
  Logger.error({
    msg1: "Deployment config requires encrypted data",
    msg2: "Decrypt config in order to access supabase functionality",
    logOnly:true
  });
}

export default config;
