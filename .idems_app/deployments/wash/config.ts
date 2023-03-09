import { generateDeploymentConfig } from "scripts";
const config = generateDeploymentConfig("wash");

config.google_drive = {
  sheets_folder_id: "1AQqtRLoNuhbHP3KPzzQqzZcjdttT0rr8",
  assets_folder_id: "1hebyXSR-rkpYLH_No2QTvCQiYfbh1RE9",
};

config.name = "wash"
config.google_drive = {
  sheets_folder_id: "1AQqtRLoNuhbHP3KPzzQqzZcjdttT0rr8",
  assets_folder_id: "1hebyXSR-rkpYLH_No2QTvCQiYfbh1RE9",
}
config.android = {
  splash_asset_path: "packages/app-data/assets/global/android/splash.png",
  icon_asset_path: "packages/app-data/assets/global/android/icon.png",
  icon_asset_foreground_path: "packages/app-data/assets/global/android/icon-foreground.png",
  icon_asset_background_path: "packages/app-data/assets/global/android/icon-background.png",
}
config.error_logging = {
  dsn: "https://976f6a201e1049fdb65d3f642724f0f9@app.glitchtip.com/2444",
};
config.translations = {
  filter_language_codes: ["gb_en", "tz_sw"],
  translated_strings_path: "packages/app-data/translations_source/from_translators",
  source_strings_path: "packages/app-data/translations_source/to_translate",
};

config.app_config.APP_LANGUAGES.default = "tz_sw";
config.app_config.APP_SIDEMENU_DEFAULTS!.title = "WASH App";
config.app_config.APP_HEADER_DEFAULTS!.title = "WASH App";
config.app_config.NOTIFICATION_DEFAULTS!.title = "New message from WASH App";
config.app_config.NOTIFICATION_DEFAULTS!.text = "You have a new message from WASH App";

export default config;
