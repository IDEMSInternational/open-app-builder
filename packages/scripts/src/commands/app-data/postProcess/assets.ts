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
} from "../../../utils";
import { spawnSync } from "child_process";

import { getActiveDeployment } from "../../deployment/get";
import { ROOT_DIR } from "../../../paths";
import type { IAssetEntry } from "data-models/deployment.model";

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
/**
 *
 **/
class AssetsPostProcessor {
  private activeDeployment = getActiveDeployment();
  constructor(private options: IProgramOptions) {}

  public run() {
    const { _workspace_path } = this.activeDeployment;
    const { sourceAssetsFolder } = this.options;
    const appAssetsFolder = path.resolve(_workspace_path, "app_data", "assets");

    // handle merge with parent - creates a staging folder with parent content and merges deployment data on top

    const sourceAssets = generateFolderFlatMap(sourceAssetsFolder, { includeLocalPath: true });
    const sourceAssetsFiltered = this.filterAppAssets(sourceAssets);

    const mergedAssets = this.mergeParentAssets(sourceAssetsFiltered);

    // populate staging dir for quality control
    const stagingDir = createTempDir();
    this.copyAssetsToFolder(mergedAssets, stagingDir);

    this.assetsQualityCheck(stagingDir);

    // TODO - Decide if populating translations should come now or later )
    // But will need to know as part of final output.... so later (?)
    // Or maybe additional full-contents json ?

    // const { translationAssets, untrackedAssets } = this.listTranslationAssets(filteredAssets);
    // if (Object.keys(untrackedAssets).length > 0) {
    //   const untrackedList = Object.keys(untrackedAssets).join(", ");
    //   logWarning({ msg1: "Skipping assets without global", msg2: untrackedList });
    // }
    // console.log(translationAssets);

    // this.checkTotalAssetSize(translationAssets);

    // TODO - write list of untracked assets

    // TODO - copy to local app_data folder only those files that we will use

    fs.removeSync(stagingDir);

    this.copyAssetsToFolder(sourceAssetsFiltered, appAssetsFolder);
    this.writeAssetsContentsFile(appAssetsFolder);

    // fs.writeFileSync(untrackedTarget, JSON.stringify(untrackedJson, null, 2));

    console.log(chalk.green("Asset Process Complete"));
  }

  private writeAssetsContentsFile(targetFolder: string) {
    const assetContents = generateFolderFlatMap(targetFolder);
    const assetEntries = {};
    for (const [key, entry] of Object.entries(assetContents)) {
      assetEntries[key] = this.contentsToAssetEntry(entry);
    }
    const contentsTarget = path.resolve(targetFolder, "contents.json");

    fs.writeFileSync(contentsTarget, JSON.stringify(assetEntries, null, 2));
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
   * Make a list of any source assets that have language-code overrides, and any language assets
   * that are missing corresponding globals
   */
  private listTranslationAssets(sourceAssets: { [relativePath: string]: IContentsEntry }) {
    const untrackedAssets: typeof sourceAssets = {};
    const translationAssets: { [assetPath: string]: IAssetEntry } = {};

    Object.entries(sourceAssets).forEach(([relativePath, entry]) => {
      const [languageCode, ...nestedPaths] = relativePath.split("/");
      const nestedPath = nestedPaths.join("/");
      // handle translated assets
      if (languageCode !== ASSETS_GLOBAL_FOLDER_NAME) {
        const globalName = `${ASSETS_GLOBAL_FOLDER_NAME}/${nestedPath}`;
        const globalAsset = sourceAssets[globalName];
        if (globalAsset) {
          if (!translationAssets[nestedPath]) {
            translationAssets[nestedPath] = this.contentsToAssetEntry(globalAsset);
            translationAssets[nestedPath].translations = {};
          }
          translationAssets[nestedPath].translations[languageCode] =
            this.contentsToAssetEntry(entry);
        } else {
          untrackedAssets[relativePath] = entry;
        }
      }
    });
    return { translationAssets, untrackedAssets };
  }

  private contentsToAssetEntry(entry: IContentsEntry): IAssetEntry {
    const { md5Checksum, modifiedTime, size_kb } = entry;
    return { md5Checksum, modifiedTime, size_kb };
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
    let sizeTotals = { overall: 0, global: 0 };
    Object.entries(sourceAssets).forEach(([key, entry]) => {
      const sizeMB = Math.round(entry.size_kb / 102.4) / 10;
      sizeTotals.global += sizeMB;
      sizeTotals.overall += sizeMB;
      // repeat for nested translation entries (TODO - could give breakdown by language)
      if (entry.translations) {
        Object.entries(entry.translations).forEach(([translated_key, translatedEntry]) => {
          if (!sizeTotals[translated_key]) sizeTotals[translated_key] = 0;
          const translatedSizeMB = Math.round(translatedEntry.size_kb / 102.4) / 10;
          sizeTotals[translated_key] += translatedSizeMB;
          sizeTotals.overall += translatedSizeMB;
        });
      }
    });
    // Log output
    const { overall, ...langTotals } = sizeTotals;
    const langSummary = JSON.stringify(langTotals, null, 2)
      .replace(/[{}]/gim, "")
      .replace(/[ ]{2}/gim, "")
      .replace(/"/gim, "");

    if (sizeTotals.overall > 140) {
      logWarning({
        msg1: `Asset files should be under 140MB`,
        msg2: `Total size: ${Math.round(sizeTotals.overall * 10) / 10} MB\n\n${langSummary}`,
      });
    }

    logOutput({
      msg1: "Assets Summary",
      msg2: `Total size: ${Math.round(sizeTotals.overall * 10) / 10} MB\n\n${langSummary}`,
    });
  }
}

/**********************************************************************************************************
 *                                            Types and Utilities
 *********************************************************************************************************/

/**
 * Run prettier to automatically format code in given folder path
 * NOTE - by default will only format .ts files
 */
function runPrettierCodeTidy(folderPath: string) {
  const cmd = `npx prettier --config ${ROOT_DIR}/.prettierrc --write ${folderPath}/**/*.ts --loglevel error`;
  return spawnSync(cmd, { stdio: ["inherit", "inherit", "inherit"], shell: true });
}
