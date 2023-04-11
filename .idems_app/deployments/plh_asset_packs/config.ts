import { extendDeploymentConfig } from "scripts";
import { supabaseConfig } from "./encrypted/supabaseConfig";

const config = extendDeploymentConfig({ name: "plh_asset_packs", parent: "plh" });
// override app constants here
config.app_config.APP_HEADER_DEFAULTS.title = "plh_asset_packs";
config.app_config.APP_SIDEMENU_DEFAULTS.title = "plh_asset_packs";

config.app_config.ASSET_PACKS.enabled = true
config.app_config.ASSET_PACKS.bucketName = "asset-packs"

config.app_config.SUPABASE.enabled = true
config.app_config.SUPABASE.url = supabaseConfig.url
config.app_config.SUPABASE.publicApiKey = supabaseConfig.publicApiKey

export default config;