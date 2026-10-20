import { kbToMB, logOutput, logWarning } from "shared";
import { IAssetEntriesByType } from "./types";

/** Approximate size of core build as populated to www folder (excluding assets) */
const APP_CORE_BUILD_KB = 7 * 1024;
/** Approximate size of core assets as populated to www folder (excluding assets/app_data) */
const APP_CORE_ASSETS_KB = 5 * 1024;
/** Warn if the estimated app size (build + bundled assets) exceeds this */
const MAX_BUNDLED_SIZE_MB = 150;

export interface IAssetPackSizeSummary {
  packName: string;
  archiveFileName: string;
  /** Size of the zip the app downloads */
  archiveBytes: number;
  /** Combined size of the files once extracted */
  rawBytes: number;
}

/**
 * Log a single summary of how asset size is split between what ships inside the app and what
 * is downloaded later as asset packs
 */
export function logAssetSizeSummary(params: {
  bundled?: IAssetEntriesByType;
  packs: IAssetPackSizeSummary[];
}) {
  const { bundled, packs } = params;
  const sections: string[] = [];

  if (bundled) {
    const { bundledAssetsKB, lines } = summariseBundledAssets(bundled);
    sections.push(
      [`Bundled in app: ${kbToMB(bundledAssetsKB)} MB`, ...lines.map((line) => `  ${line}`)].join(
        "\n"
      )
    );
    // App code isn't an asset, but counts towards the overall app size the warning guards
    const appCodeKB = APP_CORE_BUILD_KB + APP_CORE_ASSETS_KB;
    const appSizeMB = kbToMB(appCodeKB + bundledAssetsKB);
    if (appSizeMB > MAX_BUNDLED_SIZE_MB) {
      logWarning({
        msg1: `Bundled app size too large`,
        msg2: `Bundled assets plus approx. ${kbToMB(appCodeKB)} MB of app code come to ${appSizeMB} MB, should be less than ${MAX_BUNDLED_SIZE_MB} MB. Consider moving assets to an asset pack`,
      });
    }
  }

  if (packs.length > 0) {
    const packLines = packs.map((pack) => {
      const archiveMB = kbToMB(pack.archiveBytes / 1024);
      const rawMB = kbToMB(pack.rawBytes / 1024);
      return `  ${pack.packName}: ${archiveMB} MB download (${rawMB} MB unzipped)\n    ${pack.archiveFileName}`;
    });
    sections.push(["Asset packs (managed in remote assets storage):", ...packLines].join("\n"));
  }

  if (sections.length > 0) {
    logOutput({ msg1: "Assets Summary", msg2: sections.join("\n\n") });
  }
}

/**
 * Sum the size of bundled assets, split into base files (default theme, no language) and any
 * theme/language overrides
 */
function summariseBundledAssets(assets: IAssetEntriesByType) {
  let baseKB = 0;
  const overrideKB: Record<string, number> = {};
  for (const entry of Object.values(assets.tracked)) {
    baseKB += entry.size_kb;
    for (const [themeName, languageEntries] of Object.entries(entry.overrides || {})) {
      for (const [languageCode, languageEntry] of Object.entries(languageEntries)) {
        const key = `${themeName} / ${languageCode}`;
        overrideKB[key] = (overrideKB[key] || 0) + languageEntry.size_kb;
      }
    }
  }
  const overrideEntries = Object.entries(overrideKB);
  const bundledAssetsKB = overrideEntries.reduce((total, [, kb]) => total + kb, baseKB);
  const lines = [`base: ${kbToMB(baseKB)} MB`];
  if (overrideEntries.length > 0) {
    lines.push("overrides:");
    for (const [key, kb] of overrideEntries) {
      lines.push(`  ${key}: ${kbToMB(kb)} MB`);
    }
  }
  return { bundledAssetsKB, lines };
}
