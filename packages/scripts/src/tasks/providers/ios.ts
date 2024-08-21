import { envReplace } from "@idemsInternational/env-replace";
import { Logger, generateVersionCode } from "../../utils";
import { PATHS, ROOT_DIR } from "shared";

import fs from "fs";
import { execSync } from "child_process";
import * as path from "path";

interface IiOSBuildOptions {
  appId: string;
  appName: string;
  versionName: string;
}

/** Populate iOS template files with variables from deployment */
const configure = async ({ appId, appName, versionName }: IiOSBuildOptions) => {
  // TODO - allow user to input and update config where variables not defined (?)
  if (!appId)
    Logger.error({
      msg1: `No appId configured for deployment`,
      msg2: `Please set [ios.appId] in deployment config.ts`,
    });
  if (!appName)
    Logger.error({
      msg1: `No appName configured for deployment`,
      msg2: `Please set [ios.appName] in deployment config.ts`,
    });
  if (!versionName)
    Logger.error({
      msg1: `No content version set configured for deployment`,
      msg2: `Please set [git.content_tag_latest] in deployment config.ts`,
    });
  const versionCode = generateVersionCode(versionName);

  // Populate templated iOS files
  await envReplace.replaceFiles({
    cwd: PATHS.ROOT_DIR,
    // include both iOS folder and root (capacitor.config.ts)
    includeFolders: ["ios/**", "."],
    envAdditional: {
      APP_ID: convertToValidIOSAppId(appId),
      APP_NAME: appName,
      VERSION_CODE: versionCode,
      VERSION_NAME: versionName,
    },
    // As the default project.pbxproj file contains various variables env variables in ${...} format that
    // are populated by xcode, target the specific variables that we've added into the template file
    includeVariables: ["APP_ID", "APP_NAME", "VERSION_CODE", "VERSION_NAME"],
  });
};

const set_icons_and_splash_images = async (options: { assetPath: string }) => {
  const { assetPath } = options;

  if (fs.existsSync(assetPath)) {
    // Generate iOS assets from source images
    const relativeAssetPath = path.relative(ROOT_DIR, assetPath);
    const cmd = `npx @capacitor/assets generate --assetPath ${relativeAssetPath} --ios`;

    execSync(cmd, { stdio: "inherit", cwd: ROOT_DIR });
  } else {
    return Logger.error({
      msg1: "Launcher icon and splash images source assets not found",
      msg2: `No folder was found at the path supplied in the deployment config: ${assetPath}.`,
    });
  }
};

/**
 * iOS app ID (aka "bundle ID") only supports alphanumeric characters (A–Z, a–z, and 0–9), hyphens (-), and periods (.),
 * see https://developer.apple.com/documentation/bundleresources/information_property_list/cfbundleidentifier#discussion
 * Replace underscores with hyphens to enable interoperability with Android app ID
 * */
function convertToValidIOSAppId(appId: string) {
  return appId.replace(/_/g, "-");
}

export default {
  configure,
  set_icons_and_splash_images,
};
