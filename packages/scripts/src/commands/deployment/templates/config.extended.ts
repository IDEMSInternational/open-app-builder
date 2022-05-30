// TODO - this will need refactor after PR 1401 merged

export default (name: string, parentFilename: string) =>
  `
import { cloneConfig } from "data-models/deployment.model";
import PARENT_CONFIG from "./${parentFilename.replace(".ts", "")}";

const config = cloneConfig(PARENT_CONFIG);
config.name = "${name}";

// override app constants here
config.app_constants.APP_HEADER_DEFAULTS.title = "${name}";
config.app_constants.APP_SIDEMENU_DEFAULTS.title = "${name}";

export default config;
`.trim();
