import { resolve, dirname, join } from "path";
import fs from "fs";
import { envReplace } from "@idemsInternational/env-replace";
import { Logger, generateVersionCode } from "../../utils";
import { PATHS, ROOT_DIR } from "shared";
import { execSync } from "child_process";
import * as path from "path";

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

const set_icons_and_splash_images = async (options: { assetPath: string }) => {
  const { assetPath } = options;

  const iconAndSplashSources = [];
  if (fs.existsSync(assetPath)) {
    iconAndSplashSources.push(assetPath);
  } else {
    return Logger.error({
      msg1: "Launcher icon and splash images source assets not found",
      msg2: `No folder was found at the path supplied in the deployment config: ${assetPath}.`,
    });
  }

  // Generate android assets
  const assetDirPath = assetPath.includes(".png") ? path.dirname(assetPath) : assetPath;
  const relativeAssetPath = path.relative(ROOT_DIR, assetPath);
  const cmd = `npx @capacitor/assets generate --assetPath ${relativeAssetPath} --android`;

  execSync(cmd, { stdio: "inherit", cwd: ROOT_DIR });
};

export default {
  configure,
  set_icons_and_splash_images,
};
