import * as path from "path";
import * as fs from "fs-extra";
import chalk from "chalk";
import { Command } from "commander";
import {
  generateFolderFlatMap,
  isCountryLanguageCode,
  listFolderNames,
  logError,
  IContentsEntry,
  logOutput,
  logWarning,
  createTempDir,
  IContentsEntryHashmap,
  kbToMB,
} from "../../../utils";
import { getActiveDeployment } from "../../deployment/get";
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
class AssetsPostProcessor {
  private activeDeployment = getActiveDeployment();
  constructor(private options: IProgramOptions) {}

  public run() {
    const { _workspace_path } = this.activeDeployment;
    const { sourceAssetsFolder } = this.options;
    const appAssetsFolder = path.resolve(_workspace_path, "app_data", "assets");

    // Generate a list of all deployment assets, merge with list of assets from parent
    const sourceAssets = generateFolderFlatMap(sourceAssetsFolder, { includeLocalPath: true });
    const sourceAssetsFiltered = this.filterAppAssets(sourceAssets);
    const mergedAssets = this.mergeParentAssets(sourceAssetsFiltered);

    // Populate merged assets staging to run quality control checks and generate full contents lists
    const stagingDir = createTempDir();
    this.copyAssetsToFolder(mergedAssets, stagingDir);
    this.assetsQualityCheck(stagingDir);
    this.checkTotalAssetSize(mergedAssets);
    const { missingEntries, translatedEntries } = this.listTranslationAssets(mergedAssets);
    fs.removeSync(stagingDir);

    // copy deployment assets to main folder and write merged contents file
    this.copyAssetsToFolder(sourceAssetsFiltered, appAssetsFolder);
    this.writeAssetsContentsFiles(appAssetsFolder, translatedEntries, missingEntries);

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
    translatedEntries: IAssetEntryHashmap,
    missingEntries: IAssetEntryHashmap
  ) {
    const contentsTarget = path.resolve(appAssetsFolder, "contents.json");
    fs.writeFileSync(contentsTarget, JSON.stringify(translatedEntries, null, 2));

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
    // include global folder if filtering by language
    if (filter_language_codes) {
      filter_language_codes.push(ASSETS_GLOBAL_FOLDER_NAME);
    }
    // remove contents file from gdrive download
    delete sourceAssets["_contents.json"];
    // individual file filter function
    function shouldInclude(entry: IContentsEntry) {
      if (assets_filter_function && !assets_filter_function(entry)) return false;
      if (filter_language_codes) {
        const entryLang = entry.relativePath.split("/")[0];
        if (!filter_language_codes.includes(entryLang)) return false;
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
    const output = { hasGlobalFolder: false, languageFolders: [], invalidFolders: [] };
    const topLevelFolders = listFolderNames(sourceFolder);
    for (const folderName of topLevelFolders) {
      if (folderName === ASSETS_GLOBAL_FOLDER_NAME) output.hasGlobalFolder = true;
      else {
        if (isCountryLanguageCode(folderName)) output.languageFolders.push(folderName);
        else output.invalidFolders.push(folderName);
      }
    }
    if (!output.hasGlobalFolder) {
      logError({
        msg1: "Assets global folder not found",
        msg2: `Assets folder should include a folder named "${ASSETS_GLOBAL_FOLDER_NAME}"`,
      });
    }
    if (output.invalidFolders.length > 0) {
      logError({
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
   * Make a list of any source assets that have language-code overrides, and any language assets
   * that are missing corresponding globals
   */
  private listTranslationAssets(sourceAssets: IContentsEntryHashmap) {
    /** Assets that appear in translation folders but have no corresponding globals */
    const missingEntries: IAssetEntryHashmap = {};
    /** Assets listed in global folder with reference to translation folder overrides */
    const globalAssets: IAssetEntryHashmap = {};

    // split assets to separate global and translated assets
    const globalFolder = ASSETS_GLOBAL_FOLDER_NAME;
    const languageAssets: { [languageCode: string]: IAssetEntryHashmap } = {};
    Object.entries(sourceAssets).forEach(([relativePath, entry]) => {
      const [languageCode, ...nestedPaths] = relativePath.split("/");
      const nestedPath = nestedPaths.join("/");
      const assetEntry = this.contentsToAssetEntry(entry);
      if (languageCode === globalFolder) {
        globalAssets[nestedPath] = assetEntry;
      } else {
        if (!languageAssets[languageCode]) {
          languageAssets[languageCode] = {};
        }
        languageAssets[languageCode][nestedPath] = assetEntry;
      }
    });

    // process assets by language, copying a reference for any language assets to corresponding
    // global. Track as missing if global does not exist
    Object.entries(languageAssets).forEach(([languageCode, langHashmap]) => {
      Object.entries(langHashmap).forEach(([nestedPath, entry]) => {
        if (globalAssets.hasOwnProperty(nestedPath)) {
          if (!globalAssets[nestedPath].translations) {
            globalAssets[nestedPath].translations = {};
          }
          globalAssets[nestedPath].translations[languageCode] = entry;
        } else {
          missingEntries[nestedPath] = entry;
        }
      });
    });
    return { missingEntries, translatedEntries: globalAssets };
  }

  /** Strip additional fields from contents entry to provide cleaner asset entry */
  private contentsToAssetEntry(entry: IContentsEntry): IAssetEntry {
    const { md5Checksum, modifiedTime, size_kb } = entry;
    return { md5Checksum, modifiedTime, size_kb };
  }
}
