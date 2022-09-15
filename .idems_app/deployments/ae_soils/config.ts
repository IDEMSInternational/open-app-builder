import { IDeploymentConfig } from "data-models";
import { getDefaultAppConstants } from "data-models/constants";

const app_constants = getDefaultAppConstants();

const config: IDeploymentConfig = {
  name: "ae_soils",
  app_constants,
  google_drive: {
    sheets_folder_id: "1oHUHuZBh1Hi4TaSkZik5vnJxWtisSqRR",
    assets_folder_id: "1FeuS7TDJQJlYpIXGki7vOdr3TaMjIdWj",
  },
};

config.app_constants.APP_SIDEMENU_DEFAULTS.title = "AE App";
config.app_constants.APP_HEADER_DEFAULTS.title = "AE App";
config.app_constants.NOTIFICATION_DEFAULTS.title = "New message from AE App";
config.app_constants.NOTIFICATION_DEFAULTS.text = "You have a new message from AE App";

export default config;
