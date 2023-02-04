// TODO - this will need refactor after PR 1401 merged

export default (name: string, parent: string) =>
  `
import { extendDeploymentConfig } from "scripts";
const config = extendDeploymentConfig({ name: "${name}", parent: "${parent}" });
// override app constants here
config.app_config.APP_HEADER_DEFAULTS.title = "${name}";
config.app_config.APP_SIDEMENU_DEFAULTS.title = "${name}";
// example filters applied to main deployment content
config.app_data = {
    sheets_filter_function : (flow) =>true,
    assets_filter_function : (fileEntry) =>true
}
export default config;
`.trim();
