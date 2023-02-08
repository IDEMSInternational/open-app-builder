import { generateDeploymentConfig } from "scripts";
const config = generateDeploymentConfig("plh");
import { SKINS } from "./skins";

/**
 * The default config should ideally be a superset of any extended configs
 * to allow for easier post-processing
 */

config.google_drive = {
  sheets_folder_id: "1n221Zv9LYuwxmjhiboq8vhQg67_K9L5f",
  assets_folder_id: "1dp9QAQ84m8pm0IBQTSPXe1ramyynKPNn",
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
};
config.error_logging = {
  dsn: "https://a8b2897d48e84c5fa4398b4eb6158480@app.glitchtip.com/2230",
};

config.app_config.APP_LANGUAGES.default = "gb_en";
config.app_config.APP_SIDEMENU_DEFAULTS.title = "ParentApp";
config.app_config.APP_HEADER_DEFAULTS.title = "ParentApp";
config.app_config.NOTIFICATION_DEFAULTS.title = "New message from PLH";
config.app_config.NOTIFICATION_DEFAULTS.text = "You have a new message from ParentApp";
config.app_config.APP_SKINS.defaultSkinName = SKINS.weekly_workshop.name;
config.app_config.APP_SKINS.available = [SKINS.modular, SKINS.weekly_workshop];
config.app_config.APP_THEMES.available = ["default", "professional"];

export default config;
