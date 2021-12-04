import * as fs from "fs-extra";
import { Command } from "commander";
import * as xlsx from "xlsx";
import * as path from "path";
import boxen from "boxen";
import chalk from "chalk";
import logUpdate from "log-update";
import * as Parsers from "./parsers";
import {
  arrayToHashmap,
  groupJsonByKey,
  readContentsFileAsHashmap,
  generateFolderFlatMap,
  logWarning,
  IContentsEntry,
} from "./utils";
import { FlowTypes } from "data-models";

import { getActiveDeployment } from "../../deployment/get";

/***************************************************************************************
 * CLI
 * @example yarn
 *************************************************************************************/
const program = new Command("convert");
interface IProgramOptions {
  skipCache?: boolean;
}
export default program
  .description("Convert app data")
  .option("-s --skip-cache", "Wipe local conversion cache and process all files")
  .action(async (options: IProgramOptions) => {
    await new AppDataConverter(options).run();
  });

/***************************************************************************************
 * Main Methods
 *************************************************************************************/

// TODO - move to configuration code instead
// return inputContents.filter(
//   (f) =>
//     // ignore temp files and anything in an 'old' directory
//     !f.name.startsWith("~$") &&
//     !f.folderPath
//       .split("/")
//       .map((p) => p.toLowerCase())
//       .includes("old")
// );

class AppDataConverter {
  /** Change version to invalidate any cached conversions */
  public converterVersion = 1;

  private activeDeployment = getActiveDeployment();
  private paths = {
    SHEETS_INPUT_FOLDER: "",
    ASSETS_INPUT_FOLDER: "",
    SHEETS_INDIVIDUAL_CACHE: "",
    SHEETS_MERGED_CACHE: "",
  };

  private conversionErrors = [];
  private conversionWarnings = [];

  constructor(private options: IProgramOptions) {
    console.log(chalk.yellow("App Data Convert"));
    console.table(options);
    // Setup Folders
    const { app_data, google_drive } = this.activeDeployment;
    const SHEETS_CACHE_FOLDER = app_data.converter_cache_path;
    this.paths = {
      SHEETS_INPUT_FOLDER: path.resolve(google_drive.cache_path, "app_sheets"),
      ASSETS_INPUT_FOLDER: path.resolve(google_drive.cache_path, "app_assets"),
      SHEETS_INDIVIDUAL_CACHE: path.resolve(SHEETS_CACHE_FOLDER, "individual"),
      SHEETS_MERGED_CACHE: path.resolve(SHEETS_CACHE_FOLDER, "merged"),
    };
    Object.values(this.paths).forEach((p) => fs.ensureDir(p));
    fs.emptyDirSync(this.paths.SHEETS_MERGED_CACHE);
    if (this.options.skipCache) {
      fs.emptyDirSync(SHEETS_CACHE_FOLDER);
    }
  }

  /**
   * Reads xlsx files from gdrive-download output and converts to json
   * objects representing sheet names and data values
   */
  public async run() {
    const actions = this.prepareConversionActions();

    this.processCacheDeletions(actions.delete);

    const converted = this.processSheetConversions(actions.convert);

    const cached: IParsedWorkbookData[] = actions.skip.map((entry) =>
      this.loadCachedConversion(entry)
    );

    this.writeCacheContentsJson();

    const allConvertedData = [...converted, ...cached].filter((data) =>
      this.applySheetFilters(data)
    );
    const mergedData = this.mergeConvertedData(allConvertedData);
    this.writeMergedOutputJsons(mergedData);

    console.log(chalk.yellow("Conversion Complete"));

    if (this.conversionWarnings.length > 0) {
      console.log(chalk.red(this.conversionWarnings.length, "warnings"));
      for (const warning of this.conversionWarnings) {
        console.log(warning);
      }
    }
    if (this.conversionErrors.length > 0) {
      console.log(chalk.red(this.conversionErrors.length, "errors"));
      for (const err of this.conversionErrors) {
        console.log(err);
      }
    }
  }

  /**
   * Read downloaded sheets contents folder and compare against cached conversions contents.
   * Generate a list of sheets requiring conversion and cached files requiring deletion
   */
  private prepareConversionActions() {
    const { SHEETS_INPUT_FOLDER, SHEETS_INDIVIDUAL_CACHE } = this.paths;
    const actions = { convert: [], delete: [], skip: [] };
    // generate hashmap of input and cache contents
    const hashKey = "relativePath";
    const inputContents = readContentsFileAsHashmap(SHEETS_INPUT_FOLDER, { hashKey });
    const cacheContents = readContentsFileAsHashmap(SHEETS_INDIVIDUAL_CACHE, { hashKey });
    // run comparisons
    Object.entries<IGDriveContentsEntry>(inputContents).forEach(([key, sourceFile]) => {
      // track the filename of the downloaded file (avoid duplicate .xlsx.xlsx depending if gsheet or xlsx original)
      const xlsxFilename = `${key.replace(".xlsx", "")}.xlsx`;
      sourceFile.xlsxPath = path.resolve(SHEETS_INPUT_FOLDER, xlsxFilename);
      const cacheFile = cacheContents[key];
      // compare with modified times instead of checksums
      const isSame = this.isConvertedCacheValid(sourceFile, cacheFile);
      if (isSame) {
        actions.skip.push(sourceFile);
      } else {
        actions.convert.push(sourceFile);
      }
    });
    // handle deleting cache files no longer existing
    Object.entries<IGDriveContentsEntry>(cacheContents).forEach(([key, cacheFile]) => {
      const xlsxFilename = `${key.replace(".xlsx", "")}.xlsx`;
      cacheFile.xlsxPath = path.resolve(SHEETS_INDIVIDUAL_CACHE, xlsxFilename);
      if (!inputContents.hasOwnProperty(key)) {
        actions.delete.push(cacheFile);
      }
    });
    // log summary
    const summary = {};
    Object.entries(actions).forEach(([key, value]) => (summary[key] = value.length));
    console.log("\nFile Summary\n", summary);
    return actions;
  }

  private processCacheDeletions(xlsxPaths: string[]) {
    for (const xlsxPath of xlsxPaths) {
      logWarning({ msg1: "TODO - handle cache invalidated" });
      process.exit(1);
    }
  }

  private processSheetConversions(entries: IGDriveContentsEntry[]) {
    const { SHEETS_INPUT_FOLDER } = this.paths;
    let i = 0;
    let total = entries.length;
    const processed: IParsedWorkbookData[] = [];
    for (let entry of entries) {
      const { xlsxPath } = entry;
      const json = convertXLSXSheetsToJson(xlsxPath);
      const merged = this.mergeAppData(SHEETS_INPUT_FOLDER, [{ json, xlsxPath }]);
      const dataByFlowType = groupJsonByKey(merged, "flow_type");
      try {
        const convertedData = applyDataParsers(dataByFlowType as any);
        processed.push(convertedData);
        this.saveCachedConversion(entry, convertedData);
      } catch (error) {
        this.conversionErrors.push(error);
      }
      i++;
      logUpdate(
        chalk.blue(`converted: ${i} | errors: ${this.conversionErrors.length} | total: ${total}`)
      );
    }
    logUpdate.done();
    return processed;
  }

  /** If sheets filter function specified apply here */
  private applySheetFilters(data: IParsedWorkbookData) {
    const { sheets_filter_function } = this.activeDeployment.app_data;
    if (sheets_filter_function) {
      Object.entries(data).forEach(([flow_type, flows]) => {
        // ensure flows exist and apply and deployment filters
        data[flow_type] = flows.filter((flow) => flow).filter(sheets_filter_function);
      });
    }
    return data;
  }

  /**
   * Each converted sheet may contain a mixture of different flow types (e.g. template, data_list),
   * and subtypes within. Collate all sheets by flow type and subtype
   */
  private mergeConvertedData(convertedData: IParsedWorkbookData[]) {
    const merged: IParsedWorkbookData = {};
    for (const entry of convertedData) {
      Object.entries(entry).forEach(([key, value]) => {
        const convertedDataBySubtype = groupJsonByKey(value as any, "flow_subtype", "_default");
        // split by subtype
        Object.entries(convertedDataBySubtype).forEach(([subkey, subValues]) => {
          let outputName = key;
          if (subkey !== "_default") {
            outputName = `${key}.${subkey}`;
          }
          if (!merged[outputName]) {
            merged[outputName] = [];
          }
          // merge all sheets of given subtype into main
          subValues.forEach((subValue) => merged[outputName].push(subValue));
        });
      });
    }
    const logOutput = Object.keys(merged)
      .sort()
      .map((subtype) => ({ subtype, total: merged[subtype].length }));
    console.log("\nSheet Summary");
    console.table(logOutput);
    return merged;
  }

  /** Take final merged list of data keyed by [type].[subtype?] and write output jsons */
  private writeMergedOutputJsons(mergedData: IParsedWorkbookData) {
    Object.entries(mergedData).forEach(([fulltype, data]) => {
      const [type] = fulltype.split(".");
      const outputPath = path.resolve(this.paths.SHEETS_MERGED_CACHE, type, `${fulltype}.json`);
      fs.ensureDirSync(path.dirname(outputPath));
      fs.writeFile(outputPath, JSON.stringify(data, null, 2));
    });
  }

  private writeCacheContentsJson() {
    const contentsFilename = "_contents.json";
    const cacheHashmap = generateFolderFlatMap(
      this.paths.SHEETS_INDIVIDUAL_CACHE,
      true,
      (p) => p !== contentsFilename
    ) as { [relativePath: string]: IContentsEntry };
    const contentsData = Object.values(cacheHashmap).map((entry) => {
      entry.relativePath = entry.relativePath.replace(".json", "");
      const contentsEntry: IConvertedContentsEntry = {
        ...entry,
        converterVersion: this.converterVersion,
        relativePath: entry.relativePath.replace(".json", ""),
      };

      return contentsEntry;
    });

    const contentsOutput = path.resolve(this.paths.SHEETS_INDIVIDUAL_CACHE, contentsFilename);
    fs.writeFileSync(contentsOutput, JSON.stringify(contentsData, null, 2));
  }

  private saveCachedConversion(entry: IGDriveContentsEntry, convertedData: any) {
    const { xlsxPath } = entry;
    const relativePath = path.relative(this.paths.SHEETS_INPUT_FOLDER, xlsxPath);
    const cacheTarget = path.resolve(this.paths.SHEETS_INDIVIDUAL_CACHE, `${relativePath}.json`);
    fs.ensureDirSync(path.dirname(cacheTarget));
    fs.writeFileSync(cacheTarget, JSON.stringify(convertedData, null, 2));
    const modifiedTime = new Date(entry.modifiedTime);
    // apply same modified time as original file for future comparison
    fs.utimesSync(cacheTarget, modifiedTime, modifiedTime);
  }

  private loadCachedConversion(entry: IGDriveContentsEntry) {
    const { xlsxPath } = entry;
    const relativePath = path.relative(this.paths.SHEETS_INPUT_FOLDER, xlsxPath);
    const cacheTarget = path.resolve(this.paths.SHEETS_INDIVIDUAL_CACHE, `${relativePath}.json`);
    const cachedConversion = fs.readJSONSync(cacheTarget);
    return cachedConversion;
  }

  /**
   * Compare a current sheet json with previously converted.
   * Assumes conversion still valid if both have same modified timestamp and generated
   * using the same converter version
   */
  private isConvertedCacheValid(sourceFile: any, cacheFile?: any) {
    if (cacheFile) {
      return (
        sourceFile.modifiedTime === cacheFile.modifiedTime &&
        cacheFile.converterVersion === this.converterVersion
      );
    }
    return false;
  }

  /**
   * App data sheets contain contents page with metadata that can be merged into regular data
   * Merge and collate with other existing data, warning in case of overwrites
   * @returns - array of all merged sheets (no grouping or collating)
   */
  private mergeAppData(sheetsInputFolder: string, jsons: { json: any; xlsxPath: string }[]) {
    const merged: { [flow_name: string]: FlowTypes.FlowTypeWithData } = {};
    const releasedSummary = {};
    const skippedSummary = {};
    for (let el of jsons) {
      const { json, xlsxPath } = el;
      const contentList = json["==content_list=="] as FlowTypes.FlowTypeWithData[];
      if (contentList) {
        for (const contents of contentList) {
          const { flow_name, status, flow_type, module } = contents;
          const filename = path.basename(xlsxPath, ".xlsx");
          // only include flows marked as released in the contents
          if (flow_name && status === "released") {
            releasedSummary[flow_name] = { status, flow_type, module, filename };
            if (json.hasOwnProperty(flow_name)) {
              if (merged.hasOwnProperty(flow_name)) {
                this.conversionWarnings.push(chalk.yellow(`Duplicate flow: ${flow_name}`));
              }
              // Ensure all paths use / to match HTTP style paths
              const _xlsxPath = path.relative(sheetsInputFolder, xlsxPath).replace(/\\/g, "/");
              merged[flow_name] = { ...contents, rows: json[flow_name], _xlsxPath };
            } else {
              this.conversionWarnings.push(chalk.yellow(`No Contents: ${flow_name}`));
            }
          } else {
            skippedSummary[flow_name] = { status, flow_type, module, filename };
          }
        }
      } else {
        this.conversionWarnings.push(chalk.yellow(`No Content List: ${path.basename(xlsxPath)}`));
      }
    }
    return Object.values(merged);
  }
}
type IParsedWorkbookData = { [type in FlowTypes.FlowType]?: FlowTypes.FlowTypeWithData[] };

function applyDataParsers(dataByFlowType: IParsedWorkbookData): IParsedWorkbookData {
  // All flow types will be processed by the default parser unless otherwise specified here

  // generate a list of all tasks required by the taskListParser (merging rows from all task_list types)
  const allTasksById = arrayToHashmap(
    (dataByFlowType.task_list || []).reduce((a, b) => [...a, ...b.rows], []),
    "id"
  );
  const customParsers: { [flowType in FlowTypes.FlowType]?: Parsers.AbstractParser } = {
    conversation: new Parsers.ConversationParser(),
    task_list: new Parsers.TaskListParser(dataByFlowType, allTasksById),
    template: new Parsers.TemplateParser(),
    data_list: new Parsers.DataListParser(),
  };
  const parsedData: IParsedWorkbookData = {};
  Object.entries(dataByFlowType).forEach(([flow_type, contentFlows]) => {
    const parser = customParsers[flow_type]
      ? customParsers[flow_type]
      : new Parsers.DefaultParser();
    // parse all flows through the parser
    parsedData[flow_type] = contentFlows.map((flow) => {
      try {
        const parsed = parser.run(flow);
        return parsed;
      } catch (error) {
        throwTemplateParseError(error, flow);
      }
    });
  });
  return parsedData;
}

/**
 * Parses an xlsx file, returning an object with sheet names as keys
 * and a corresponding array of key-value pairs to represent the sheet data
 * (assumes header provided in top row)
 */
function convertXLSXSheetsToJson(xlsxFilePath: string) {
  const json = {};
  const workbook = xlsx.readFile(xlsxFilePath);
  const { Sheets } = workbook;
  Object.entries(Sheets).forEach(([sheet_name, worksheet]) => {
    /* If bold or italics, include HTML in cell value */
    Object.keys(worksheet).forEach((cellId) => {
      let html = worksheet[cellId]?.h;
      if (
        html !== undefined &&
        typeof html === "string" &&
        (html.indexOf("<b>") > -1 || html.indexOf("<em>") > -1 || html.indexOf("<i>") > -1)
      ) {
        html = html.replace(/<span[^>]*>/g, "<span>"); // Remove span style
        worksheet[cellId].v = html;
      }
    });

    json[sheet_name] = xlsx.utils.sheet_to_json(worksheet);
  });
  return json;
}

/**
 * Debug info to log and exit when a template parsing error occurs
 */
function throwTemplateParseError(error: Error, flow: FlowTypes.FlowTypeWithData) {
  const errMsg = boxen(
    `
${chalk.red("Template Parse Error")}

${chalk.yellow(flow.flow_name)}

${flow._xlsxPath}

This is likely an authoring error, see full stacktrace below
      `,
    { padding: 1, borderColor: "red" }
  );

  console.log(errMsg);

  console.error(error);
  throw errMsg;
  // process.exit(1);
}

interface IGDriveContentsEntry {
  id: string;
  name: string;
  // full relative path including parent folders and extension
  relativePath: string;
  mimeType: string;
  modifiedTime: string;
  folderPath: string;
  // only appears on xlsx uploaded files (not gsheet)
  fullFileExtension?: string;
  fileExtension?: string;
  md5Checksum?: string;
  size?: string;
  // populated during processing
  xlsxPath?: string;
}
interface IConvertedContentsEntry extends IContentsEntry {
  converterVersion: number;
}
