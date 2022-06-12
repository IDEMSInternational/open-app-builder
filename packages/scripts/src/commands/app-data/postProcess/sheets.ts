import * as path from "path";
import * as fs from "fs-extra";
import chalk from "chalk";
import { Command } from "commander";
import { logError, recursiveFindByExtension, logWarning } from "../../../utils";
import { spawnSync } from "child_process";

import { getActiveDeployment } from "../../deployment/get";
import { ROOT_DIR } from "../../../paths";
import { FlowTypes } from "data-models";

/***************************************************************************************
 * CLI
 * @example yarn
 *************************************************************************************/
interface IProgramOptions {
  sourceSheetsFolder: string;
  sourceTranslationsFolder: string;
}
const program = new Command("sheets");
export default program
  .description("Copy app data")
  .requiredOption("--source-sheets-folder <string>", "path to source sheets folder")
  .requiredOption("--source-translations-folder <string>", "path to source translations folder")
  .action(async (options: IProgramOptions) => {
    // console.table(options);
    new SheetsPostProcessor(options).run();
  });

/***************************************************************************************
 * Main Methods
 *************************************************************************************/
/**
 *
 **/
class SheetsPostProcessor {
  private activeDeployment = getActiveDeployment();
  constructor(private options: IProgramOptions) {}

  public run() {
    const { _parent_config, _workspace_path } = this.activeDeployment;
    // App Sheets
    // Setup Folders
    const { sourceSheetsFolder } = this.options;
    const appSheetsFolder = path.resolve(_workspace_path, "app_data", "sheets");
    fs.ensureDirSync(appSheetsFolder);
    fs.emptyDirSync(appSheetsFolder);
    if (_parent_config) {
      // TODO - merge parent config
      logWarning({ msg1: "TODO - Merge parent content" });
      // const parentSheetsFolder =
    }
    // Merge parent

    // Handle Copy
    this.sheetsCopyFiles(sourceSheetsFolder, appSheetsFolder);
    const sheetContents = this.sheetsGenerateContents(appSheetsFolder);
    this.sheetsWriteContents(appSheetsFolder, sheetContents);

    // Sheet Translations (applied if sheets are copied)
    // Setup Folders
    const { sourceTranslationsFolder } = this.options;
    const appTranslationsFolder = path.resolve(_workspace_path, "app_data", "translations");
    // Handle Copy
    this.translationsWriteIndex(sourceTranslationsFolder);
    this.translationsCopyFiles(sourceTranslationsFolder, appTranslationsFolder);

    console.log(chalk.green("Copy Complete"));
  }

  /**********************************************************************************************************
   *                                            Sheets
   *********************************************************************************************************/

  private sheetsCopyFiles(sourceFolder: string, targetFolder: string) {
    fs.ensureDirSync(sourceFolder);
    fs.ensureDirSync(targetFolder);
    fs.emptyDirSync(targetFolder);
    fs.copySync(sourceFolder, targetFolder);
  }

  /** Extract a list of all sheets by type including flow contents */
  private sheetsGenerateContents(baseFolder: string) {
    // Generate contents
    const contents: ISheetContents = { data_list: {}, global: {}, template: {}, tour: {} };
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
    const { rows, status, ...keptFields } = flow;
    return keptFields as FlowTypes.FlowTypeBase;
  }
  private sheetsWriteContents(baseFolder: string, contents: ISheetContents) {
    const contentsOutputPath = path.resolve(baseFolder, "contents.json");
    fs.writeFileSync(contentsOutputPath, JSON.stringify(contents, null, 2));
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
    const TRANSLATIONS_INDEX_PATH = path.resolve(baseFolder, "contents.json");
    fs.writeFileSync(TRANSLATIONS_INDEX_PATH, JSON.stringify(contents, null, 2));
  }

  private translationsCopyFiles(sourceFolder: string, targetFolder: string) {
    fs.ensureDirSync(sourceFolder);
    fs.ensureDirSync(targetFolder);
    fs.emptyDirSync(targetFolder);
    fs.copySync(sourceFolder, targetFolder);
  }
}

/**********************************************************************************************************
 *                                            Types and Utilities
 *********************************************************************************************************/
type ISheetContents = {
  [flow_type in FlowTypes.FlowType]: { [flow_name: string]: FlowTypes.FlowTypeBase };
};

/**
 * Run prettier to automatically format code in given folder path
 * NOTE - by default will only format .ts files
 */
function runPrettierCodeTidy(folderPath: string) {
  const cmd = `npx prettier --config ${ROOT_DIR}/.prettierrc --write ${folderPath}/**/*.ts --loglevel error`;
  return spawnSync(cmd, { stdio: ["inherit", "inherit", "inherit"], shell: true });
}
