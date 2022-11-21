import { IDeploymentConfig } from "data-models";
import { getDefaultAppConfig } from "data-models/appConfig";

const app_config = getDefaultAppConfig();

const config: IDeploymentConfig = {
  name: "ae_soils",
  app_config,
  google_drive: {
    sheets_folder_id: "1oHUHuZBh1Hi4TaSkZik5vnJxWtisSqRR",
    assets_folder_id: "1FeuS7TDJQJlYpIXGki7vOdr3TaMjIdWj",
  },
};

config.app_config.APP_SIDEMENU_DEFAULTS.title = "AE App";
config.app_config.APP_HEADER_DEFAULTS.title = "AE App";
config.app_config.NOTIFICATION_DEFAULTS.title = "New message from AE App";
config.app_config.NOTIFICATION_DEFAULTS.text = "You have a new message from AE App";

export default config;