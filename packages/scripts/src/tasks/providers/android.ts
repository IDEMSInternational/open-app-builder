import { resolve, dirname, join } from "path";
import { Options, run } from "cordova-res";
import fs from "fs";
import { envReplace } from "@idemsInternational/env-replace";
import { ROOT_DIR } from "../../paths";
import { Logger, generateVersionCode } from "../../utils";
import { PATHS } from "shared";
import { spawnSync } from "child_process";

interface IAndroidBuildOptions {
  appId: string;
  appName: string;
  versionName: string;
}

/** Populate android template files with variables from deployment */
const configure = async ({ appId, appName, versionName }: IAndroidBuildOptions) => {
  // TODO - allow user to input and update config where variables not defined (?)
  if (!appId)
    Logger.error({
      msg1: `No appId configured for deployment`,
      msg2: `Please set [android.appId] in deployment config.ts`,
    });
  if (!appName)
    Logger.error({
      msg1: `No appName configured for deployment`,
      msg2: `Please set [android.appName] in deployment config.ts`,
    });
  if (!versionName)
    Logger.error({
      msg1: `No content version set configured for deployment`,
      msg2: `Please set [git.content_tag_latest] in deployment config.ts`,
    });
  const versionCode = generateVersionCode(versionName);

  // Populate templated android files
  await envReplace.replaceFiles({
    cwd: PATHS.ROOT_DIR,
    // include both android folder and root (capacitor.config.ts)
    includeFolders: ["android/**", "."],
    envAdditional: {
      APP_ID: appId,
      APP_NAME: appName,
      VERSION_CODE: versionCode,
      VERSION_NAME: versionName,
    },
    // Only replace the following variables
    includeVariables: ["APP_ID", "APP_NAME", "VERSION_CODE", "VERSION_NAME"],
  });

  // Move files where template not already located in correct folder (various reasons below)
  const androidTemplatesPath = resolve(PATHS.ANDROID_PATH, "templates");
  const androidJavaPath = resolve(PATHS.ANDROID_PATH, "app", "src", "main", "java");
  const androidResPath = resolve(PATHS.ANDROID_PATH, "app", "src", "main", "res");

  const ops = [
    // MainActivity.java needs to sit at nested /org/example/app folder derived from appId
    {
      src: resolve(androidTemplatesPath, "MainActivity.java"),
      target: resolve(androidJavaPath, ...appId.split("."), "MainActivity.java"),
    },
    // strings.xml template outside android dir as will still be read by gradle build as conflict
    {
      src: resolve(androidTemplatesPath, "strings.xml"),
      target: resolve(androidResPath, "values", "strings.xml"),
    },
  ];
  for (const { src, target } of ops) {
    fs.mkdirSync(dirname(target), { recursive: true });
    fs.renameSync(src, target);
  }
};

const set_splash_image = async (splashAssetPath: string) => {
  if (!fs.existsSync(splashAssetPath)) {
    return Logger.error({
      msg1: "Splash source image not found",
      msg2: `A source .png file is required to generate a splash screen. No asset was found at the path supplied in the deployment config: ${splashAssetPath}.`,
    });
  }

  // check if the splashAsetPath is to a file or another directory
  // we do want it to strip the file name and use the directory, so we can run that if the path is to a file

  // if it does not, then otherwise, run the following command
  const cmd = `npx @capacitor/assets generate --assetPath ${splashAssetPath} --android`;
  spawnSync(cmd); 

  const cordovaOptions: Options = {
    directory: ROOT_DIR,
    resourcesDirectory: join(ROOT_DIR, "resources"),
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
        directory: join(ROOT_DIR, "android"),
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
    return Logger.error({
      msg1: "Icon source asset not found",
      msg2: `A source .png file is required to be used as a fall back for when the device's android version does not support adaptive icons. No asset was found at the path supplied in the deployment config: ${iconAssetPath}.`,
    });
  }

  const includeAdaptiveIcons =
    fs.existsSync(iconAssetForegroundPath) && fs.existsSync(iconAssetBackgroundPath);

  const cordovaOptions: Options = {
    directory: ROOT_DIR,
    resourcesDirectory: join(ROOT_DIR, "resources"),
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
        directory: join(ROOT_DIR, "android"),
      },
    },
  };

  return await run(cordovaOptions);
};

export default {
  configure,
  set_launcher_icon,
  set_splash_image,
};
