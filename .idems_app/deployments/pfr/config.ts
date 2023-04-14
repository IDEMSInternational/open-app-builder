import { generateDeploymentConfig } from "scripts";
const config = generateDeploymentConfig("pfr")

config.google_drive = {
  sheets_folder_id: "1NCaqs4T3sbFVV0jh_aTmbeSI517WchVv",
  assets_folder_id: "1gFEuVLP4r2FVLTuPSMMul5RxhGpYy8TU",
}
config.error_logging = {
  dsn: "https://b28164f40cf444d5860c68ce3c66c362@app.glitchtip.com/2975",
};

// Override any app constants here
config.app_config.APP_SIDEMENU_DEFAULTS.title = "Parenting for Respectability";
config.app_config.APP_HEADER_DEFAULTS.title = "Parenting for Respectability";
config.app_config.NOTIFICATION_DEFAULTS.title = "New message from Parenting for Respectability";
config.app_config.NOTIFICATION_DEFAULTS.text = "You have a new message from Parenting for Respectability";

export default config;