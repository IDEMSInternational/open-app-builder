// TODO - this will need refactor after PR 1401 merged

export default (name: string, parentFolderName: string) =>
  `
import { extendConfig } from "data-models/deployment.model";
import PARENT_CONFIG from "../${parentFolderName}/config";

const config = extendConfig(PARENT_CONFIG);
config.name = "${name}";

// override app constants here
config.app_constants.APP_HEADER_DEFAULTS.title = "${name}";
config.app_constants.APP_SIDEMENU_DEFAULTS.title = "${name}";

// example filters applied to main deployment content
config.app_data = {
    sheets_filter_function : (flow) =>true,
    assets_filter_function : (fileEntry) =>true
}

export default config;
`.trim();
