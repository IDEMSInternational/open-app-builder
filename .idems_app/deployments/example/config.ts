import { generateDeploymentConfig } from "scripts";

const config = generateDeploymentConfig("example");

config.google_drive=  {
  sheets_folder_id: "",
  assets_folder_id: "",
}

// Override any app constants here
config.app_constants.APP_HEADER_DEFAULTS.title = 'Example Deployment'
config.app_constants.APP_SIDEMENU_DEFAULTS.title = 'Example Deployment'

export default config;
