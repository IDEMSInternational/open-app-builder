import { IDeploymentConfig } from "data-models";
import { getDefaultAppConfig } from "data-models";

const config: IDeploymentConfig = {
  name: "perinatal",
  google_drive: {
    sheets_folder_id: "1LyMSXxi0FN5iAZQL5ySLBW56jmDqVabU",
    assets_folder_id: "1sqW2TdYXALIlvBnWlU-XT90BpllkLrGs",
  },
  app_config: getDefaultAppConfig(),
  error_logging: {
    dsn: "https://d2a84a6e88b24a7199736d4d153c0a7a@app.glitchtip.com/2443"
  }
};
// Override constants
config.app_config!.APP_HEADER_DEFAULTS!.title = "ParentApp";
config.app_config!.APP_SIDEMENU_DEFAULTS!.title = "ParentApp";
config.app_config!.NOTIFICATION_DEFAULTS!.title = "New message from ParentApp";
config.app_config!.NOTIFICATION_DEFAULTS!.text = "You have a new message from ParentApp";

export default config;
