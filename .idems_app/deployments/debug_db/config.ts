import { generateDeploymentConfig } from "scripts";
const config = generateDeploymentConfig("debug_db")

config.google_drive = {
  sheets_folder_id: "",
  assets_folder_id: "",
}
// Override any app constants here
config.app_config.APP_HEADER_DEFAULTS.title = "debug_db"
config.app_config.APP_SIDEMENU_DEFAULTS.title = "debug_db"
  
export default config;