import { getDefaultAppConstants, IDeploymentConfig } from "data-models";

const app_constants = getDefaultAppConstants()

// Override any app constants here
app_constants.APP_HEADER_DEFAULTS.title = 'Example'
app_constants.APP_SIDEMENU_DEFAULTS.title = 'Example'

const config: IDeploymentConfig = {
  name: "Example Config",
  google_drive: {
    sheets_folder_id: "",
    assets_folder_id: "",
  },
  app_constants
};
export default config;
