import { IContentsEntry } from "shared";
import { isCountryLanguageCode, isThemeAssetsFolderName } from "./utils";
import { IDeploymentConfigJson } from "data-models";

/**
 * Take a list of all potential app assets and return a list of only those that match
 * both app asset filter functions and language code filter functions
 */
export function filterAppAssets(
  sourceAssets: { [relativePath: string]: IContentsEntry },
  activeDeployment: IDeploymentConfigJson
) {
  const filtered: typeof sourceAssets = {};
  const { assets_filter_function } = activeDeployment.app_data;
  const { filter_language_codes } = activeDeployment.translations;
  // themes are defined in runtime app config which may not be available during scripts
  const filter_theme_names = activeDeployment.app_config.APP_THEMES?.available || [];

  // remove contents file from gdrive download
  delete sourceAssets["_contents.json"];

  // individual file filter function - includes global filter as well as language and theme filters
  function shouldInclude(entry: IContentsEntry) {
    const assetPaths = entry.relativePath.split("/");
    const assetLang = assetPaths.find((p) => (isCountryLanguageCode(p) ? p : false));
    let assetTheme = assetPaths.find((p) => isThemeAssetsFolderName(p));
    if (assetTheme) {
      assetTheme = assetTheme.replace("theme_", "");
    }
    // filter based on language, theme or function
    if (assetLang && filter_language_codes && !filter_language_codes.includes(assetLang))
      return false;
    if (assetTheme && !filter_theme_names.includes(assetTheme)) return false;
    if (assets_filter_function && !assets_filter_function(entry)) return false;
    // exclude metadata file populated by gdrive downloader
    if (entry.relativePath === "_metadata.json") return false;

    return true;
  }
  // process files
  Object.entries(sourceAssets).forEach(([name, entry]) => {
    if (shouldInclude(entry)) {
      filtered[name] = entry;
    }
  });
  return filtered;
}
