import { IAppConstantsOverride } from "packages/data-models";

export interface IAppSkin {
  name: string;
  appConfig?: IAppConstantsOverride;
}
