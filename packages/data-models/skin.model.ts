import { IAppConfigOverride } from "./appConfig";

/** Skins can be applied to an app to override values within the core APP_CONFIG.
 * They can also be referenced by name at the template level to apply skin-specific overrides.
 *
 * @example
 * ```ts
 * {
 *   name: "no_sidemenu",
 *   appConfig: {
 *     APP_SIDEMENU_DEFAULTS: {
 *       enabled: false
 *     }
 *     APP_HEADER_DEFAULTS: {
 *       should_show_menu_button: false
 *     }
 *   }
 * }
 *```
 */
export interface IAppSkin {
  name: string;
  appConfig?: IAppConfigOverride;
}
