import { resolve, join } from "path";
// import { Options, run } from "cordova-res";
import * as fs from "fs";
import { ROOT_DIR } from "../../../paths";
import { Logger } from "../../../utils";

import { configure } from "./configure";
import { set_launcher_icon_beta, set_splash_image_beta } from "./capacitor-assets";

// const set_splash_image = async (splashAssetPath: string) => {
//   if (!fs.existsSync(splashAssetPath)) {
//     return Logger.error({
//       msg1: "Splash source image not found",
//       msg2: `A source .png file is required to generate a splash screen. No asset was found at the path supplied in the deployment config: ${splashAssetPath}.`,
//     });
//   }

//   const cordovaOptions: Options = {
//     directory: ROOT_DIR,
//     resourcesDirectory: join(ROOT_DIR, "resources"),
//     logstream: process.stdout,
//     platforms: {
//       android: {
//         splash: {
//           sources: [splashAssetPath],
//         },
//       },
//     },
//     skipConfig: true,
//     copy: true,
//     projectConfig: {
//       android: {
//         directory: join(ROOT_DIR, "android"),
//       },
//     },
//   };

//   return await run(cordovaOptions);
// };

// const set_launcher_icon = async (options: {
//   iconAssetPath: string;
//   iconAssetForegroundPath?: string;
//   iconAssetBackgroundPath?: string;
// }) => {
//   const { iconAssetPath, iconAssetForegroundPath, iconAssetBackgroundPath } = options;

//   const iconSources = [];
//   if (fs.existsSync(iconAssetPath)) {
//     iconSources.push(iconAssetPath);
//   } else {
//     return Logger.error({
//       msg1: "Icon source asset not found",
//       msg2: `A source .png file is required to be used as a fall back for when the device's android version does not support adaptive icons. No asset was found at the path supplied in the deployment config: ${iconAssetPath}.`,
//     });
//   }

//   const includeAdaptiveIcons =
//     fs.existsSync(iconAssetForegroundPath) && fs.existsSync(iconAssetBackgroundPath);

//   const cordovaOptions: Options = {
//     directory: ROOT_DIR,
//     resourcesDirectory: join(ROOT_DIR, "resources"),
//     logstream: process.stdout,
//     platforms: {
//       android: includeAdaptiveIcons
//         ? {
//             "adaptive-icon": {
//               icon: { sources: iconSources },
//               foreground: { sources: [iconAssetForegroundPath] },
//               background: { sources: [iconAssetBackgroundPath] },
//             },
//           }
//         : { icon: { sources: iconSources } },
//     },
//     skipConfig: true,
//     copy: true,
//     projectConfig: {
//       android: {
//         directory: join(ROOT_DIR, "android"),
//       },
//     },
//   };

//   return await run(cordovaOptions);
// };

export default {
  configure,
  set_launcher_icon: set_launcher_icon_beta,
  set_splash_image: set_splash_image_beta,
};
