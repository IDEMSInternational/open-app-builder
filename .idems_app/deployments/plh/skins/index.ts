import { IAppSkin } from "data-models";

// PLH-specific skins

export const weekly_workshop: IAppSkin = {
  name: "weekly_workshop"
}

export const modular: IAppSkin = {
  name: "modular",
  appConfig: {
    APP_FOOTER_DEFAULTS: {
      templateName: "footer"
    }
  }
}
