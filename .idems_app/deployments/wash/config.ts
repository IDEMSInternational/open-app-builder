import { IDeploymentConfig } from "data-models";
import { getDefaultAppConfig } from "data-models/appConfig";

const app_config = getDefaultAppConfig();

const config: IDeploymentConfig = {
  name: "wash",
  app_config,
  google_drive: {
    sheets_folder_id: "1AQqtRLoNuhbHP3KPzzQqzZcjdttT0rr8",
    assets_folder_id: "1hebyXSR-rkpYLH_No2QTvCQiYfbh1RE9",
  },
};

config.app_config!.APP_SIDEMENU_DEFAULTS!.title = "WASH App";
config.app_config!.APP_HEADER_DEFAULTS!.title = "WASH App";
config.app_config!.NOTIFICATION_DEFAULTS!.title = "New message from WASH App";
config.app_config!.NOTIFICATION_DEFAULTS!.text = "You have a new message from WASH App";
config.error_logging!.dsn="https://976f6a201e1049fdb65d3f642724f0f9@app.glitchtip.com/2444"

export default config;
