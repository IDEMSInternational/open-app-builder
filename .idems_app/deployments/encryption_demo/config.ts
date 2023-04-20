import { generateDeploymentConfig } from "scripts";
const config = generateDeploymentConfig("encryption_demo")

config.google_drive = {
  sheets_folder_id: "",
  assets_folder_id: "",
}

// Override any app constants here
config.app_config.APP_HEADER_DEFAULTS.title = "encryption_demo"
config.app_config.APP_SIDEMENU_DEFAULTS.title = "encryption_demo"

// Example - assign config from encrypted if available
// Includes fallback if developer does not have private key access

try {
  config.error_logging = require('./encrypted/error-logging.json')
} catch (error) {
  config.error_logging = {dsn:''}
}

// Alternatively if not using try-catch, the user will need to decrypt before setting active
/* 
  ```
  yarn workflow deployment decrypt encryption_demo
  yarn workflow deployment set encryption_demo
  ```
*/ 
  
export default config;