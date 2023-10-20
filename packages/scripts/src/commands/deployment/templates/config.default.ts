export default (name: string) =>
  `
import { generateDeploymentConfig } from "scripts";
const config = generateDeploymentConfig("${name}")

config.google_drive = {
  sheets_folder_ids: [""],
  assets_folder_ids: [""],
}
// Override any app constants here
config.app_config.APP_HEADER_DEFAULTS.title = "${name}"
config.app_config.APP_SIDEMENU_DEFAULTS.title = "${name}"
  
export default config;
`.trim();
