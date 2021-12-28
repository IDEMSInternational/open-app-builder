import * as path from "path";
import * as fs from "fs-extra";
import chalk from "chalk";
import { Command } from "commander";
import {
  capitalizeFirstLetter,
  recursiveFindByExtension,
  convertJsonToTs,
  generateFolderFlatMap,
  isCountryLanguageCode,
  listFolderNames,
  logError,
  readContentsFile,
  IContentsEntry,
  logOutput,
} from "../../utils";
import { spawnSync } from "child_process";

import { getActiveDeployment } from "../deployment/get";
import { ROOT_DIR } from "../../paths";

const ASSETS_GLOBAL_FOLDER_NAME = "global";

/***************************************************************************************
 * CLI
 * @example yarn
 *************************************************************************************/
interface IProgramOptions {
  skipAssets: boolean;
}
const program = new Command("copy");
export default program
  .description("Copy app data")
  .option("-s --skip-assets", "Skip copying of asset files if only processing template sheets")
  .action(async (options: IProgramOptions) => {
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
    SHEETS_INPUT_FOLDER: "",
    SHEETS_OUTPUT_FOLDER: "",
    ASSETS_INPUT_FOLDER: "",
    ASSETS_OUTPUT_FOLDER: "",
    TRANSLATIONS_TRANSLATED_STRINGS: "",
    TRANSLATIONS_SOURCE_STRINGS: "",
    TRANSLATIONS_OUTPUT_FOLDER: "",
  };
  private activeDeployment = getActiveDeployment();
  constructor(private options: IProgramOptions) {
    const { google_drive, app_data, translations } = this.activeDeployment;
    this.paths = {
      // Sheets will be copied from converter output folder
      SHEETS_INPUT_FOLDER: path.resolve(app_data.converter_cache_path, "byFlowtype"),
      SHEETS_OUTPUT_FOLDER: app_data.sheets_output_path,
      // Assets will be copied directly from downloaded drive (currently no postprocessing)
      ASSETS_INPUT_FOLDER: path.resolve(google_drive.cache_path, "app_assets"),
      ASSETS_OUTPUT_FOLDER: app_data.assets_output_path,

      TRANSLATIONS_TRANSLATED_STRINGS: translations.translated_strings_path,
      TRANSLATIONS_SOURCE_STRINGS: translations.source_strings_path,
      TRANSLATIONS_OUTPUT_FOLDER: translations.output_cache_path,
    };
  }

  public run() {
    // export const ASSETS_OUTPUT_FOLDER = path.join(APP_DATA_PACKAGE_PATH, "assets");

    // Translations Compilation
    console.log(chalk.yellow("Compiling existing translations"));
    const {
      SHEETS_INPUT_FOLDER,
      TRANSLATIONS_OUTPUT_FOLDER,
      SHEETS_OUTPUT_FOLDER,
      ASSETS_INPUT_FOLDER,
      ASSETS_OUTPUT_FOLDER,
      TRANSLATIONS_SOURCE_STRINGS,
    } = this.paths;

    // Translations
    this.compileTranslationFiles();

    // App files
    console.log(chalk.yellow("Writing app files"));
    copyAppSheetFiles(SHEETS_INPUT_FOLDER, SHEETS_OUTPUT_FOLDER);

    if (!this.options.skipAssets) {
      assetsQualityCheck(ASSETS_INPUT_FOLDER);
      this.copyAppAssetFiles(ASSETS_INPUT_FOLDER, ASSETS_OUTPUT_FOLDER);
      this.generateDataAssetsIndexFile();
    }
    this.writeTranslationTsFiles(
      path.resolve(TRANSLATIONS_OUTPUT_FOLDER, "strings"),
      path.resolve(SHEETS_OUTPUT_FOLDER, "translation_strings")
    );

    console.log(chalk.yellow("Cleaning Output Files"));
    runPrettierCodeTidy(SHEETS_OUTPUT_FOLDER);
    runPrettierCodeTidy(ASSETS_OUTPUT_FOLDER);

    // New translations output
    console.log(chalk.yellow("Generating new translation files"));
    generateTranslationFiles(SHEETS_INPUT_FOLDER, TRANSLATIONS_SOURCE_STRINGS);
    console.log(chalk.green("Copy Complete"));
  }

  private writeTranslationTsFiles(sourceFolder: string, targetFolder: string) {
    fs.ensureDirSync(targetFolder);
    fs.emptyDirSync(targetFolder);
    fs.removeSync(
      path.resolve(this.paths.SHEETS_OUTPUT_FOLDER, "translation_strings", "_combined.json")
    );
    // convert all individual strings to ts, but ignore combined
    const sourceFiles = recursiveFindByExtension(sourceFolder, "json").filter(
      (filepath) => path.basename(filepath) !== "_combined.json"
    );
    convertJsonToTs(sourceFiles, {
      outputDir: targetFolder,
      defaultExportType: "{[source_text:string]:string}",
      indexFile: {
        namedExport: "TRANSLATION_STRINGS",
      },
    });
  }

  /**
   * Create an index recursively listing all assets in app-data assets folder.
   * Distinguishies between 'global' and 'translated' assets via folder naming, and tracks which global files have
   * corresponding translation files
   * */
  private generateDataAssetsIndexFile(assetsBase = this.paths.ASSETS_OUTPUT_FOLDER) {
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
    const APP_DATA_ASSETS_INDEX_PATH = path.resolve(this.paths.ASSETS_OUTPUT_FOLDER, "index.ts");
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

  /**
   * Create a default index.ts file in each data folder to export all other local
   * data files (and produce a singular import)
   */
  private generateAppSheetsIndexFiles() {
    const dataDirs = fs.readdirSync(this.paths.SHEETS_OUTPUT_FOLDER);
    for (const folderName of dataDirs) {
      const dirPath = `${this.paths.SHEETS_OUTPUT_FOLDER}/${folderName}`;
      const dataFiles = fs.readdirSync(dirPath);
      const importStatements = [];
      const exportStatements = [];
      dataFiles.forEach((filePath, i) => {
        const importPath = path.basename(filePath, ".ts");
        let importName = importPath.replace(".", "_");
        if (importName === folderName) {
          importName += `_${i}`;
        }
        importStatements.push(`import ${importName} from "./${importPath}"`);
        exportStatements.push(importName);
      });
      const indexFilePath = `${dirPath}/index.ts`;
      fs.createFileSync(indexFilePath);
      fs.appendFileSync(indexFilePath, `import { FlowTypes } from "data-models";\r\n`);
      fs.appendFileSync(indexFilePath, `${importStatements.join("\r\n")};\r\n`);
      fs.appendFileSync(
        indexFilePath,
        `export const ${folderName}:FlowTypes.${capitalizeFirstLetter(
          folderName
        )}[] = [].concat(${exportStatements.join(",")})`
      );
    }
  }

  private copyAppAssetFiles(sourceFolder: string, targetFolder: string) {
    // setup folders
    fs.ensureDirSync(targetFolder);
    fs.emptyDirSync(targetFolder);
    // filter and copy
    const assetFiles = readContentsFile(sourceFolder);
    const { assets_filter_function } = this.activeDeployment.app_data;
    const filteredFiles = assetFiles.filter(assets_filter_function);
    for (const fileEntry of filteredFiles) {
      const src = path.resolve(sourceFolder, fileEntry.relativePath);
      const dest = path.resolve(targetFolder, fileEntry.relativePath);
      fs.ensureDir(path.dirname(dest));
      fs.copySync(src, dest, { preserveTimestamps: true });
    }
  }

  /**
   * Call translation scripts to also process compiled translations
   * TODO - ideally this and all above scripts should be called from within app-data workspace instead
   **/
  private compileTranslationFiles() {
    const sourceFolder = this.paths.SHEETS_INPUT_FOLDER;
    const outputFolder = this.paths.TRANSLATIONS_OUTPUT_FOLDER;
    const translationsFolder = this.paths.TRANSLATIONS_TRANSLATED_STRINGS;
    const cmd = `yarn workspace translations start compile -i ${sourceFolder} -t ${translationsFolder} -o ${outputFolder}`;
    console.log(chalk.gray(cmd));
    const { status, stderr } = spawnSync(cmd, {
      stdio: ["inherit", "inherit", "inherit"],
      shell: true,
    });
    if (status === 1) {
      logError({ msg1: "Translations failed", msg2: stderr.toString() });
    }
  }
}

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
  console.log(chalk.green("Preparing assets for:", "global", output.languageFolders.join(", ")));
}

function copyAppSheetFiles(sourceFolder: string, targetFolder: string) {
  fs.ensureDirSync(sourceFolder);
  fs.ensureDirSync(targetFolder);
  fs.emptyDirSync(targetFolder);
  fs.copySync(sourceFolder, targetFolder);
}

/**
 * Run prettier to automatically format code in given folder path
 * NOTE - by default will only format .ts files
 */
function runPrettierCodeTidy(folderPath: string) {
  const cmd = `npx prettier --config ${ROOT_DIR}/.prettierrc --write ${folderPath}/**/*.ts --loglevel error`;
  return spawnSync(cmd, { stdio: ["inherit", "inherit", "inherit"], shell: true });
}

/**
 * Call translation scripts to also add a copy of files to translations
 * TODO - ideally this and all above scripts should be called from within app-data workspace instead
 * TODO - could also install as node_module and run as bin
 * */
function generateTranslationFiles(inputFolder: string, outputFolder: string) {
  const cmd = `yarn workspace translations start generate -i ${inputFolder} -o ${outputFolder}`;
  return spawnSync(cmd, { stdio: ["inherit", "inherit", "inherit"], shell: true });
}

/**  Subset of IContentsEntry (with additional translations) */
interface IAssetEntry extends IContentsEntry {
  translations?: { [language_code: string]: IContentsEntry };
}

/**********************************************************************
 * Deprecated 2021-12-26
 * Likely no longer required TS file creation as move to JSON imports
 * Retain for short period for ease of method migration (recommend 2022-03)
 *********************************************************************/
function _deprecatedWriteAppTsFiles(sourceFolder: string, targetFolder: string) {
  fs.ensureDirSync(sourceFolder);
  fs.ensureDirSync(targetFolder);
  fs.emptyDirSync(targetFolder);
  console.log(chalk.yellow("Copying Data To App"));
  const localTsFiles = recursiveFindByExtension(sourceFolder, "json");
  for (const filepath of localTsFiles) {
    const fileJson = fs.readJSONSync(filepath);
    // files are organised by flow_type, so get name of parent folder for type
    const flow_type = path.dirname(filepath).split(path.sep).pop();
    // create output ts from json
    const appOutputTs = _deprecatedGenerateLocalTsOutput(fileJson, flow_type);
    const outputPath = path.join(targetFolder, path.relative(sourceFolder, filepath));
    const outputDir = path.dirname(outputPath);
    const outputName = path.basename(filepath).replace(".json", ".ts");
    // write outputs
    fs.ensureDirSync(outputDir);
    fs.writeFileSync(path.resolve(outputDir, outputName), appOutputTs);
  }
}

/**
 * Create a ts file of json export, importing what would be the relevant local
 * typings to allow checking against data (and disabling unwanted additional linting)
 *
 * When copying to the app simply replace the path to local typings imported to
 * the path imported from within the app
 */
function _deprecatedGenerateLocalTsOutput(json: any, flow_type: string) {
  const typeName = capitalizeFirstLetter(flow_type);
  return `/* eslint-disable */
  import { FlowTypes } from "data-models"
  const ${flow_type}: FlowTypes.${typeName}[] = ${JSON.stringify(json, null, 2)};
  export default ${flow_type}
  `;
}
