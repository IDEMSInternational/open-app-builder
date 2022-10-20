import { getDefaultAppConfig, IAppSkin } from "data-models";

const appConfig = getDefaultAppConfig();

appConfig.APP_SIDEMENU_DEFAULTS.title = "Debug";
appConfig.APP_HEADER_DEFAULTS.title = "Debug Skin";

appConfig.APP_ROUTE_DEFAULTS.home_route = "/template/test";

const debug: IAppSkin = {
  name: "debug",
  appConfig,
};
export default debug;
