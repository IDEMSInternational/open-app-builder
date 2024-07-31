import * as path from "path";
import fse from "fs-extra";
import fs from "fs/promises";
import chalk from "chalk";
import { Command } from "commander";
import {
  generateFolderFlatMap,
  Logger,
  IContentsEntry,
  logOutput,
  logWarning,
  createTempDirAsync,
  IContentsEntryHashmap,
  kbToMB,
  setNestedProperty,
  replicateDir,
  sortJsonKeys,
  getNestedProperty,
  copyFileWithTimestamp,
} from "../../../utils";
import { ActiveDeployment } from "../../deployment/get";
import type { IAssetEntryHashmap, IAssetContentsEntryMinimal } from "data-models/deployment.model";
import { resolve } from "path";

/**
 * Legacy folder used to differentiate language assets
 * Any assets placed in this folder will be treated as parent-level
 */
const ASSETS_GLOBAL_FOLDER_NAME = "global";

/** Approximate size of core build as populated to www folder (excluding assets) */
const APP_CORE_BUILD_KB = 7 * 1024;
/** Approximate size of core assets as populated to www folder (excluding assets/app_data) */
const APP_CORE_ASSETS_KB = 5 * 1024;
const APP_CORE_SIZE_KB = {
  total: APP_CORE_BUILD_KB + APP_CORE_ASSETS_KB,
};

/***************************************************************************************
 * CLI
 * @example yarn
 *************************************************************************************/
interface IProgramOptions {
  sourceAssetsFolders: string; // comma-separated string
}
interface IAssetPostProcessorOptions {
  sourceAssetsFolders: string[];
}
const program = new Command("assets");
export default program
  .description("Copy app data")
  .requiredOption(
    "--source-assets-folders <string>",
    "comma-separated paths to source assets folders"
  )
  .action(async (options: IProgramOptions) => {
    const mappedOptions: IAssetPostProcessorOptions = {
      sourceAssetsFolders: options.sourceAssetsFolders.split(",").map((s) => s.trim()),
    };
    await new AssetsPostProcessor(mappedOptions).run();
  });

/***************************************************************************************
 * Main Methods
 *************************************************************************************/
export class AssetsPostProcessor {
  private activeDeployment = ActiveDeployment.get();
  private stagingDir: string;
  constructor(private options: IAssetPostProcessorOptions) {}

  public async run() {
    const { app_data } = this.activeDeployment;
    const { sourceAssetsFolders } = this.options;
    const { _parent_config } = this.activeDeployment;
    const appAssetsFolder = path.resolve(app_data.output_path, "assets");
    await fs.mkdir(appAssetsFolder, { recursive: true });
    // Populate merged assets staging to run quality control checks and generate full contents lists
    this.stagingDir = await createTempDirAsync();
    const mergedAssetsHashmap: IContentsEntryHashmap = {};

    // Include parent config in list of source assets
    // TODO - may want to reconsider this functionality in the future given ability to use
    // multiple input sources instead
    if (_parent_config) {
      const parentAssetsFolder = path.resolve(_parent_config._workspace_path, "app_data", "assets");
      await fs.mkdir(parentAssetsFolder);
      sourceAssetsFolders.unshift(parentAssetsFolder);
    }

    // Generate a list of all deployment assets, merged across input sources
    for (const sourceAssetsFolder of sourceAssetsFolders) {
      const sourceAssets = generateFolderFlatMap(sourceAssetsFolder, { includeLocalPath: true });
      const sourceAssetsFiltered = this.filterAppAssets(sourceAssets);
      Object.entries(sourceAssetsFiltered).forEach(([relativePath, entry]) => {
        if (mergedAssetsHashmap.hasOwnProperty(relativePath)) {
          //  TODO - log override
        }
        mergedAssetsHashmap[relativePath] = entry;
      });
    }

    // Copy all assets to staging directory, preserving timestamps
    for (const entry of Object.values(mergedAssetsHashmap)) {
      const targetPath = resolve(this.stagingDir, entry.relativePath);
      copyFileWithTimestamp(entry.localPath, targetPath, entry.modifiedTime);
    }

    this.assetsQualityCheck(this.stagingDir);
    const assetsByType = this.handleAssetOverrides(mergedAssetsHashmap);
    const { tracked, untracked } = assetsByType;
    this.checkTotalAssetSize(assetsByType);

    // copy deployment assets to main folder and write merged contents file
    replicateDir(this.stagingDir, appAssetsFolder);
    await fs.rm(this.stagingDir, { recursive: true, force: true });

    await this.writeAssetsContentsFiles(appAssetsFolder, tracked, untracked);
    console.log(chalk.green("Asset Process Complete"));
  }

  /**
   * Write two entries to the app assets folder
   * `contents.json` provides a summary of all assets available to the global app with translations
   * `untracked-assets.json` provides a summary of all assets that appear in translation or theme folders
   * but do not have corresponding default global entries (only populated if entries exist)
   */
  private async writeAssetsContentsFiles(
    appAssetsFolder: string,
    assetEntries: IAssetEntryHashmap,
    missingEntries: IAssetEntryHashmap
  ) {
    if (await fse.pathExists(appAssetsFolder)) {
      const contentsTarget = path.resolve(appAssetsFolder, "contents.json");
      await fs.writeFile(contentsTarget, JSON.stringify(sortJsonKeys(assetEntries), null, 2));
      const missingTarget = path.resolve(appAssetsFolder, "untracked-assets.json");
      if (await fse.pathExists(missingTarget)) {
        await fs.rm(missingTarget, { recursive: true, force: true });
      }

      if (Object.keys(missingEntries).length > 0) {
        logWarning({
          msg1: "Assets override found without corresponding entry",
          msg2: Object.keys(missingEntries).join("\n"),
        });
        await fs.writeFile(missingTarget, JSON.stringify(sortJsonKeys(missingEntries), null, 2));
      }
    }
  }

  private async mergeParentAssets(sourceAssets: { [relativePath: string]: IContentsEntry }) {
    const { _parent_config } = this.activeDeployment;
    const mergedAssets = { ...sourceAssets };

    // If parent config exists also include any parent files that would not be overwritten by source
    if (_parent_config) {
      const parentAssetsFolder = path.resolve(_parent_config._workspace_path, "app_data", "assets");
      await fs.mkdir(parentAssetsFolder);
      const parentAssets = generateFolderFlatMap(parentAssetsFolder, { includeLocalPath: true });
      const filteredParentAssets = this.filterAppAssets(parentAssets);
      Object.keys(filteredParentAssets).forEach((relativePath) => {
        if (!mergedAssets.hasOwnProperty(relativePath)) {
          mergedAssets[relativePath] = { ...parentAssets[relativePath] };
        }
      });
    }
    return mergedAssets;
  }

  /**
   * Take a list of all potential app assets and return a list of only those that match
   * both app asset filter functions and language code filter functions
   */
  private filterAppAssets(sourceAssets: { [relativePath: string]: IContentsEntry }) {
    const filtered: typeof sourceAssets = {};
    const { assets_filter_function } = this.activeDeployment.app_data;
    const { filter_language_codes } = this.activeDeployment.translations;
    const filter_theme_names = this.activeDeployment.app_config.APP_THEMES.available;

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

  private assetsQualityCheck(sourceFolder: string) {
    // TODO - add any relevant checks
    // (previously checked asset folder names but no longer relevant)
  }

  private checkTotalAssetSize(sourceAssets: IAssetEntriesByType) {
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

  /**
   * Make a list of any source assets that have language-code or theme overrides,
   * and any language assets that are missing corresponding globals.
   * Flatten override files to sit alongside their target assets
   */
  private handleAssetOverrides(sourceAssets: IContentsEntryHashmap) {
    const entries: IAssetEntriesByType = {
      tracked: {},
      untracked: {},
    };
    // split assets to separate global, translated and theme assets
    Object.entries(sourceAssets).forEach(([relativePath, entry]) => {
      const assetEntry = this.contentsToAssetEntry(entry);
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
  private contentsToAssetEntry(entry: IContentsEntry): IAssetContentsEntryMinimal {
    const { md5Checksum, size_kb } = entry;
    return { size_kb, md5Checksum };
  }
}

/**
 * Check whether a string matches the expected format for the
 * name of a folder containing theme-specific assets.
 * Currently expects name to begin 'theme_'
 */
function isThemeAssetsFolderName(str: string) {
  return str.startsWith("theme_");
}

/**
 * Simple regex to try and match standard country-language format
 * Currently restricted to any codes in the format `ab_ab` or `ab_abc`
 */
function isCountryLanguageCode(str: string) {
  const regex = /^[a-z]{2}_[a-z]{2,3}$/gi;
  return regex.test(str);
}

interface IAssetEntriesByType {
  /** Assets that have a global in the default theme, including their respective overrides */
  tracked: IAssetEntryHashmap;
  /** Assets that appear in translation or theme folders but have no corresponding global in the default theme */
  untracked: IAssetEntryHashmap;
}
