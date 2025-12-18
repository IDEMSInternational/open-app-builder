import * as fs from "fs";
import { ROOT_DIR } from "../../../paths";
import { Logger, logOutput } from "../../../utils";

// @capacitor/assets has no public programmatic API, so import internal modules directly
import { AndroidAssetGenerator } from "@capacitor/assets/dist/platforms/android";
import { InputAsset } from "@capacitor/assets/dist/input-asset";
import { Project } from "@capacitor/assets/dist/project";

/**
 * Android launcher assets generation using @capacitor/assets (app icon and splash screen).
 *
 * Workflows currently only pass basic options (icon paths, splash path).
 * Dark-mode variants, background colours, and logo scaling options are supported but not yet wired from config.
 */

export interface AndroidLauncherIconOptions {
  iconAssetPath: string;
  iconAssetForegroundPath?: string;
  iconAssetForegroundPathDark?: string; // not yet used
  iconAssetBackgroundPath?: string;
  iconBackgroundColour?: string;
  iconBackgroundColourDark?: string; // not yet used
}

export interface AndroidSplashImageOptions {
  splashAssetPath: string;
  splashAssetPathDark?: string; // not yet used
  splashBackgroundColor?: string;
  splashBackgroundColorDark?: string;
  logoSplashScale?: number;
  logoSplashTargetWidth?: number;
}

/** Generate Android launcher icons. Supports adaptive icons when foreground+background are provided. */
export const generate_icon = async (options: AndroidLauncherIconOptions) => {
  const {
    iconAssetPath,
    iconAssetForegroundPath,
    iconAssetBackgroundPath,
    iconBackgroundColour,
    iconBackgroundColourDark,
  } = options;

  if (!fs.existsSync(iconAssetPath)) {
    return Logger.error({
      msg1: "Icon source asset not found",
      msg2: `No asset found at: ${iconAssetPath}`,
    });
  }

  try {
    const projectConfig = { android: { path: "android" } };
    const project = new Project(ROOT_DIR, projectConfig, "resources");
    await project.load();

    if (!(await project.androidExists())) {
      return Logger.error({
        msg1: "Android project not found",
        msg2: `Android project not found at ${projectConfig.android.path}`,
      });
    }

    const generatorOptions: Record<string, unknown> = {
      iconBackgroundColor: iconBackgroundColour || "#ffffff",
      androidFlavor: "main",
    };
    if (iconBackgroundColourDark) {
      generatorOptions.iconBackgroundColorDark = iconBackgroundColourDark;
    }

    const generator = new AndroidAssetGenerator(generatorOptions);
    const assets: InputAsset[] = [];

    const mainIconAsset = new InputAsset(iconAssetPath, "icon" as any, "android" as any);
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
        "icon-foreground" as any,
        "android" as any,
      );
      await foregroundAsset.load();
      assets.push(foregroundAsset);

      const backgroundAsset = new InputAsset(
        iconAssetBackgroundPath,
        "icon-background" as any,
        "android" as any,
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

/** Generate Android splash screen assets. */
export const generate_splash = async (options: AndroidSplashImageOptions) => {
  const {
    splashAssetPath,
    splashAssetPathDark,
    splashBackgroundColor,
    splashBackgroundColorDark,
    logoSplashScale,
    logoSplashTargetWidth,
  } = options;

  if (!fs.existsSync(splashAssetPath)) {
    return Logger.error({
      msg1: "Splash source image not found",
      msg2: `No asset found at: ${splashAssetPath}`,
    });
  }

  try {
    const projectConfig = { android: { path: "android" } };
    const project = new Project(ROOT_DIR, projectConfig, "resources");
    await project.load();

    if (!(await project.androidExists())) {
      return Logger.error({
        msg1: "Android project not found",
        msg2: `Android project not found at ${projectConfig.android.path}`,
      });
    }

    const generatorOptions = {
      splashBackgroundColor: splashBackgroundColor || "#ffffff",
      splashBackgroundColorDark: splashBackgroundColorDark || "#111111",
      logoSplashScale: logoSplashScale || 0.2,
      logoSplashTargetWidth,
      androidFlavor: "main",
    };

    const generator = new AndroidAssetGenerator(generatorOptions);
    const assets: InputAsset[] = [];

    const mainSplashAsset = new InputAsset(splashAssetPath, "splash" as any, "android" as any);
    await mainSplashAsset.load();
    assets.push(mainSplashAsset);

    if (splashAssetPathDark && fs.existsSync(splashAssetPathDark)) {
      const darkSplashAsset = new InputAsset(
        splashAssetPathDark,
        "splash-dark" as any,
        "android" as any,
      );
      await darkSplashAsset.load();
      assets.push(darkSplashAsset);
    }

    const generatedAssets = [];
    for (const asset of assets) {
      const generated = await generator.generate(asset, project);
      generatedAssets.push(...generated);
    }

    const darkModeInfo =
      splashAssetPathDark || splashBackgroundColorDark ? " (including dark mode)" : "";

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
