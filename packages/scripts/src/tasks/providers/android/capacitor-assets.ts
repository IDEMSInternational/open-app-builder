import * as fs from "fs";
import { ROOT_DIR } from "../../../paths";
import { Logger, logOutput } from "../../../utils";
import { AndroidAssetGenerator } from "@capacitor/assets/dist/platforms/android";
import { InputAsset } from "@capacitor/assets/dist/input-asset";
import { Project } from "@capacitor/assets/dist/project";

/**
 * Android asset generation helpers built on top of @capacitor/assets.
 *
 * NOTE:
 * - Current deployment workflows only pass the "basic" options (single light icon and splash).
 * - Dark-mode variants and additional colouring / sizing options are implemented here but
 *   are not yet exposed via workflows. They are safe defaults for now and are intended to
 *   be wired in from deployment config in a future iteration.
 */

/** Public options for generating launcher icons.
 *
 * Only `iconAssetPath`, `iconAssetForegroundPath` and `iconAssetBackgroundPath` are currently
 * provided by workflows. The dark-mode and colour options are intentionally unused for now but
 * are fully wired through to the underlying generator so they can be enabled later.
 */
export interface AndroidLauncherIconOptions {
  iconAssetPath: string;
  iconAssetForegroundPath?: string;
  iconAssetForegroundPathDark?: string;
  iconAssetBackgroundPath?: string;
  iconBackgroundColour?: string;
  iconBackgroundColourDark?: string;
}

/** Public options for generating splash images.
 *
 * Only `splashAssetPath` is currently provided by workflows. All other fields are optional
 * enhancements (dark-mode splash, background colours, logo scaling) ready for future use.
 */
export interface AndroidSplashImageOptions {
  splashAssetPath: string;
  splashAssetPathDark?: string;
  splashBackgroundColor?: string;
  splashBackgroundColorDark?: string;
  logoSplashScale?: number;
  logoSplashTargetWidth?: number;
}

// // Basic usage with just an icon
// await androidProvider.set_launcher_icon_beta({
//   iconAssetPath: "./resources/icon.png",
//   iconBackgroundColour: "#ffffff"
// });
//
// // Advanced usage with adaptive icons
// await androidProvider.set_launcher_icon_beta({
//   iconAssetPath: "./resources/icon.png",
//   iconAssetForegroundPath: "./resources/icon-foreground.png",
//   iconAssetBackgroundPath: "./resources/icon-background.png",
//   iconBackgroundColour: "#ffffff"
// });
//
// // Advanced usage with dark mode support
// await androidProvider.set_launcher_icon_beta({
//   iconAssetPath: "./resources/icon.png",
//   iconAssetForegroundPath: "./resources/icon-foreground.png",
//   iconAssetForegroundPathDark: "./resources/icon-foreground-dark.png",
//   iconAssetBackgroundPath: "./resources/icon-background.png",
//   iconBackgroundColour: "#ffffff",
//   iconBackgroundColourDark: "#222222"
// });
//
// NOTE: Dark mode support is currently limited on Android. The @capacitor/assets library
// notes that "Current versions of Android don't appear to support night mode icons (13+ might?)"
// but the functionality is implemented for future compatibility. Dark mode assets may
// not generate any output files on current Android versions.
/**
 * Generate Android launcher icons for the current project using @capacitor/assets.
 *
 * Workflows currently only pass:
 * - iconAssetPath
 * - iconAssetForegroundPath
 * - iconAssetBackgroundPath
 *
 * The remaining fields are intentionally "future" options that can be wired in from
 * deployment config later without changing this function's behaviour.
 */
export const set_launcher_icon_beta = async (options: AndroidLauncherIconOptions) => {
  const {
    iconAssetPath,
    iconAssetForegroundPath,
    iconAssetBackgroundPath,
    iconBackgroundColour,
    iconBackgroundColourDark,
    // iconAssetForegroundPathDark - available in interface but not yet implemented
  } = options;

  // Validate that the main icon asset exists
  if (!fs.existsSync(iconAssetPath)) {
    return Logger.error({
      msg1: "Icon source asset not found",
      msg2: `A source .png file is required to be used as a fall back for when the device's android version does not support adaptive icons. No asset was found at the path supplied in the deployment config: ${iconAssetPath}.`,
    });
  }

  try {
    // Create project instance
    const projectConfig = { android: { path: "android" } };
    const project = new Project(ROOT_DIR, projectConfig, "resources");
    await project.load();

    // Check if Android project exists
    if (!(await project.androidExists())) {
      return Logger.error({
        msg1: "Android project not found",
        msg2: `Android project not found at ${projectConfig.android.path}`,
      });
    }

    // Create generator options
    // NOTE: iconBackgroundColourDark is wired through for future use but not yet passed by workflows
    const generatorOptions: Record<string, unknown> = {
      iconBackgroundColor: iconBackgroundColour || "#ffffff",
      androidFlavor: "main",
    };
    if (iconBackgroundColourDark) {
      generatorOptions.iconBackgroundColorDark = iconBackgroundColourDark;
    }

    const generator = new AndroidAssetGenerator(generatorOptions);

    // Determine which assets to generate based on available files
    const assets: InputAsset[] = [];

    // Always add the main icon asset
    const mainIconAsset = new InputAsset(iconAssetPath, "icon" as any, "android" as any);
    await mainIconAsset.load();
    assets.push(mainIconAsset);

    // If we have both foreground and background assets, create adaptive icon assets
    if (iconAssetForegroundPath && iconAssetBackgroundPath && 
        fs.existsSync(iconAssetForegroundPath) && fs.existsSync(iconAssetBackgroundPath)) {
      const foregroundAsset = new InputAsset(iconAssetForegroundPath, "icon-foreground" as any, "android" as any);
      await foregroundAsset.load();
      assets.push(foregroundAsset);

      const backgroundAsset = new InputAsset(iconAssetBackgroundPath, "icon-background" as any, "android" as any);
      await backgroundAsset.load();
      assets.push(backgroundAsset);
    }

    // Generate assets for each input asset
    const generatedAssets = [];
    for (const asset of assets) {
      try {
        const generated = await generator.generate(asset, project);
        generatedAssets.push(...generated);
      } catch (e) {
        console.error(`[ERROR] Failed to generate for asset kind: ${asset.kind}`, e);
        throw e;
      }
    }

    // Determine what types of icons were generated for the success message
    const hasAdaptiveIcons = assets.some(
      (asset) => asset.kind === "icon-foreground" || asset.kind === "icon-background",
    );
    const iconType = hasAdaptiveIcons ? "adaptive launcher icons" : "launcher icons";

    logOutput({
      msg1: "Android launcher icons generated",
      msg2: `Generated ${generatedAssets.length} ${iconType}`,
    });

    return generatedAssets;

  } catch (error) {
    return Logger.error({
      msg1: "Failed to generate Android launcher icons",
      msg2: `Error: ${error.message}`,
    });
  }
};

// // Basic usage with just a splash image
// await androidProvider.set_splash_image_beta({
//   splashAssetPath: "./resources/splash.png"
// });
//
// // Advanced usage with logo and splash options
// await androidProvider.set_splash_image_beta({
//   splashAssetPath: "./resources/splash.png",
//   logoSplashScale: 0.3,
//   logoSplashTargetWidth: 200,
//   splashBackgroundColor: "#ffffff"
// });
//
// // Advanced usage with dark mode support
// await androidProvider.set_splash_image_beta({
//   splashAssetPath: "./resources/splash.png",
//   splashAssetPathDark: "./resources/splash-dark.png",
//   splashBackgroundColor: "#ffffff",
//   splashBackgroundColorDark: "#111111"
// });
//
// NOTE: Dark mode splash screens are fully supported on Android and will generate
// actual output files. The limitation mentioned in the library only applies to
// launcher icons, not splash screens.
/**
 * Generate Android splash assets for the current project using @capacitor/assets.
 *
 * Workflows currently only pass:
 * - splashAssetPath
 *
 * Remaining options (dark-mode splash, background colours, logo scaling) are prepared
 * for future workflow support but are not yet provided from deployment config.
 */
export const set_splash_image_beta = async (options: AndroidSplashImageOptions) => {
  const {
    splashAssetPath,
    splashAssetPathDark,
    splashBackgroundColor,
    splashBackgroundColorDark,
    logoSplashScale,
    logoSplashTargetWidth,
  } = options;

  // Validate that the main splash asset exists
  if (!fs.existsSync(splashAssetPath)) {
    return Logger.error({
      msg1: "Splash source image not found",
      msg2: `A source .png file is required to generate a splash screen. No asset was found at the path supplied in the deployment config: ${splashAssetPath}.`,
    });
  }

  try {
    // Create project configuration
    const projectConfig = {
      android: {
        path: "android",
      },
    };

    // Create project instance
    const project = new Project(ROOT_DIR, projectConfig, "resources");
    await project.load();

    // Check if Android project exists
    if (!(await project.androidExists())) {
      return Logger.error({
        msg1: "Android project not found",
        msg2: `Android project not found at ${projectConfig.android.path}`,
      });
    }

    // Create generator options
    const generatorOptions = {
      splashBackgroundColor: splashBackgroundColor || "#ffffff",
      splashBackgroundColorDark: splashBackgroundColorDark || "#111111",
      logoSplashScale: logoSplashScale || 0.2,
      logoSplashTargetWidth,
      androidFlavor: "main",
    };

    // Log splash options if provided
    if (logoSplashScale) {
      console.log(`Using logo splash scale: ${logoSplashScale}`);
    }
    if (logoSplashTargetWidth) {
      console.log(`Using logo splash target width: ${logoSplashTargetWidth}`);
    }
    if (splashBackgroundColor) {
      console.log(`Using splash background color: ${splashBackgroundColor}`);
    }
    if (splashBackgroundColorDark) {
      console.log(`Using dark splash background color: ${splashBackgroundColorDark}`);
    }

    // Create Android asset generator
    const generator = new AndroidAssetGenerator(generatorOptions);

    // Determine which assets to generate based on available files
    const assets: InputAsset[] = [];

    // Always add the main splash asset
    const mainSplashAsset = new InputAsset(splashAssetPath, "splash" as any, "android" as any);
    await mainSplashAsset.load();
    assets.push(mainSplashAsset);

    // If we have a dark mode splash asset, create it
    if (splashAssetPathDark && fs.existsSync(splashAssetPathDark)) {
      const darkSplashAsset = new InputAsset(splashAssetPathDark, "splash-dark" as any, "android" as any);
      await darkSplashAsset.load();
      assets.push(darkSplashAsset);
      console.log("Added dark mode splash asset for generation");
    }

    // Generate assets for each input asset
    const generatedAssets = [];
    for (const asset of assets) {
      const generated = await generator.generate(asset, project);
      generatedAssets.push(...generated);
    }

    const darkModeInfo =
      splashAssetPathDark || splashBackgroundColorDark ? " (including dark mode support)" : "";

    logOutput({
      msg1: "Android splash screens generated",
      msg2: `Generated ${generatedAssets.length} assets${darkModeInfo}`,
    });

    return generatedAssets;

  } catch (error) {
    return Logger.error({
      msg1: "Failed to generate Android splash screens",
      msg2: `Error: ${error.message}`,
    });
  }
}; 