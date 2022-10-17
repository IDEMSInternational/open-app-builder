import { IAppSkin } from "data-models";

// PLH-specific skins

/** Skins can be applied to an app to override the core APP_CONFIG.
 * An example skin:
 * {
 *  name: "no_sidemenu",
 *  appConfig: {
 *    APP_SIDEMENU_DEFAULTS: {
 *      enabled: false
 *    }
 *    APP_HEADER_DEFAULTS: {
 *      should_show_menu_button: false
 *    }
 *  }
 *}
 *
 * TODO: Eventually these skins should be authored from templates */

export const weekly_workshop: IAppSkin = {
  name: "weekly_workshop"
}

export const modular: IAppSkin = {
  name: "modular"
}
