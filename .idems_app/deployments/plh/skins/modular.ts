import { IAppSkin } from "data-models";

const modular: IAppSkin = {
  name: "modular",
  appConfig: {
    APP_THEMES: {
      defaultThemeName: "professional"
    },
    APP_FOOTER_DEFAULTS: {
      templateName: "footer"
    }
  }
};

export default modular;
