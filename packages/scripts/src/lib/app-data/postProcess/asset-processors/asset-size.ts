import type { IAssetEntryHashmap } from "data-models";
import { kbToMB, logOutput, logWarning } from "shared";
import { IAssetEntriesByType } from "./types";

/** Approximate size of core build as populated to www folder (excluding assets) */
const APP_CORE_BUILD_KB = 11430;
/** Approximate size of core assets as populated to www folder (excluding assets/app_data) */
const APP_CORE_ASSETS_KB = 4740;
/** Approximate size of the app before any authored assets are added */
export const APP_CODE_KB = APP_CORE_BUILD_KB + APP_CORE_ASSETS_KB;
/** Warn if the estimated app size (build + bundled assets) exceeds this */
const MAX_BUNDLED_SIZE_MB = 150;

export interface IAssetPackSizeSummary {
  packName: string;
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
    const { totalKB, baseKB, overrides } = summariseBundledAssets(bundled.tracked);
    const lines = [`Bundled in app: ${kbToMB(totalKB)} MB`];
    if (overrides.length > 0) {
      lines.push(`  base: ${kbToMB(baseKB)} MB`, "  overrides:");
      for (const { name, sizeKB } of overrides) {
        lines.push(`    ${name}: ${kbToMB(sizeKB)} MB`);
      }
    }
    sections.push(lines.join("\n"));
    // App code isn't an asset, but counts towards the overall app size the warning guards
    const appSizeMB = kbToMB(APP_CODE_KB + totalKB);
    if (appSizeMB > MAX_BUNDLED_SIZE_MB) {
      logWarning({
        msg1: `Bundled app size too large`,
        msg2: `Bundled assets plus approx. ${kbToMB(APP_CODE_KB)} MB of app code come to ${appSizeMB} MB, should be less than ${MAX_BUNDLED_SIZE_MB} MB. Consider moving assets to an asset pack`,
      });
    }
  }

  if (packs.length > 0) {
    // Sorted by name, matching the order of the deployment report
    const sortedPacks = [...packs].sort((a, b) => (a.packName > b.packName ? 1 : -1));
    const packLines = sortedPacks.map((pack) => {
      const archiveMB = kbToMB(pack.archiveBytes / 1024);
      const rawMB = kbToMB(pack.rawBytes / 1024);
      return `  ${pack.packName}: ${archiveMB} MB download (${rawMB} MB unzipped)`;
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
export function summariseBundledAssets(assets: IAssetEntryHashmap) {
  let baseKB = 0;
  const overrideKB: Record<string, number> = {};
  for (const entry of Object.values(assets)) {
    baseKB += entry.size_kb;
    for (const [themeName, languageEntries] of Object.entries(entry.overrides || {})) {
      for (const [languageCode, languageEntry] of Object.entries(languageEntries)) {
        const key = `${themeName} / ${languageCode}`;
        overrideKB[key] = (overrideKB[key] || 0) + languageEntry.size_kb;
      }
    }
  }
  const overrides = Object.entries(overrideKB).map(([name, sizeKB]) => ({ name, sizeKB }));
  const totalKB = overrides.reduce((total, { sizeKB }) => total + sizeKB, baseKB);
  return { totalKB, baseKB, overrides };
}
