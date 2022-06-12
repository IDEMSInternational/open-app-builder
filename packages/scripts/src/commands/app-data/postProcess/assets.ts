import * as path from "path";
import * as fs from "fs-extra";
import { tmpdir } from "os";
import chalk from "chalk";
import { Command } from "commander";
import {
  generateFolderFlatMap,
  isCountryLanguageCode,
  listFolderNames,
  logError,
  readContentsFile,
  IContentsEntry,
  logOutput,
  replicateDir,
  logWarning,
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
    const { _parent_config, _workspace_path } = this.activeDeployment;
    if (_parent_config) {
      logWarning({ msg1: "TODO - merge parent" });
    }

    // Setup Folders
    const { sourceAssetsFolder } = this.options;
    const appAssetsFolder = path.resolve(_workspace_path, "app_data", "assets");
    // Handle Copy
    this.assetsQualityCheck(sourceAssetsFolder);
    this.assetsCopyFiles(sourceAssetsFolder, appAssetsFolder);
    this.assetsGenerateIndex(appAssetsFolder);
    console.log(chalk.green("Copy Complete"));
  }

  /**********************************************************************************************************
   *                                            Assets
   *********************************************************************************************************/
  /**
   * Create an index recursively listing all assets in app-data assets folder.
   * Distinguishies between 'global' and 'translated' assets via folder naming, and tracks which global files have
   * corresponding translation files
   * */
  private assetsGenerateIndex(baseFolder: string) {
    const topLevelFolders = listFolderNames(baseFolder);
    const languageFolders = topLevelFolders.filter((name) => isCountryLanguageCode(name));

    // TODO - ideally "global" folder should sit at top level but refactoring required so for now use filter
    const globalAssetsFolder = path.join(baseFolder, ASSETS_GLOBAL_FOLDER_NAME);
    const globalAssets = generateFolderFlatMap(globalAssetsFolder, true) as {
      [relative_path: string]: IAssetEntry;
    };
    const untrackedAssets: any = [];

    // populate tracked and untracked translated assets
    for (const languageFolder of languageFolders) {
      const languageFolderPath = path.resolve(baseFolder, languageFolder);
      const translatedAssets = generateFolderFlatMap(languageFolderPath);
      Object.entries(translatedAssets).forEach(([name, value]) => {
        if (globalAssets.hasOwnProperty(name)) {
          globalAssets[name].translations = globalAssets[name].translations || {};
          globalAssets[name].translations[languageFolder] = value as IContentsEntry;
        } else {
          untrackedAssets.push(`${languageFolder}/${name}`);
        }
      });
    }
    // clean output to exclude modifiedTime and relativePath fields. Track totals
    // TODO - size calcs could be tidied to own function
    const cleanedContents: { [relative_path: string]: Partial<IAssetEntry> } = {};
    let sizeTotals = { global: 0 };
    Object.entries(globalAssets).forEach(([key, entry]) => {
      const { modifiedTime, relativePath, ...fieldsToKeep } = entry;
      cleanedContents[key] = fieldsToKeep;
      sizeTotals.global += Math.round(entry.size_kb / 102.4) / 10;
      // repeat for nested translation entries (TODO - could give breakdown by language)
      if (entry.translations) {
        Object.entries(entry.translations).forEach(([translated_key, translatedEntry]) => {
          const { modifiedTime, relativePath, ...translatedFieldsToKeep } = translatedEntry;
          cleanedContents[key].translations[translated_key] = translatedFieldsToKeep as any;
          if (!sizeTotals[translated_key]) sizeTotals[translated_key] = 0;
          sizeTotals[translated_key] += Math.round(translatedEntry.size_kb / 102.4) / 10;
        });
      }
    });

    fs.writeFileSync(
      path.resolve(baseFolder, "contents.json"),
      JSON.stringify(cleanedContents, null, 2)
    );
    fs.writeFileSync(
      path.resolve(baseFolder, "untracked.json"),
      JSON.stringify(untrackedAssets, null, 2)
    );

    // Log total size of all exports
    let assetsTotal = 0;
    Object.keys(sizeTotals).forEach((key) => {
      sizeTotals[key] = Math.round(sizeTotals[key] * 10) / 10;
      assetsTotal += sizeTotals[key];
    });
    const totalsByLang = JSON.stringify(sizeTotals, null, 2)
      .replace(/[{}]/gim, "")
      .replace(/[ ]{2}/gim, "")
      .replace(/"/gim, "");
    logOutput({
      msg1: "Assets copied",
      msg2: `Total size: ${Math.round(assetsTotal * 10) / 10} MB\n\n${totalsByLang}`,
    });
  }

  private assetsCopyFiles(sourceFolder: string, targetFolder: string) {
    // filter and copy
    const assetFiles = readContentsFile(sourceFolder);
    const { assets_filter_function } = this.activeDeployment.app_data;
    const filterLanguages = this.activeDeployment.translations?.filter_language_codes;

    if (filterLanguages) {
      filterLanguages.push("global");
    }
    const filteredFiles = assetFiles.filter((fileEntry) => {
      // language filter
      if (filterLanguages) {
        const [lang_folder] = fileEntry.relativePath.split("/");
        if (!filterLanguages.includes(lang_folder)) return false;
      }
      // global filter
      return assets_filter_function(fileEntry);
    });

    // Copy
    // Write to tmp dir to allow minimal update via replicate methods
    // (will fail to unlink if app running)
    const tmpFolder = path.resolve(tmpdir(), "app_assets");
    fs.ensureDirSync(tmpFolder);
    fs.emptyDirSync(tmpFolder);
    for (const fileEntry of filteredFiles) {
      const src = path.resolve(sourceFolder, fileEntry.relativePath);
      const dest = path.resolve(tmpFolder, fileEntry.relativePath);
      fs.ensureDirSync(path.dirname(dest));
      fs.copySync(src, dest, { preserveTimestamps: true });
    }
    replicateDir(tmpFolder, targetFolder);
    fs.removeSync(tmpFolder);
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
