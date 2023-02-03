import { generateDeploymentConfig } from "scripts";
const config = generateDeploymentConfig("perinatal");

config.google_drive = {
  sheets_folder_id: "1LyMSXxi0FN5iAZQL5ySLBW56jmDqVabU",
  assets_folder_id: "1sqW2TdYXALIlvBnWlU-XT90BpllkLrGs",
};
config.error_logging = {
  dsn: "https://d2a84a6e88b24a7199736d4d153c0a7a@app.glitchtip.com/2443",
};

// Override constants
config.app_config.APP_HEADER_DEFAULTS.title = "Perinatal App";
config.app_config.APP_SIDEMENU_DEFAULTS.title = "Perinatal App";
config.app_config.NOTIFICATION_DEFAULTS.title = "New message from Perinatal App";
config.app_config.NOTIFICATION_DEFAULTS.text = "You have a new message from Perinatal App";

export default config;
