import { generateDeploymentConfig } from "scripts";
const config = generateDeploymentConfig("sandbox")

config.google_drive = {
  sheets_folder_id: "1f4M6vPKUI3ifPzb1V_mOPbAGUsLzapmL",
  assets_folder_id: "1K_7bFwjtyXzRyfFqwOoLjpPPieV_zCtj",
}
// Override any app constants here
config.app_config.APP_HEADER_DEFAULTS.title = "Sandbox"
config.app_config.APP_SIDEMENU_DEFAULTS.title = "Sandbox"
  
export default config;
