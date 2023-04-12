import { extendDeploymentConfig } from "scripts";

const config = extendDeploymentConfig({ name: "plh_asset_packs", parent: "plh" });
// override app constants here
config.app_config.APP_HEADER_DEFAULTS.title = "plh_asset_packs";
config.app_config.APP_SIDEMENU_DEFAULTS.title = "plh_asset_packs";

config.app_config.ASSET_PACKS.enabled = true
config.app_config.ASSET_PACKS.bucketName = "plh_asset_packs"
config.app_config.ASSET_PACKS.folderName = "asset-packs"

try {
  const supabaseConfig = require("./encrypted/supabaseConfig.json")
  config.app_config.SUPABASE.enabled = true
  config.app_config.SUPABASE.url = supabaseConfig.url
  config.app_config.SUPABASE.publicApiKey = supabaseConfig.publicApiKey
} catch {
  console.log("Deployment config requires encrypted data. Decrypt config in order to access supabase functionality.")
}


export default config;