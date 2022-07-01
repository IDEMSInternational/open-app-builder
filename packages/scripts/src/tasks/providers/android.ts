import * as path from "path";
import { Options, run } from "cordova-res";
import fs from "fs";
import { ROOT_DIR } from "../../paths";
import { logError } from "../../utils";

const set_splash_image = async (splashAssetPath: string) => {
  if (!fs.existsSync(splashAssetPath)) {
    return logError({
      msg1: "Splash source image not found",
      msg2: `A source .png file is required to generate a splash screen. No asset was found at the path supplied in the deployment config: ${splashAssetPath}.`,
    });
  }

  const cordovaOptions: Options = {
    directory: ROOT_DIR,
    resourcesDirectory: path.join(ROOT_DIR, "resources"),
    logstream: process.stdout,
    platforms: {
      android: {
        splash: {
          sources: [splashAssetPath],
        },
      },
    },
    skipConfig: true,
    copy: true,
    projectConfig: {
      android: {
        directory: path.join(ROOT_DIR, "android"),
      },
    },
  };

  return await run(cordovaOptions);
};

const set_launcher_icon = async (options: {
  iconAssetPath: string;
  iconAssetForegroundPath?: string;
  iconAssetBackgroundPath?: string;
}) => {
  const { iconAssetPath, iconAssetForegroundPath, iconAssetBackgroundPath } = options;

  const iconSources = [];
  if (fs.existsSync(iconAssetPath)) {
    iconSources.push(iconAssetPath);
  } else {
    return logError({
      msg1: "Icon source asset not found",
      msg2: `A source .png file is required to be used as a fall back for when the device's android version does not support adaptive icons. No asset was found at the path supplied in the deployment config: ${iconAssetPath}.`,
    });
  }

  const includeAdaptiveIcons =
    fs.existsSync(iconAssetForegroundPath) && fs.existsSync(iconAssetBackgroundPath);

  const cordovaOptions: Options = {
    directory: ROOT_DIR,
    resourcesDirectory: path.join(ROOT_DIR, "resources"),
    logstream: process.stdout,
    platforms: {
      android: includeAdaptiveIcons
        ? {
            "adaptive-icon": {
              icon: { sources: iconSources },
              foreground: { sources: [iconAssetForegroundPath] },
              background: { sources: [iconAssetBackgroundPath] },
            },
          }
        : { icon: { sources: iconSources } },
    },
    skipConfig: true,
    copy: true,
    projectConfig: {
      android: {
        directory: path.join(ROOT_DIR, "android"),
      },
    },
  };

  return await run(cordovaOptions);
};

const add_assets = () => null;
const set_app_meta = () => null;

export default {
  // add_assets,
  set_launcher_icon,
  set_splash_image,
  // set_app_meta,
};
