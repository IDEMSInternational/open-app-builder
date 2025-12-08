import { kbToMB, logOutput, logWarning } from "shared";
import { IAssetEntriesByType } from "./types";

/** Approximate size of core build as populated to www folder (excluding assets) */
const APP_CORE_BUILD_KB = 7 * 1024;
/** Approximate size of core assets as populated to www folder (excluding assets/app_data) */
const APP_CORE_ASSETS_KB = 5 * 1024;
const APP_CORE_SIZE_KB = {
  total: APP_CORE_BUILD_KB + APP_CORE_ASSETS_KB,
};

export function checkTotalAssetSize(sourceAssets: IAssetEntriesByType) {
  let totalSize = APP_CORE_SIZE_KB.total;
  let themeAndLanguageSizes = {
    app_core: APP_CORE_SIZE_KB,
    theme_default: { total: 0, global: 0 },
  };
  Object.values(sourceAssets.tracked).forEach((entry) => {
    totalSize += entry.size_kb;
    themeAndLanguageSizes.theme_default.total += entry.size_kb;
    themeAndLanguageSizes.theme_default.global += entry.size_kb;
    if (entry.overrides) {
      Object.entries(entry.overrides).forEach(([themeName, languageEntries]) => {
        Object.entries(languageEntries).forEach(([languageCode, languageEntry]) => {
          const assetSize = languageEntry.size_kb;
          totalSize += assetSize;
          themeAndLanguageSizes[themeName] ??= {};
          themeAndLanguageSizes[themeName].total ??= 0;
          themeAndLanguageSizes[themeName].total += assetSize;
          themeAndLanguageSizes[themeName][languageCode] ??= 0;
          themeAndLanguageSizes[themeName][languageCode] += assetSize;
        });
      });
    }
  });

  const themeLangSizesMBSummary = Object.entries(themeAndLanguageSizes)
    .map(([themeName, themeEntry]) => {
      const languageBreakdown = Object.entries(themeEntry)
        .map(([language, size]) => `${language}: ${kbToMB(size)} MB`)
        .join("\n    ");
      return `${themeName}:\n  ${languageBreakdown}`;
    })
    .join("\n");
  const totalSizeMB = kbToMB(totalSize);
  const maxWarningSize = 150;
  if (totalSizeMB > maxWarningSize) {
    logWarning({
      msg1: `Asset files too large`,
      msg2: `All assets should combine to be less than ${maxWarningSize}MB`,
    });
  }

  logOutput({
    msg1: "Assets Summary",
    msg2: `Total size: ${totalSizeMB} MB\n\nBreakdown by theme and language:\n${themeLangSizesMBSummary}`,
  });
}
