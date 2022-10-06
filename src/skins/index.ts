import { IAppSkin } from "./skin.model";
import { arrayToHashmap } from "src/app/shared/utils";

const skins: IAppSkin[] = [
  { name: "weekly_workshop" },
  {
    name: "modular",
    footerTemplateName: "navigation_bar",
  },
];

export const AVAILABLE_APP_SKINS: { [name: string]: IAppSkin } = arrayToHashmap(skins, "name");
