export default (name: string) =>
  `
import { IDeploymentConfig, getDefaultAppConstants } from "data-models";
  
const app_constants = getDefaultAppConstants()
  
// Override any app constants here
app_constants.APP_HEADER_DEFAULTS.title = "${name}"
app_constants.APP_SIDEMENU_DEFAULTS.title = "${name}"
  
const config: IDeploymentConfig = {
  name: "${name}",
  google_drive: {
    sheets_folder_id: "",
    assets_folder_id: "",
  },
  app_constants
};
export default config;
`.trim();
