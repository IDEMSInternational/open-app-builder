import { DEFAULT_CONSTANTS, IDeploymentConfig } from "data-models";

const app_constants = DEFAULT_CONSTANTS

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
