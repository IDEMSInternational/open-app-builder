import { generateDeploymentConfig } from "scripts";
const config = generateDeploymentConfig("parentapp_kids");
import { SKINS } from "./../plh/skins";

config.google_drive = {
  sheets_folder_id: "1Y8uC9-rqQtsjQgUfeX9qp-vNzsFDUQFU",
  assets_folder_id: "1abaL1QGd33NqqLoKuo2t9fVWKmh5ouM9",
};
config.android = {
  splash_asset_path: "packages/app-data/assets/global/android/splash.png",
  icon_asset_path: "packages/app-data/assets/global/android/icon.png",
  icon_asset_foreground_path: "packages/app-data/assets/global/android/icon-foreground.png",
  icon_asset_background_path: "packages/app-data/assets/global/android/icon-background.png",
};
config.translations = {
  translated_strings_path: "packages/app-data/translations_source/from_translators",
  source_strings_path: "packages/app-data/translations_source/to_translate",
}
// Override any app constants here
config.app_config.APP_HEADER_DEFAULTS.title = "ParentApp for Kids"
config.app_config.APP_SIDEMENU_DEFAULTS.title = "ParentApp for Kids"
config.app_config.APP_LANGUAGES.default = "gb_en";
config.app_config.NOTIFICATION_DEFAULTS.title = "New message from ParentApp for Kids";
config.app_config.NOTIFICATION_DEFAULTS.text = "You have a new message from ParentApp for Kids";
config.app_config.APP_SKINS.defaultSkinName = SKINS.modular.name;
config.app_config.APP_SKINS.available = [SKINS.modular, SKINS.weekly_workshop];
config.app_config.APP_THEMES.available = ["default", "professional"];
  
export default config;