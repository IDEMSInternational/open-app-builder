import * as fs from "fs";
import { ROOT_DIR } from "../../../paths";
import { Logger, logOutput } from "../../../utils";

// @capacitor/assets has no public programmatic API, so import internal modules directly
import { AndroidAssetGenerator } from "@capacitor/assets/dist/platforms/android";
import type { AssetKind, Platform } from "@capacitor/assets/dist/definitions";
import { InputAsset } from "@capacitor/assets/dist/input-asset";
import { Project } from "@capacitor/assets/dist/project";

const DEFAULT_BACKGROUND_COLOR = "#ffffff";

/**
 * Android launcher assets generation using @capacitor/assets (app icon and splash screen).
 *
 * Canonical: use generateAssets(logoPath, backgroundColor) for logo + single background colour.
 * Legacy: use generateIcon and generateSplash with separate icon/splash images (deprecated config).
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
}

/** Options for canonical logo mode – single logo + background colour. */
export interface AndroidGenerateAssetsOptions {
  logoPath: string;
  backgroundColor: string;
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

    const mainIconAsset = new InputAsset(iconAssetPath, "icon" as AssetKind, "android" as Platform);
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
        "icon-foreground" as AssetKind,
        "android" as Platform,
      );
      await foregroundAsset.load();
      assets.push(foregroundAsset);

      const backgroundAsset = new InputAsset(
        iconAssetBackgroundPath,
        "icon-background" as AssetKind,
        "android" as Platform,
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
      (asset) =>
        asset.kind === "icon-foreground" || asset.kind === "icon-background",
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

/** Generate Android splash screen assets from full splash image (legacy). */
export const generateSplash = async (options: AndroidSplashOptions) => {
  const { splashAssetPath } = options;

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
    const mainSplashAsset = new InputAsset(
      splashAssetPath,
      "splash" as AssetKind,
      "android" as Platform,
    );
    await mainSplashAsset.load();

    const generatedAssets = await generator.generate(mainSplashAsset, project);

    logOutput({
      msg1: "Android splash screens generated",
      msg2: `Generated ${generatedAssets.length} assets`,
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
 * Generate all Android assets (icon + splash) from a single logo and background colour (canonical).
 * If backgroundColor is omitted, logs a warning and uses default white.
 */
export const generateAssets = async (options: AndroidGenerateAssetsOptions) => {
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
    const project = await loadAndroidProject();
    if (!project) return;

    const generatorOptions = {
      iconBackgroundColor: backgroundColor,
      iconBackgroundColorDark: backgroundColor,
      splashBackgroundColor: backgroundColor,
      splashBackgroundColorDark: backgroundColor,
      // @capacitor/assets default: logo scaled to ~20% of splash dimension
      // Android: scale is applied relative to splash dimension; 0.2 gives ~20% of screen.
      logoSplashScale: 0.2,
      androidFlavor: "main",
    };

    const generator = new AndroidAssetGenerator(generatorOptions);
    const logoAsset = new InputAsset(logoPath, "logo" as AssetKind, "android" as Platform);
    await logoAsset.load();

    const generatedAssets = await generator.generate(logoAsset, project);

    logOutput({
      msg1: "Android assets generated from logo",
      msg2: `Generated ${generatedAssets.length} assets`,
    });

    return generatedAssets;
  } catch (error) {
    return Logger.error({
      msg1: "Failed to generate Android assets from logo",
      msg2: `Error: ${error.message}`,
    });
  }
};
