import { IAppSkin } from "./skin.model";
import { arrayToHashmap } from "src/app/shared/utils";

// TODO: Eventually these skins should be authored from templates
/** A list of skins that can be applied to an app to override the core APP_CONFIG.
 * For example:
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
const skins: IAppSkin[] = [
  { name: "default" },
  { name: "weekly_workshop" },
  {
    name: "modular",
    // appConfig: {
    //   APP_HEADER_DEFAULTS: {
    //     title: "test"
    //   }
    // }
  },
];

export const APP_SKINS: { [name: string]: IAppSkin } = arrayToHashmap(skins, "name");
