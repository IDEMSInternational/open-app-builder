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
} from "../../../utils";
import { ActiveDeployment } from "../../deployment/get";
import type { IAssetEntry, IAssetEntryHashmap } from "data-models/deployment.model";

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
    const stagingDir = createTempDir();
    this.copyAssetsToFolder(mergedAssets, stagingDir);
    this.assetsQualityCheck(stagingDir);
    this.checkTotalAssetSize(mergedAssets);
    const { global, missing } = this.listAssetOverrides(mergedAssets);
    fs.removeSync(stagingDir);

    // copy deployment assets to main folder and write merged contents file
    this.copyAssetsToFolder(sourceAssetsFiltered, appAssetsFolder);
    this.writeAssetsContentsFiles(appAssetsFolder, global, missing);

    console.log(chalk.green("Asset Process Complete"));
  }

  /**
   * Write two entries to the app assets folder
   * `contents.json` provides a summary of all assets available to the global app with translations
   * `orphaned-assets.json` provides a summary of all assets that appear in translation folders
   * but do not have corresponding global entries (only populated if entries exist)
   */
  private writeAssetsContentsFiles(
    appAssetsFolder: string,
    assetEntries: IAssetEntryHashmap,
    missingEntries: IAssetEntryHashmap
  ) {
    const contentsTarget = path.resolve(appAssetsFolder, "contents.json");
    fs.writeFileSync(contentsTarget, JSON.stringify(assetEntries, null, 2));

    const missingTarget = path.resolve(appAssetsFolder, "orphaned-assets.json");
    if (fs.existsSync(missingTarget)) fs.removeSync(missingTarget);
    if (Object.keys(missingEntries).length > 0) {
      logWarning({
        msg1: "Translated assets found without corresponding global",
        msg2: Object.keys(missingEntries).join("\n"),
      });
      fs.writeFileSync(missingTarget, JSON.stringify(missingEntries, null, 2));
    }
  }

  private copyAssetsToFolder(
    sourceAssets: { [relativePath: string]: IContentsEntry },
    targetDir: string
  ) {
    fs.ensureDirSync(targetDir);
    fs.emptyDirSync(targetDir);
    Object.values(sourceAssets).forEach(({ localPath, relativePath, modifiedTime }) => {
      const target = path.resolve(targetDir, relativePath);
      fs.ensureDirSync(path.dirname(target));
      fs.copyFileSync(localPath, target);
      const mtime = new Date(modifiedTime);
      fs.utimesSync(target, mtime, mtime);
    });
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
      const folderName = entry.relativePath.split("/")[0];
      if (filter_language_codes?.length > 0 && isCountryLanguageCode(folderName)) {
        return filter_language_codes.includes(folderName);
      }
      if (isThemeAssetsFolderName(folderName)) {
        const folderThemeName = folderName.replace("theme_", "");
        return APP_THEMES.available.includes(folderThemeName);
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

  private checkTotalAssetSize(sourceAssets: { [relativePath: string]: IAssetEntry }) {
    let totalSize = 0;
    let langSizes = { global: 0 };
    Object.values(sourceAssets).forEach((entry) => {
      totalSize += entry.size_kb;
      langSizes.global += entry.size_kb;

      // repeat for nested translation entries (TODO - could give breakdown by language)
      if (entry.translations) {
        Object.entries(entry.translations).forEach(([translated_key, translatedEntry]) => {
          totalSize += translatedEntry.size_kb;
          if (!langSizes[translated_key]) langSizes[translated_key] = 0;
          langSizes[translated_key] += translatedEntry.size_kb;
        });
      }
    });
    // Log output
    const langSizesMBSummary = Object.entries(langSizes)
      // Make a list by
      .map(([key, value]) => `${key}: ${kbToMB(value)} MB`)
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
      msg2: `Total size: ${totalSizeMB} MB\n\n${langSizesMBSummary}`,
    });
  }

  /**
   * Make a list of any source assets that have language-code or theme overrides,
   * and any language assets that are missing corresponding globals
   */
  private listAssetOverrides(sourceAssets: IContentsEntryHashmap) {
    const entries: IAssetEntriesByType = {
      global: {},
      translations: {},
      themeVariations: {},
      missing: {},
    };
    const globalFolder = ASSETS_GLOBAL_FOLDER_NAME;

    // split assets to separate global, translated and theme assets
    Object.entries(sourceAssets).forEach(([relativePath, entry]) => {
      let [baseFolder, ...nestedPaths] = relativePath.split("/");
      let nestedPath = nestedPaths.join("/");
      const assetEntry = this.contentsToAssetEntry(entry);
      if (baseFolder === globalFolder) {
        entries.global[nestedPath] = assetEntry;
      } else if (baseFolder.startsWith("theme_")) {
        baseFolder = baseFolder.replace("theme_", "");
        nestedPath = nestedPath.replace(`${ASSETS_GLOBAL_FOLDER_NAME}/`, "");
        entries.themeVariations[baseFolder] ??= {};
        entries.themeVariations[baseFolder][nestedPath] = assetEntry;
      } else {
        entries.translations[baseFolder] ??= {};
        entries.translations[baseFolder][nestedPath] = assetEntry;
      }
    });

    mergeAssetOverrides("translations");
    mergeAssetOverrides("themeVariations");
    return entries;

    /** Update global asset entries to include language or theme overrides */
    function mergeAssetOverrides(type: "translations" | "themeVariations") {
      // process assets by language, copying a reference for any language assets to corresponding
      // global. Track as missing if global does not exist
      Object.entries(entries[type]).forEach(([baseName, langHashmap]) => {
        Object.entries(langHashmap).forEach(([nestedPath, entry]) => {
          if (entries.global.hasOwnProperty(nestedPath)) {
            entries.global[nestedPath][type] ??= {};
            entries.global[nestedPath][type][baseName] = entry;
          } else {
            // add metadata to track where missing asset came from
            entry[`_source`] = `${type} - ${baseName}`;
            entries.missing[nestedPath] = entry;
          }
        });
      });
    }
  }

  /** Strip additional fields from contents entry to provide cleaner asset entry */
  private contentsToAssetEntry(entry: IContentsEntry): IAssetEntry {
    const { md5Checksum, size_kb } = entry;
    return { size_kb, md5Checksum };
  }
}

interface IAssetEntriesByType {
  /** Assets listed in global folder with reference to language or theme overrides */
  global: IAssetEntryHashmap;
  translations: { [languageCode: string]: IAssetEntryHashmap };
  themeVariations: { [themeName: string]: IAssetEntryHashmap };
  /** Assets that appear in translation folders but have no corresponding globals */
  missing: IAssetEntryHashmap;
}
