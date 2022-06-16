import * as path from "path";
import { Options, run } from "cordova-res";
import fs from "fs";
import { ROOT_DIR } from "../../paths";
import { logError } from "../../utils";

const set_splash_image = async (assetsFolderPath: string, subPath: string) => {
  const androidAssetsPath = path.join(path.resolve(assetsFolderPath), subPath);
  const availableAssets = fs.readdirSync(androidAssetsPath);
  if (!availableAssets.includes("splash.png")) {
    return logError({
      msg1: "splash.png not found",
      msg2: `A splash.png file is required to generate a splash screen.`,
    });
  }

  const options: Options = {
    directory: ROOT_DIR,
    resourcesDirectory: path.join(ROOT_DIR, "resources"),
    logstream: process.stdout,
    platforms: {
      android: {
        splash: {
          sources: [path.join(androidAssetsPath, "splash.png")],
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

  return await run(options);
};

const set_launcher_icon = async (assetsFolderPath: string, subPath: string) => {
  const androidAssetsPath = path.join(path.resolve(assetsFolderPath), subPath);
  const availableAssets = fs.readdirSync(androidAssetsPath);
  const iconSources = [];
  if (availableAssets.includes("icon.png")) {
    iconSources.push(path.join(androidAssetsPath, "icon.png"));
  } else {
    return logError({
      msg1: "icon.png not found",
      msg2: `An icon.png file is required to be used as a fall back for when the device's android version does not support adaptive icons.`,
    });
  }

  const includeAdaptiveIcons =
    availableAssets.includes("icon-background.png") &&
    availableAssets.includes("icon-foreground.png");

  const options: Options = {
    directory: ROOT_DIR,
    resourcesDirectory: path.join(ROOT_DIR, "resources"),
    logstream: process.stdout,
    platforms: {
      android: includeAdaptiveIcons
        ? {
            "adaptive-icon": {
              icon: { sources: iconSources },
              foreground: { sources: [path.join(androidAssetsPath, "icon-foreground.png")] },
              background: { sources: [path.join(androidAssetsPath, "icon-background.png")] },
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

  return await run(options);
};

const add_assets = () => null;
const set_app_meta = () => null;

export default {
  // add_assets,
  set_launcher_icon,
  set_splash_image,
  // set_app_meta,
};
