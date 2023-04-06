import * as path from "path";
import * as fs from "fs-extra";
import chalk from "chalk";
import { Command } from "commander";
import {
  generateFolderFlatMap,
  isCountryLanguageCode,
  listFolderNames,
  Logger,
  IContentsEntry,
  logOutput,
  logWarning,
  createTempDir,
  IContentsEntryHashmap,
  kbToMB,
  isThemeAssetsFolderName,
  getThemeNameFromThemeAssetFolderName,
  setNestedProperty,
  replicateDir,
  sortJsonKeys,
} from "../../../utils";
import { ActiveDeployment } from "../../deployment/get";
import type { IAssetEntryHashmap, IContentsEntryMinimal } from "data-models/deployment.model";

const ASSETS_GLOBAL_FOLDER_NAME = "global";

/***************************************************************************************
 * CLI
 * @example yarn
 *************************************************************************************/
interface IProgramOptions {
  sourceAssetsFolder: string;
}
const program = new Command("assets");
export default program
  .description("Copy app data")
  .requiredOption("--source-assets-folder <string>", "path to source assets folder")
  .action(async (options: IProgramOptions) => {
    new AssetsPostProcessor(options).run();
  });

/***************************************************************************************
 * Main Methods
 *************************************************************************************/
export class AssetsPostProcessor {
  private activeDeployment = ActiveDeployment.get();
  private stagingDir: string;
  constructor(private options: IProgramOptions) {}

  public run() {
    const { app_data } = this.activeDeployment;
    const { sourceAssetsFolder } = this.options;
    const appAssetsFolder = path.resolve(app_data.output_path, "assets");
    fs.ensureDirSync(appAssetsFolder);
    // Generate a list of all deployment assets, merge with list of assets from parent
    const sourceAssets = generateFolderFlatMap(sourceAssetsFolder, { includeLocalPath: true });
    const sourceAssetsFiltered = this.filterAppAssets(sourceAssets);
    const mergedAssets = this.mergeParentAssets(sourceAssetsFiltered);
    // Populate merged assets staging to run quality control checks and generate full contents lists
    this.stagingDir = createTempDir();
    replicateDir(sourceAssetsFolder, this.stagingDir, {
      filter_fn: ({ relativePath }) => relativePath in mergedAssets,
    });
    this.assetsQualityCheck(this.stagingDir);
    const assetsByType = this.handleAssetOverrides(mergedAssets);
    const { tracked, untracked } = assetsByType;
    this.checkTotalAssetSize(assetsByType);

    // copy deployment assets to main folder and write merged contents file
    replicateDir(this.stagingDir, appAssetsFolder);
    fs.removeSync(this.stagingDir);

    this.writeAssetsContentsFiles(appAssetsFolder, tracked, untracked);

    console.log(chalk.green("Asset Process Complete"));
  }

  /**
   * Write two entries to the app assets folder
   * `contents.json` provides a summary of all assets available to the global app with translations
   * `untracked-assets.json` provides a summary of all assets that appear in translation or theme folders
   * but do not have corresponding default global entries (only populated if entries exist)
   */
  private writeAssetsContentsFiles(
    appAssetsFolder: string,
    assetEntries: IAssetEntryHashmap,
    missingEntries: IAssetEntryHashmap
  ) {
    const contentsTarget = path.resolve(appAssetsFolder, "contents.json");
    fs.writeFileSync(contentsTarget, JSON.stringify(sortJsonKeys(assetEntries), null, 2));
    const missingTarget = path.resolve(appAssetsFolder, "untracked-assets.json");
    if (fs.existsSync(missingTarget)) fs.removeSync(missingTarget);
    if (Object.keys(missingEntries).length > 0) {
      logWarning({
        msg1: "Translated assets found without corresponding global",
        msg2: Object.keys(missingEntries).join("\n"),
      });
      fs.writeFileSync(missingTarget, JSON.stringify(sortJsonKeys(missingEntries), null, 2));
    }
  }

  private mergeParentAssets(sourceAssets: { [relativePath: string]: IContentsEntry }) {
    const { _parent_config } = this.activeDeployment;
    const mergedAssets = { ...sourceAssets };

    // If parent config exists also include any parent files that would not be overwritten by source
    if (_parent_config) {
      const parentAssetsFolder = path.resolve(_parent_config._workspace_path, "app_data", "assets");
      fs.ensureDirSync(parentAssetsFolder);
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
    const { APP_THEMES } = this.activeDeployment.app_config;
    // include global folder if filtering by language
    if (filter_language_codes?.length > 0) {
      filter_language_codes.push(ASSETS_GLOBAL_FOLDER_NAME);
    }
    // remove contents file from gdrive download
    delete sourceAssets["_contents.json"];
    // individual file filter function - includes global filter as well as language and theme filters
    function shouldInclude(entry: IContentsEntry) {
      if (assets_filter_function && !assets_filter_function(entry)) return false;
      const [folderName, ...nestedPath] = entry.relativePath.split("/");
      if (filter_language_codes?.length > 0 && isCountryLanguageCode(folderName)) {
        return filter_language_codes.includes(folderName);
      }
      if (isThemeAssetsFolderName(folderName)) {
        const themeName = getThemeNameFromThemeAssetFolderName(folderName);
        if (!APP_THEMES.available.includes(themeName)) return false;
        const languageFolder = nestedPath[0];
        if (filter_language_codes?.length > 0 && isCountryLanguageCode(languageFolder)) {
          return filter_language_codes.includes(languageFolder);
        }
      }
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

  /** Ensure asset folders are named correctly */
  private assetsQualityCheck(sourceFolder: string) {
    const output = {
      hasGlobalFolder: false,
      languageFolders: [],
      themeFolders: [],
      invalidFolders: [],
    };
    const topLevelFolders = listFolderNames(sourceFolder);
    for (const folderName of topLevelFolders) {
      if (folderName === ASSETS_GLOBAL_FOLDER_NAME) output.hasGlobalFolder = true;
      else {
        if (isCountryLanguageCode(folderName)) output.languageFolders.push(folderName);
        // HACK - currently theme folders being used with languages so include
        // TODO - need to determine better way to distinguish language from theme assets
        else if (isThemeAssetsFolderName(folderName)) output.themeFolders.push(folderName);
        else output.invalidFolders.push(folderName);
      }
    }
    if (!output.hasGlobalFolder) {
      Logger.error({
        msg1: "Assets global folder not found",
        msg2: `Assets folder should include a folder named "${ASSETS_GLOBAL_FOLDER_NAME}"`,
      });
    }
    if (output.invalidFolders.length > 0) {
      Logger.error({
        msg1: "Asset folders named incorrectly",
        msg2: `Invalid language codes: [${output.invalidFolders.join(", ")}]`,
      });
    }
  }

  private checkTotalAssetSize(sourceAssets: IAssetEntriesByType) {
    let totalSize = 0;
    let themeAndLanguageSizes = { default: { total: 0, global: 0 } };
    Object.values(sourceAssets).forEach((assetEntryHashmap: IAssetEntryHashmap) => {
      Object.values(assetEntryHashmap).forEach((entry) => {
        Object.entries(entry.overrides || {}).forEach(([themeName, languageEntries]) => {
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
      });
    });

    const themeLangSizesMBSummary = Object.entries(themeAndLanguageSizes)
      .map(([themeName, themeEntry]) => {
        const languageBreakdown = Object.entries(themeEntry)
          .map(([language, size]) => `${language}: ${kbToMB(size)} MB`)
          .join("\n    ");
        return `${themeName} theme:\n  ${languageBreakdown}`;
      })
      .join("\n");
    const totalSizeMB = kbToMB(totalSize);
    const maxWarningSize = 145;
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
      assetPathName = assetPathName.replace(`global/`, "").replace(`theme_default/`, "");

      // If using overrides ensure both theme and language provided, and place in corresponding folder
      if (themeVariation || langVariation) {
        themeVariation ??= "theme_default";
        langVariation ??= "global";
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
  private contentsToAssetEntry(entry: IContentsEntry): IContentsEntryMinimal {
    const { md5Checksum, size_kb } = entry;
    return { size_kb, md5Checksum };
  }
}

interface IAssetEntriesByType {
  /** Assets that have a global in the default theme, including their respective overrides */
  tracked: IAssetEntryHashmap;
  /** Assets that appear in translation or theme folders but have no corresponding global in the default theme */
  untracked: IAssetEntryHashmap;
}
