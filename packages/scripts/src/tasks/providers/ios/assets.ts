import * as fs from "fs";
import { ROOT_DIR } from "../../../paths";
import { Logger, logOutput } from "../../../utils";

// @capacitor/assets has no public programmatic API, so import internal modules directly
import { IosAssetGenerator } from "@capacitor/assets/dist/platforms/ios";
import type { AssetKind, Platform } from "@capacitor/assets/dist/definitions";
import { InputAsset } from "@capacitor/assets/dist/input-asset";
import { Project } from "@capacitor/assets/dist/project";

const DEFAULT_BACKGROUND_COLOR = "#ffffff";

/**
 * iOS app icon and launch screen generation using @capacitor/assets.
 * Canonical: single logo + background colour (same API as Android).
 */

export interface IOSGenerateAssetsOptions {
  logoPath: string;
  backgroundColor: string;
}

/** Load and validate the iOS project with Capacitor assets */
async function loadIOSProject() {
  const projectConfig = { ios: { path: "ios/App" } };
  const project = new Project(ROOT_DIR, projectConfig, "resources");
  await project.load();

  if (!(await project.iosExists())) {
    Logger.error({
      msg1: "iOS project not found",
      msg2: `iOS project not found at ${projectConfig.ios.path}`,
    });
    return null;
  }

  return project;
}

/**
 * Generate iOS app icon and launch screen from a single logo and background colour (canonical).
 * If backgroundColor is omitted, logs a warning and uses default white.
 */
export const generateAssets = async (options: IOSGenerateAssetsOptions) => {
  let { logoPath, backgroundColor } = options;
  if (!backgroundColor || backgroundColor.trim() === "") {
    Logger.warning({
      msg1: "logo_background_color not set",
      msg2: `Using default white (${DEFAULT_BACKGROUND_COLOR}). Set logo_background_color in deployment config to suppress this warning.`,
    });
    backgroundColor = DEFAULT_BACKGROUND_COLOR;
  }

  if (!fs.existsSync(logoPath)) {
    return Logger.error({
      msg1: "Logo source image not found",
      msg2: `No asset found at: ${logoPath}`,
    });
  }

  try {
    const project = await loadIOSProject();
    if (!project) return;

    const generatorOptions = {
      iconBackgroundColor: backgroundColor,
      iconBackgroundColorDark: backgroundColor,
      splashBackgroundColor: backgroundColor,
      splashBackgroundColorDark: backgroundColor,
      // On iOS, @capacitor/assets applies logoSplashScale to the source logo width, not the
      // splash width. Use ~0.55 so the logo appears at roughly 20% of the screen to match Android.
      logoSplashScale: 0.55,
    };

    const generator = new IosAssetGenerator(generatorOptions);
    const logoAsset = new InputAsset(logoPath, "logo" as AssetKind, "ios" as Platform);
    await logoAsset.load();

    const generatedAssets = await generator.generate(logoAsset, project);

    logOutput({
      msg1: "iOS assets generated from logo",
      msg2: `Generated ${generatedAssets.length} assets`,
    });

    return generatedAssets;
  } catch (error) {
    return Logger.error({
      msg1: "Failed to generate iOS assets from logo",
      msg2: `Error: ${(error as Error).message}`,
    });
  }
};
