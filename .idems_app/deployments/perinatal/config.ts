import { IDeploymentConfig } from "data-models";
import { getDefaultAppConfig } from "data-models";

const config: IDeploymentConfig = {
  name: "perinatal",
  google_drive: {
    sheets_folder_id: "1LyMSXxi0FN5iAZQL5ySLBW56jmDqVabU",
    assets_folder_id: "1sqW2TdYXALIlvBnWlU-XT90BpllkLrGs",
  },
  app_config: getDefaultAppConfig(),
};
// Override constants
config.app_config!.APP_HEADER_DEFAULTS!.title = "Perinatal App";
config.app_config!.APP_SIDEMENU_DEFAULTS!.title = "Perinatal App";
config.app_config!.NOTIFICATION_DEFAULTS!.title = "New message from Perinatal App";
config.app_config!.NOTIFICATION_DEFAULTS!.text = "You have a new message from Perinatal App";

export default config;
