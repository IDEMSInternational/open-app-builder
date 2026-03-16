import {
  getNestedProperty,
  IContentsEntry,
  IContentsEntryHashmap,
  Logger,
  setNestedProperty,
} from "shared";
import { isCountryLanguageCode, isThemeAssetsFolderName } from "./utils";
import { IAssetContentsEntryMinimal } from "data-models";
import { IAssetEntriesByType } from "./types";

/**
 * Legacy folder used to differentiate language assets
 * Any assets placed in this folder will be treated as parent-level
 */
const ASSETS_GLOBAL_FOLDER_NAME = "global";

/**
 * Make a list of any source assets that have language-code or theme overrides,
 * and any language assets that are missing corresponding globals.
 * Flatten override files to sit alongside their target assets
 */
export function handleAssetOverrides(sourceAssets: IContentsEntryHashmap) {
  const entries: IAssetEntriesByType = {
    tracked: {},
    untracked: {},
  };
  // split assets to separate global, translated and theme assets
  Object.entries(sourceAssets).forEach(([relativePath, entry]) => {
    const assetEntry = contentsToAssetEntry(entry);
    const pathSegments = relativePath.split("/");

    let themeVariation = pathSegments.find((segment) => isThemeAssetsFolderName(segment));
    let langVariation = pathSegments.find((segment) => isCountryLanguageCode(segment));
    let assetPathName = relativePath;

    let overridePath = "";

    // Remove additional nesting for default lang and theme folders
    assetPathName = assetPathName
      .replace(`${ASSETS_GLOBAL_FOLDER_NAME}/`, "")
      .replace(`theme_default/`, "");

    // If using overrides ensure both theme and language provided, and place in corresponding folder
    if (themeVariation || langVariation) {
      themeVariation ??= "theme_default";
      langVariation ??= ASSETS_GLOBAL_FOLDER_NAME;
      // Replace override segments to leave named asset segment path
      assetPathName = assetPathName
        .replace(`${themeVariation}/`, "")
        .replace(`${langVariation}/`, "");

      overridePath = `overrides.${themeVariation}.${langVariation}`;
    }

    // Provide explicit path to file when not same as entry name (e.g. overrides)
    if (entry.relativePath !== assetPathName) {
      assetEntry.filePath = relativePath;
    }
    if (getNestedProperty(entries.tracked[assetPathName], overridePath)) {
      Logger.error({
        msg1: "Duplicate overrides detected",
        msg2: `${assetPathName} [${themeVariation}] [${langVariation}]`,
        logOnly: true,
      });
    }

    // Merge overrides or top-level asset data into main entries
    entries.tracked[assetPathName] = setNestedProperty(
      overridePath,
      assetEntry,
      entries.tracked[assetPathName]
    );
  });

  // Check for assets which have no default version, and move them to "untracked"
  Object.entries(entries.tracked).forEach(([assetPathName, assetEntry]) => {
    if (assetEntry.overrides && !assetEntry.md5Checksum) {
      entries.untracked[assetPathName] = assetEntry;
      delete entries.tracked[assetPathName];
    }
  });
  return entries;
}

/** Strip additional fields from contents entry to provide cleaner asset entry */
function contentsToAssetEntry(entry: IContentsEntry): IAssetContentsEntryMinimal {
  const { md5Checksum, size_kb } = entry;
  return { size_kb, md5Checksum };
}
