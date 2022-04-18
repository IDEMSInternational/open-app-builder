import * as path from "path";
import * as fs from "fs-extra";
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
  recursiveFindByExtension,
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
  appSheetsFolder: string;
  appAssetsFolder: string;
  skipSheets?: boolean;
  skipAssets?: boolean;
}
const program = new Command("copy");
export default program
  .description("Copy app data")
  .option("--local-sheets-folder <string>", "path to local sheets folder")
  .option("--local-assets-folder <string>", "path to local assets folder")
  .option("--app-sheets-folder <string>", "path to app sheets folder")
  .option("--app-assets-folder <string>", "path to app sheets folder")
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
class AppDataCopy {
  private paths = {
    LOCAL_SHEETS_FOLDER: "",
    LOCAL_ASSETS_FOLDER: "",
    APP_SHEETS_FOLDER: "",
    APP_ASSETS_FOLDER: "",
  };
  private activeDeployment = getActiveDeployment();
  constructor(private options: IProgramOptions) {
    const { appAssetsFolder, appSheetsFolder, localAssetsFolder, localSheetsFolder } = options;
    const { app_data } = this.activeDeployment;
    this.paths = {
      LOCAL_SHEETS_FOLDER: localSheetsFolder,
      LOCAL_ASSETS_FOLDER: localAssetsFolder,
      APP_SHEETS_FOLDER: appSheetsFolder || app_data.sheets_output_path,
      APP_ASSETS_FOLDER: appAssetsFolder || app_data.assets_output_path,
    };
  }

  public run() {
    const { APP_SHEETS_FOLDER, LOCAL_ASSETS_FOLDER, APP_ASSETS_FOLDER, LOCAL_SHEETS_FOLDER } =
      this.paths;

    // App files
    if (!this.options.skipSheets) {
      console.log(chalk.yellow("Copy Sheets"));
      this.copyAppSheetFiles(LOCAL_SHEETS_FOLDER, APP_SHEETS_FOLDER);
      const contents = this.generateDataSheetsContents();
      this.writeDataSheetsContentsIndex(contents);
      runPrettierCodeTidy(APP_SHEETS_FOLDER);
    }

    // Assets
    if (!this.options.skipAssets) {
      console.log(chalk.yellow("Copy Assets"));
      assetsQualityCheck(LOCAL_ASSETS_FOLDER);
      this.copyAppAssetFiles(LOCAL_ASSETS_FOLDER, APP_ASSETS_FOLDER);
      this.generateDataAssetsIndexFile();
      runPrettierCodeTidy(APP_ASSETS_FOLDER);
    }

    console.log(chalk.green("Copy Complete"));
  }

  /**
   * Create an index recursively listing all assets in app-data assets folder.
   * Distinguishies between 'global' and 'translated' assets via folder naming, and tracks which global files have
   * corresponding translation files
   * */
  private generateDataAssetsIndexFile(assetsBase = this.paths.APP_ASSETS_FOLDER) {
    const topLevelFolders = listFolderNames(assetsBase);
    const languageFolders = topLevelFolders.filter((name) => isCountryLanguageCode(name));

    // TODO - ideally "global" folder should sit at top level but refactoring required so for now use filter
    const globalAssetsFolder = path.join(assetsBase, ASSETS_GLOBAL_FOLDER_NAME);
    const globalAssets = generateFolderFlatMap(globalAssetsFolder, true) as {
      [relative_path: string]: IAssetEntry;
    };
    const untrackedAssets: any = [];

    // populate tracked and untracked translated assets
    for (const languageFolder of languageFolders) {
      const languageFolderPath = path.resolve(assetsBase, languageFolder);
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

    // write output index file for tracked and untracked assets
    const outputTS = `export const UNTRACKED_ASSETS = ${JSON.stringify(untrackedAssets, null, 2)}
  \r\nexport const ASSETS_CONTENTS_LIST = ${JSON.stringify(cleanedContents, null, 2)}`;
    const APP_DATA_ASSETS_INDEX_PATH = path.resolve(this.paths.APP_ASSETS_FOLDER, "index.ts");
    fs.writeFileSync(APP_DATA_ASSETS_INDEX_PATH, outputTS);

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

  private copyAppAssetFiles(sourceFolder: string, targetFolder: string) {
    // setup folders
    fs.ensureDirSync(targetFolder);
    fs.emptyDirSync(targetFolder);
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

    for (const fileEntry of filteredFiles) {
      const src = path.resolve(sourceFolder, fileEntry.relativePath);
      const dest = path.resolve(targetFolder, fileEntry.relativePath);
      fs.ensureDir(path.dirname(dest));
      fs.copySync(src, dest, { preserveTimestamps: true });
    }
  }

  private copyAppSheetFiles(sourceFolder: string, targetFolder: string) {
    fs.ensureDirSync(sourceFolder);
    fs.ensureDirSync(targetFolder);
    fs.emptyDirSync(targetFolder);
    fs.copySync(sourceFolder, targetFolder);
  }

  /** Extract a list of all sheets by type including flow contents */
  private generateDataSheetsContents() {
    const { APP_SHEETS_FOLDER } = this.paths;
    // Generate contents
    const contents: ISheetContents = { data_list: {}, global: {}, template: {}, tour: {} };
    const sheetPaths = recursiveFindByExtension(APP_SHEETS_FOLDER, "json").sort();
    for (const sheetPath of sheetPaths) {
      const filePath = path.resolve(APP_SHEETS_FOLDER, sheetPath);
      const sheetContents: FlowTypes.FlowTypeWithData = fs.readJsonSync(filePath);
      const { flow_type, flow_name } = sheetContents;
      this.qualityCheckSheets(contents, sheetContents);
      contents[flow_type][flow_name] = this.extractContentsData(sheetContents);
    }
    return contents;
  }

  private extractContentsData(flow: FlowTypes.FlowTypeWithData): FlowTypes.FlowTypeBase {
    // remove rows property (if exists)
    const { rows, status, ...keptFields } = flow;
    return keptFields as FlowTypes.FlowTypeBase;
  }
  private writeDataSheetsContentsIndex(contents: ISheetContents) {
    const { APP_SHEETS_FOLDER } = this.paths;
    // Write ts
    const contentsString = JSON.stringify(contents, null, 2);
    const outputTS = `
import { FlowTypes } from "data-models";
type ISheetContents = { [flow_type in FlowTypes.FlowType]: { [flow_name: string]: FlowTypes.FlowTypeBase } };
export const SHEETS_CONTENT_LIST:ISheetContents = ${contentsString}
    `.trim();
    const APP_DATA_SHEETS_INDEX_PATH = path.resolve(APP_SHEETS_FOLDER, "index.ts");
    fs.writeFileSync(APP_DATA_SHEETS_INDEX_PATH, outputTS);
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
}
type ISheetContents = {
  [flow_type in FlowTypes.FlowType]: { [flow_name: string]: FlowTypes.FlowTypeBase };
};

/** Ensure asset folders are named correctly */
function assetsQualityCheck(sourceFolder: string) {
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

/**
 * Run prettier to automatically format code in given folder path
 * NOTE - by default will only format .ts files
 */
function runPrettierCodeTidy(folderPath: string) {
  const cmd = `npx prettier --config ${ROOT_DIR}/.prettierrc --write ${folderPath}/**/*.ts --loglevel error`;
  return spawnSync(cmd, { stdio: ["inherit", "inherit", "inherit"], shell: true });
}

/**  Subset of IContentsEntry (with additional translations) */
interface IAssetEntry extends IContentsEntry {
  translations?: { [language_code: string]: IContentsEntry };
}
