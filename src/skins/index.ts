import { IAppSkin } from "./skin.model";
import { arrayToHashmap } from "src/app/shared/utils";

// TODO: Eventually these skins should be authored from templates
const skins: IAppSkin[] = [
  { name: "default" },
  { name: "weekly_workshop" },
  {
    name: "modular",
    footerTemplateName: "navigation_bar",
  },
];

export const APP_SKINS: { [name: string]: IAppSkin } = arrayToHashmap(skins, "name");
