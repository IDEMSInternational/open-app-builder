import { getDefaultAppConstants, IDeploymentConfig } from "data-models";

const app_constants = getDefaultAppConstants()

// Override any app constants here
app_constants.APP_HEADER_DEFAULTS.title = 'Example Deployment'
app_constants.APP_SIDEMENU_DEFAULTS.title = 'Example Deployment'

const config: IDeploymentConfig = {
  name: "example",
  google_drive: {
    sheets_folder_id: "",
    assets_folder_id: "",
  },
  app_constants
};
export default config;
