import * as fs from "fs";
import { ROOT_DIR } from "../../../paths";
import { Logger, logOutput } from "../../../utils";

// @capacitor/assets has no public programmatic API, so import internal modules directly
import { AndroidAssetGenerator } from "@capacitor/assets/dist/platforms/android";
import { AssetKind, Platform } from "@capacitor/assets/dist/definitions";
import { InputAsset } from "@capacitor/assets/dist/input-asset";
import { Project } from "@capacitor/assets/dist/project";

/**
 * Android launcher assets generation using @capacitor/assets (app icon and splash screen).
 *
 * Two modes are available:
 * 1. Full control: use generate_icon() and generate_splash() with separate image assets
 * 2. Logo mode: use generate_from_logo() with a single logo – icons and splash auto-generated
 */

export interface AndroidIconOptions {
  iconAssetPath: string;
  iconAssetForegroundPath?: string;
  iconAssetForegroundPathDark?: string; // not yet supported by Android
  iconAssetBackgroundPath?: string;
  iconAssetBackgroundPathDark?: string; // not yet supported by Android
}

export interface AndroidSplashOptions {
  splashAssetPath: string;
  splashAssetPathDark?: string;
}

/** Options for logo mode – generates all icons and splash from a single logo image. */
export interface AndroidLogoOptions {
  logoPath: string;
  logoPathDark?: string;
  iconBackgroundColor?: string;
  iconBackgroundColorDark?: string;
  splashBackgroundColor?: string;
  splashBackgroundColorDark?: string;
  /** Scale of logo on splash screen (0.0-1.0, default 0.2 = 20% of screen width) */
  logoSplashScale?: number;
  /** Fixed width for logo on splash screen (overrides logoSplashScale if set) */
  logoSplashTargetWidth?: number;
}

/** Load and validate the Android project with Capacitor assets */
async function loadAndroidProject() {
  const projectConfig = { android: { path: "android" } };
  const project = new Project(ROOT_DIR, projectConfig, "resources");
  await project.load();

  if (!(await project.androidExists())) {
    Logger.error({
      msg1: "Android project not found",
      msg2: `Android project not found at ${projectConfig.android.path}`,
    });
    return null;
  }

  return project;
}

/** Generate Android launcher icons. Supports adaptive icons when foreground+background are provided. */
export const generateIcon = async (options: AndroidIconOptions) => {
  const { iconAssetPath, iconAssetForegroundPath, iconAssetBackgroundPath } = options;

  if (!fs.existsSync(iconAssetPath)) {
    return Logger.error({
      msg1: "Icon source asset not found",
      msg2: `No asset found at: ${iconAssetPath}`,
    });
  }

  try {
    const project = await loadAndroidProject();
    if (!project) return;

    const generator = new AndroidAssetGenerator({ androidFlavor: "main" });
    const assets: InputAsset[] = [];

    const mainIconAsset = new InputAsset(iconAssetPath, AssetKind.Icon, Platform.Android);
    await mainIconAsset.load();
    assets.push(mainIconAsset);

    // Add adaptive icon assets if both foreground and background are provided
    if (
      iconAssetForegroundPath &&
      iconAssetBackgroundPath &&
      fs.existsSync(iconAssetForegroundPath) &&
      fs.existsSync(iconAssetBackgroundPath)
    ) {
      const foregroundAsset = new InputAsset(
        iconAssetForegroundPath,
        AssetKind.IconForeground,
        Platform.Android,
      );
      await foregroundAsset.load();
      assets.push(foregroundAsset);

      const backgroundAsset = new InputAsset(
        iconAssetBackgroundPath,
        AssetKind.IconBackground,
        Platform.Android,
      );
      await backgroundAsset.load();
      assets.push(backgroundAsset);
    }

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

    const hasAdaptiveIcons = assets.some(
      (asset) => asset.kind === AssetKind.IconForeground || asset.kind === AssetKind.IconBackground,
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

/** Generate Android splash screen assets from full splash images. */
export const generateSplash = async (options: AndroidSplashOptions) => {
  const { splashAssetPath, splashAssetPathDark } = options;

  if (!fs.existsSync(splashAssetPath)) {
    return Logger.error({
      msg1: "Splash source image not found",
      msg2: `No asset found at: ${splashAssetPath}`,
    });
  }

  try {
    const project = await loadAndroidProject();
    if (!project) return;

    const generator = new AndroidAssetGenerator({ androidFlavor: "main" });
    const assets: InputAsset[] = [];

    const mainSplashAsset = new InputAsset(splashAssetPath, AssetKind.Splash, Platform.Android);
    await mainSplashAsset.load();
    assets.push(mainSplashAsset);

    if (splashAssetPathDark && fs.existsSync(splashAssetPathDark)) {
      const darkSplashAsset = new InputAsset(
        splashAssetPathDark,
        AssetKind.SplashDark,
        Platform.Android,
      );
      await darkSplashAsset.load();
      assets.push(darkSplashAsset);
    }

    const generatedAssets = [];
    for (const asset of assets) {
      const generated = await generator.generate(asset, project);
      generatedAssets.push(...generated);
    }

    const darkModeInfo = splashAssetPathDark ? " (including dark mode)" : "";

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

/**
 * Generate all Android assets (icons + splash) from a single logo image.
 * The logo is centered on coloured backgrounds to create icons and splash screens.
 */
export const generateFromLogo = async (options: AndroidLogoOptions) => {
  const {
    logoPath,
    logoPathDark,
    iconBackgroundColor = "#ffffff",
    iconBackgroundColorDark = "#111111",
    splashBackgroundColor = "#ffffff",
    splashBackgroundColorDark = "#111111",
    logoSplashScale = 0.2,
    logoSplashTargetWidth,
  } = options;

  if (!fs.existsSync(logoPath)) {
    return Logger.error({
      msg1: "Logo source image not found",
      msg2: `No asset found at: ${logoPath}`,
    });
  }

  try {
    const project = await loadAndroidProject();
    if (!project) return;

    const generatorOptions = {
      iconBackgroundColor,
      iconBackgroundColorDark,
      splashBackgroundColor,
      splashBackgroundColorDark,
      logoSplashScale,
      logoSplashTargetWidth,
      androidFlavor: "main",
    };

    const generator = new AndroidAssetGenerator(generatorOptions);
    const assets: InputAsset[] = [];

    // Light mode logo generates icons + splash
    const logoAsset = new InputAsset(logoPath, AssetKind.Logo, Platform.Android);
    await logoAsset.load();
    assets.push(logoAsset);

    // Dark mode logo (optional) generates dark splash
    if (logoPathDark && fs.existsSync(logoPathDark)) {
      const logoDarkAsset = new InputAsset(logoPathDark, AssetKind.LogoDark, Platform.Android);
      await logoDarkAsset.load();
      assets.push(logoDarkAsset);
    }

    const generatedAssets = [];
    for (const asset of assets) {
      const generated = await generator.generate(asset, project);
      generatedAssets.push(...generated);
    }

    const darkModeInfo = logoPathDark ? " (including dark mode)" : "";

    logOutput({
      msg1: "Android assets generated from logo",
      msg2: `Generated ${generatedAssets.length} assets${darkModeInfo}`,
    });

    return generatedAssets;
  } catch (error) {
    return Logger.error({
      msg1: "Failed to generate Android assets from logo",
      msg2: `Error: ${error.message}`,
    });
  }
};
