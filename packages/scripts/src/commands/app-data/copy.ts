import * as path from "path";
import * as fs from "fs-extra";
import { tmpdir } from "os";
import chalk from "chalk";
import { Command } from "commander";
import {
  generateFolderFlatMap,
  isCountryLanguageCode,
  isThemeAssetsFolderName,
  listFolderNames,
  logError,
  readContentsFile,
  IContentsEntry,
  logOutput,
  recursiveFindByExtension,
  replicateDir,
  getThemeNameFromThemeAssetFolderName,
} from "../../utils";
import { spawnSync } from "child_process";

import { getActiveDeployment } from "../deployment/get";
import { ROOT_DIR } from "../../paths";
import { FlowTypes } from "data-models";

const ASSETS_GLOBAL_FOLDER_NAME = "global";

/***************************************************************************************
 * CLI
 * @example yarn
 *************************************************************************************/
interface IProgramOptions {
  localSheetsFolder: string;
  localAssetsFolder: string;
  localTranslationsFolder: string;
  appSheetsFolder: string;
  appAssetsFolder: string;
  appTranslationsFolder: string;
  skipSheets?: boolean;
  skipAssets?: boolean;
}
const program = new Command("copy");
export default program
  .description("Copy app data")
  .option("--local-sheets-folder <string>", "path to local sheets folder")
  .option("--local-assets-folder <string>", "path to local assets folder")
  .option("--local-translations-folder <string>", "path to local translations folder")
  .option("--app-sheets-folder <string>", "path to app sheets folder")
  .option("--app-assets-folder <string>", "path to app sheets folder")
  .option("--app-translations-folder <string>", "path to app sheets folder")
  .option("--skip-sheets")
  .option("--skip-assets")
  .action(async (options: IProgramOptions) => {
    // console.table(options);
    new AppDataCopy(options).run();
  });

/***************************************************************************************
 * Main Methods
 *************************************************************************************/
/**
 *
 **/
export class AppDataCopy {
  private activeDeployment = getActiveDeployment();
  constructor(private options: IProgramOptions) {}

  public run() {
    const { skipSheets, skipAssets } = this.options;
    // App Sheets
    if (!skipSheets) {
      // Setup Folders
      const { localSheetsFolder, appSheetsFolder } = this.options;
      // Handle Copy
      const sheetContents = this.sheetsGenerateContents(localSheetsFolder);
      this.sheetsWriteContents(localSheetsFolder, sheetContents);
      this.sheetsCopyFiles(localSheetsFolder, appSheetsFolder);
      this.runPrettierCodeTidy(appSheetsFolder);
    }

    // Sheet Translations (applied if sheets are copied)
    if (!skipSheets) {
      // Setup Folders
      const { localTranslationsFolder, appTranslationsFolder } = this.options;
      // Handle Copy
      this.translationsWriteIndex(localTranslationsFolder);
      this.translationsCopyFiles(localTranslationsFolder, appTranslationsFolder);
      this.runPrettierCodeTidy(appTranslationsFolder);
    }

    // Assets
    if (!skipAssets) {
      // Setup Folders
      const { localAssetsFolder, appAssetsFolder } = this.options;
      // Handle Copy
      this.assetsQualityCheck(localAssetsFolder);
      this.assetsCopyFiles(localAssetsFolder, appAssetsFolder);
      this.assetsGenerateIndex(appAssetsFolder);
      this.runPrettierCodeTidy(appAssetsFolder);
    }
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
    const themeFolders = topLevelFolders.filter((name) => isThemeAssetsFolderName(name));

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

    // populate tracked and untracked theme-specific assets
    // TODO - Handle case of translated theme assets. None currently
    // exists so this approach is temporarily acceptable - JM 03-10-2022
    for (const themeFolder of themeFolders) {
      const themeFolderPath = path.resolve(baseFolder, themeFolder);
      const themeAssets = generateFolderFlatMap(themeFolderPath);
      Object.entries(themeAssets).forEach(([name, value]) => {
        // TODO - Should handle multiple folders named with language codes.
        name = name.replace(`${ASSETS_GLOBAL_FOLDER_NAME}/`, "");
        if (globalAssets.hasOwnProperty(name)) {
          globalAssets[name].themeVariations = globalAssets[name].themeVariations || {};
          globalAssets[name].themeVariations[themeFolder] = value as IContentsEntry;
        } else {
          untrackedAssets.push(`${themeFolder}/${name}`);
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
      // repeat for nested theme entries
      if (entry.themeVariations) {
        Object.entries(entry.themeVariations).forEach(([theme_key, themeEntry]) => {
          const { modifiedTime, relativePath, ...themeFieldsToKeep } = themeEntry;
          cleanedContents[key].themeVariations[theme_key] = themeFieldsToKeep as any;
          if (!sizeTotals[theme_key]) sizeTotals[theme_key] = 0;
          sizeTotals[theme_key] += Math.round(themeEntry.size_kb / 102.4) / 10;
        });
      }
    });

    // write output index file for tracked and untracked assets
    const outputTS = `
export const UNTRACKED_ASSETS = ${JSON.stringify(untrackedAssets, null, 2)}
export const ASSETS_CONTENTS_LIST = ${JSON.stringify(cleanedContents, null, 2)}
`.trim();
    const ASSETS_INDEX_PATH = path.resolve(baseFolder, "index.ts");
    fs.writeFileSync(ASSETS_INDEX_PATH, outputTS);

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
    const filterThemes = this.activeDeployment.app_config.APP_THEMES.available;

    const filteredFiles = assetFiles.filter((fileEntry) => {
      const [parent_folder] = fileEntry.relativePath.split("/");
      // language filter
      if (isCountryLanguageCode(parent_folder) && filterLanguages) {
        if (!filterLanguages.includes(parent_folder)) return false;
      }
      // theme filter
      if (
        isThemeAssetsFolderName(parent_folder) &&
        !filterThemes.includes(getThemeNameFromThemeAssetFolderName(parent_folder))
      )
        return false;
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
        if (isCountryLanguageCode(folderName)) {
          output.languageFolders.push(folderName);
        } else if (isThemeAssetsFolderName(folderName)) {
          output.themeFolders.push(folderName);
        } else {
          output.invalidFolders.push(folderName);
        }
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

  private sheetsCopyFiles(sourceFolder: string, targetFolder: string) {
    fs.ensureDirSync(sourceFolder);
    fs.ensureDirSync(targetFolder);
    fs.emptyDirSync(targetFolder);
    fs.copySync(sourceFolder, targetFolder);
  }

  /**********************************************************************************************************
   *                                            Sheets
   *********************************************************************************************************/

  /** Extract a list of all sheets by type including flow contents */
  private sheetsGenerateContents(baseFolder: string) {
    // Generate contents
    const contents: ISheetContents = {
      data_list: {},
      global: {},
      template: {},
      tour: {},
      data_pipe: {},
    };
    const sheetPaths = recursiveFindByExtension(baseFolder, "json").sort();
    for (const sheetPath of sheetPaths) {
      const filePath = path.resolve(baseFolder, sheetPath);
      const sheetContents: FlowTypes.FlowTypeWithData = fs.readJsonSync(filePath);
      const { flow_type, flow_name } = sheetContents;
      this.qualityCheckSheets(contents, sheetContents);
      contents[flow_type][flow_name] = this.extractContentsData(sheetContents);
    }
    return contents;
  }

  private extractContentsData(flow: FlowTypes.FlowTypeWithData): FlowTypes.FlowTypeBase {
    // remove rows property (if exists)
    const { rows, status, _processed, ...keptFields } = flow;
    return keptFields as FlowTypes.FlowTypeBase;
  }
  private sheetsWriteContents(baseFolder: string, contents: ISheetContents) {
    // Write ts
    const contentsString = JSON.stringify(contents, null, 2);
    const outputTS = `
import { FlowTypes } from "data-models";
type ISheetContents = { [flow_type in FlowTypes.FlowType]: { [flow_name: string]: FlowTypes.FlowTypeBase } };
export const SHEETS_CONTENT_LIST:ISheetContents = ${contentsString}
    `.trim();
    const SHEETS_INDEX_PATH = path.resolve(baseFolder, "index.ts");
    fs.writeFileSync(SHEETS_INDEX_PATH, outputTS);
  }
  /**
   * Check for unsupported flow types or flows with duplicate names (can happen across subtypes)
   */
  private qualityCheckSheets(
    existingContents: ISheetContents,
    sheetContents: FlowTypes.FlowTypeWithData
  ) {
    const { flow_name, flow_type, _xlsxPath } = sheetContents;
    if (!existingContents.hasOwnProperty(flow_type)) {
      logError({
        msg1: `Unsupported flow_type: [${flow_type}]`,
        msg2: `${_xlsxPath}`,
      });
    }
    if (existingContents[flow_type].hasOwnProperty(flow_name)) {
      const duplicateFlowContents = existingContents[flow_type][flow_name];
      logError({
        msg1: `Duplicate flow_name found: [${flow_type}]`,
        msg2: `${_xlsxPath}\n${duplicateFlowContents._xlsxPath}`,
      });
    }
  }

  /**********************************************************************************************************
   *                                            Translations
   *********************************************************************************************************/
  private translationsWriteIndex(baseFolder: string) {
    type ITranslationContents = { [language_code: string]: { filename: string } };
    const contents: ITranslationContents = {};
    fs.ensureDirSync(baseFolder);
    fs.readdirSync(baseFolder).forEach((language_code) => {
      contents[language_code] = { filename: `${language_code}/strings.json` };
    });
    const contentsString = JSON.stringify(contents, null, 2);
    const outputTS = `
    type ITranslationContents = { [language_code:string]: { filename:  string } };
    export const TRANSLATIONS_CONTENT_LIST:ITranslationContents = ${contentsString}
        `.trim();
    const TRANSLATIONS_INDEX_PATH = path.resolve(baseFolder, "index.ts");
    fs.writeFileSync(TRANSLATIONS_INDEX_PATH, outputTS);
  }

  private translationsCopyFiles(sourceFolder: string, targetFolder: string) {
    fs.ensureDirSync(sourceFolder);
    fs.ensureDirSync(targetFolder);
    fs.emptyDirSync(targetFolder);
    fs.copySync(sourceFolder, targetFolder);
  }

  /**
   * Run prettier to automatically format code in given folder path
   * NOTE - by default will only format .ts files
   */
  private runPrettierCodeTidy(folderPath: string) {
    const cmd = `npx prettier --config ${ROOT_DIR}/.prettierrc --write ${folderPath}/**/*.ts --loglevel error`;
    return spawnSync(cmd, { stdio: ["inherit", "inherit", "inherit"], shell: true });
  }
}

/**********************************************************************************************************
 *                                            Types and Utilities
 *********************************************************************************************************/
type ISheetContents = {
  [flow_type in FlowTypes.FlowType]: { [flow_name: string]: FlowTypes.FlowTypeBase };
};

/**  Subset of IContentsEntry (with additional translations) */
interface IAssetEntry extends IContentsEntry {
  translations?: { [language_code: string]: IContentsEntry };
  themeVariations?: { [theme_name: string]: IContentsEntry };
}
