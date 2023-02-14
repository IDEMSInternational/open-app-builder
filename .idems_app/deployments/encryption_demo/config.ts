import { generateDeploymentConfig } from "scripts";
const config = generateDeploymentConfig("encryption_demo")

config.google_drive = {
  sheets_folder_id: "",
  assets_folder_id: "",
}
// Override any app constants here
config.app_config.APP_HEADER_DEFAULTS.title = "encryption_demo"
config.app_config.APP_SIDEMENU_DEFAULTS.title = "encryption_demo"
  
export default config;