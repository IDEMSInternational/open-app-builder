import { IAppConfigOverride } from ".";

/** Skins can be applied to an app to override values within the core APP_CONFIG.
 * They can also be referenced by name at the template level to apply skin-specific overrides. */
export interface IAppSkin {
  name: string;
  appConfig?: IAppConfigOverride;
}
