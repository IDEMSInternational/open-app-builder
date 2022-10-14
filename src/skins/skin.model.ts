import { IAppConfigOverride } from "packages/data-models";

export interface IAppSkin {
  name: string;
  appConfig?: IAppConfigOverride;
}
