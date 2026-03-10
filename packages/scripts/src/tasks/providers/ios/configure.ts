import { envReplace } from "@idemsInternational/env-replace";
import { Logger, generateVersionCode } from "../../../utils";
import { PATHS } from "shared";
import type { IDeploymentConfig } from "data-models";
import fs from "fs";
import plist from "plist";

interface IiOSBuildOptions {
  appId: string;
  appName: string;
  authProvider: IDeploymentConfig["auth"]["provider"];
  versionName: string;
  zoomEnabled: boolean;
}

/** Populate iOS template files with variables from deployment */
export const configure = async ({
  appId,
  appName,
  versionName,
  zoomEnabled,
  authProvider,
}: IiOSBuildOptions) => {
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

  const { GOOGLE_REVERSED_CLIENT_ID } = getCustomUrlSchemes(authProvider);

  // Populate templated iOS files
  await envReplace.replaceFiles({
    cwd: PATHS.ROOT_DIR,
    // include both iOS folder and root (capacitor.config.ts)
    includeFolders: ["ios/**", "."],
    envAdditional: {
      APP_ID: convertToValidIOSAppId(appId),
      APP_NAME: appName,
      GOOGLE_REVERSED_CLIENT_ID,
      VERSION_CODE: versionCode,
      VERSION_NAME: versionName,
      ZOOM_ENABLED: zoomEnabled,
    },
    // As the default project.pbxproj file contains various variables env variables in ${...} format that
    // are populated by xcode, target the specific variables that we've added into the template file
    includeVariables: [
      "APP_ID",
      "APP_NAME",
      "GOOGLE_REVERSED_CLIENT_ID",
      "VERSION_CODE",
      "VERSION_NAME",
      "ZOOM_ENABLED",
    ],
  });
};

/**
 * iOS app ID (aka "bundle ID") only supports alphanumeric characters (A–Z, a–z, and 0–9), hyphens (-), and periods (.),
 * see https://developer.apple.com/documentation/bundleresources/information_property_list/cfbundleidentifier#discussion
 * Replace underscores with hyphens to enable interoperability with Android app ID
 * */
function convertToValidIOSAppId(appId: string) {
  return appId.replace(/_/g, "-");
}

/**
 * Get deployment-specific custom URL schemes, used for deep linking.
 * Currently just REVERSED_CLIENT_ID, required for Google Auth integration
 * TODO: make this step optional, allowing for deployments without Google Auth integration, for example
 */
function getCustomUrlSchemes(authProvider: IiOSBuildOptions["authProvider"]) {
  let GOOGLE_REVERSED_CLIENT_ID = "";
  if (authProvider) {
    // TODO: revisit code if supporting other auth providers
    if (authProvider !== "firebase") throw new Error(`Unsupported auth provider: ${authProvider}`);
    const googleServicesPlist = fs.readFileSync(PATHS.IOS_GOOGLE_SERVICE_INFO_PLIST_PATH, "utf8");
    if (!googleServicesPlist) {
      Logger.error({
        msg1: `No GoogleService-Info.plist file found at ${PATHS.IOS_GOOGLE_SERVICE_INFO_PLIST_PATH}`,
        msg2: `Please add file, downloaded from Firebase console`,
      });
    }
    try {
      const parsedPlist = plist.parse(googleServicesPlist);
      GOOGLE_REVERSED_CLIENT_ID = JSON.parse(JSON.stringify(parsedPlist)).REVERSED_CLIENT_ID;
      if (!GOOGLE_REVERSED_CLIENT_ID) {
        Logger.error({
          msg1: `No REVERSED_CLIENT_ID found in ${PATHS.IOS_GOOGLE_SERVICE_INFO_PLIST_PATH}`,
          msg2: `Please ensure Google Auth is configured in the Firebase console and the latest GoogleService-Info.plist file is populated`,
        });
      }
    } catch {
      Logger.error({
        msg1: `Error parsing ${PATHS.IOS_GOOGLE_SERVICE_INFO_PLIST_PATH}`,
        msg2: `Please ensure the file is the correct GoogleService-Info.plist file downloaded from Firebase console`,
      });
    }
  }

  return { GOOGLE_REVERSED_CLIENT_ID };
}
