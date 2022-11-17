import { IAppSkin } from "data-models";

// PLH-specific skins

export const weekly_workshop: IAppSkin = {
  name: "weekly_workshop",
  appConfig: {
    APP_THEMES: {
      defaultThemeName: "default"
    }
  }
}

export const modular: IAppSkin = {
  name: "modular",
  appConfig: {
    APP_THEMES: {
      defaultThemeName: "professional"
    },
    APP_FOOTER_DEFAULTS: {
      templateName: "footer"
    }
  }
}
