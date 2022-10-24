import { IDeploymentConfig } from "data-models";
import { getDefaultAppConfig } from "data-models/appConfig";
import * as SKINS from "./skins";

const app_config = getDefaultAppConfig();

/**
 * The default config should ideally be a superset of any extended configs
 * to allow for easier post-processing
 */
const config: IDeploymentConfig = {
  name: "plh_global",
  app_config,
  google_drive: {
    sheets_folder_id: "1n221Zv9LYuwxmjhiboq8vhQg67_K9L5f",
    assets_folder_id: "1dp9QAQ84m8pm0IBQTSPXe1ramyynKPNn",
  },
  android: {
    splash_asset_path: "packages/app-data/assets/global/android/splash.png",
    icon_asset_path: "packages/app-data/assets/global/android/icon.png",
    icon_asset_foreground_path: "packages/app-data/assets/global/android/icon-foreground.png",
    icon_asset_background_path: "packages/app-data/assets/global/android/icon-background.png",
  },
  app_data: {},
  translations: {
    translated_strings_path: "packages/app-data/translations_source/from_translators",
    source_strings_path: "packages/app-data/translations_source/to_translate",
  },
  _version: 1.0,
};

config.app_config.APP_LANGUAGES.default = "gb_en";
config.app_config.APP_SIDEMENU_DEFAULTS.title = "ParentApp";
config.app_config.APP_HEADER_DEFAULTS.title = "ParentApp";
config.app_config.NOTIFICATION_DEFAULTS.title = "New message from PLH";
config.app_config.NOTIFICATION_DEFAULTS.text = "You have a new message from ParentApp";
config.app_config.APP_SKINS.defaultSkinName = SKINS.weekly_workshop.name
config.app_config.APP_SKINS.available = [SKINS.modular, SKINS.weekly_workshop]
config.app_config.APP_THEMES.available = ["default", "professional"]

export default config;
