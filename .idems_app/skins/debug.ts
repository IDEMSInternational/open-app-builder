import { IAppSkin } from "data-models";

const debug: IAppSkin = {
  name: "debug",
  appConfig: {
    APP_SIDEMENU_DEFAULTS: {
      title: "Debug Skin"
    },
    APP_HEADER_DEFAULTS:
    {
      title: "Debug Skin"
    },
    APP_ROUTE_DEFAULTS: {
      home_route: "/template/test"
    }
  },
};
export default debug;
