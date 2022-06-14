import * as fs from "fs-extra";
import { Command } from "commander";
import * as xlsx from "xlsx";
import * as path from "path";
import boxen from "boxen";
import chalk from "chalk";
import logUpdate from "log-update";
import * as Parsers from "./parsers";
import {
  groupJsonByKey,
  readContentsFileAsHashmap,
  generateFolderFlatMap,
  IContentsEntry,
} from "./utils";
import { FlowTypes } from "data-models";

import { getActiveDeployment } from "../../deployment/get";
import { DefaultParser } from "./parsers";

/***************************************************************************************
 * CLI
 * @example yarn
 *************************************************************************************/
const program = new Command("convert");
interface IProgramOptions {
  cacheFolder: string;
  inputFolder: string;
  outputFolder: string;
  skipCache?: boolean;
}
export default program
  .description("Convert app data")
  .requiredOption("-i --input-folder <string>", "")
  .requiredOption("-c --cache-folder <string>", "")
  .requiredOption("-o --output-folder <string>", "")
  .option("-s --skip-cache", "Wipe local conversion cache and process all files")
  .action(async (options: IProgramOptions) => {
    await new AppDataConverter(options).run();
  });

/***************************************************************************************
 * Main Methods
 *************************************************************************************/

class AppDataConverter {
  /** Change version to invalidate any cached conversions */
  public converterVersion = 1.7;

  private activeDeployment = getActiveDeployment();

  private conversionErrors = [];
  private conversionWarnings = [];

  constructor(private options: IProgramOptions) {
    console.log(chalk.yellow("App Data Convert"));
    // console.table(options);
    // Setup Folders
    const { inputFolder, outputFolder, cacheFolder } = options;
    [inputFolder, outputFolder, cacheFolder].forEach((p) => fs.ensureDir(p));
    if (this.options.skipCache) {
      fs.emptyDirSync(this.options.cacheFolder);
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
    const mergedData = this.mergeOutputsByType(allConvertedData);
    const postProcessedData = postProcessData(mergedData);
    this.writeOutputJsons(postProcessedData);
    this.logSheetsSummary(postProcessedData);
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
    const { inputFolder, cacheFolder } = this.options;
    const actions: IConverterActions = { convert: [], delete: [], skip: [] };
    // generate hashmap of input and cache contents
    const hashKey = "relativePath";
    const inputContents = readContentsFileAsHashmap(inputFolder, { hashKey });
    const cacheContents = readContentsFileAsHashmap(cacheFolder, { hashKey });
    // run comparisons
    Object.entries<IGDriveContentsEntry>(inputContents).forEach(([key, sourceFile]) => {
      // track the filename of the downloaded file (avoid duplicate .xlsx.xlsx depending if gsheet or xlsx original)
      const xlsxFilename = `${key.replace(".xlsx", "")}.xlsx`;
      sourceFile.xlsxPath = path.resolve(inputFolder, xlsxFilename);
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
      cacheFile.xlsxPath = path.resolve(cacheFolder, xlsxFilename);
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

  private processCacheDeletions(entries: IGDriveContentsEntry[]) {
    const cacheBase = this.options.cacheFolder;
    for (const entry of entries) {
      const targetFile = path.resolve(cacheBase, `${entry.relativePath}.json`);
      if (fs.existsSync(targetFile)) {
        fs.removeSync(targetFile);
      }
    }
  }

  private processSheetConversions(entries: IGDriveContentsEntry[]) {
    const { inputFolder } = this.options;
    let i = 0;
    let total = entries.length;
    const processed: IParsedWorkbookData[] = [];
    for (let entry of entries) {
      const { xlsxPath } = entry;
      const json = convertXLSXSheetsToJson(xlsxPath);
      const merged = this.mergeAppData(inputFolder, [{ json, xlsxPath }]);
      const dataByFlowType = groupJsonByKey(merged, "flow_type");
      try {
        const convertedData = processData(dataByFlowType);
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
        data[flow_type] = flows
          .filter((flow) => flow)
          .filter((flow) => sheets_filter_function(flow as any));
      });
    }
    return data;
  }

  /** Merge all workbook data by flow_type to allow post-processing by flow type */
  private mergeOutputsByType(workbooks: IParsedWorkbookData[]): IParsedWorkbookData {
    const merged: IParsedWorkbookData = {};
    for (const workbook of workbooks) {
      Object.entries(workbook).forEach(([flow_type, flowArray]) => {
        if (!merged[flow_type]) merged[flow_type] = [];
        flowArray.forEach((flow) => merged[flow_type].push(flow));
      });
    }
    return merged;
  }

  /** Write individual converted jsons to flow_type folders */
  private writeOutputJsons(data: IParsedWorkbookData) {
    const outputBase = this.options.outputFolder;
    fs.ensureDirSync(outputBase);
    fs.emptyDirSync(outputBase);
    Object.values(data).forEach((flowArray) => {
      Object.values(flowArray).forEach((flow) => {
        const { flow_type, flow_name, flow_subtype } = flow;
        const flowOutputPath = path.resolve(
          outputBase,
          flow_type,
          flow_subtype || "",
          `${flow_name}.json`
        );
        // TODO - track error if output path already exists (duplicate name)
        fs.ensureDirSync(path.dirname(flowOutputPath));
        fs.writeFileSync(flowOutputPath, JSON.stringify(flow, null, 2));
        // TODO - statsync
      });
    });
  }

  /** Collate totals of flows by subtype and log */
  private logSheetsSummary(data: IParsedWorkbookData) {
    const countBySubtype = {};
    Object.values(data).forEach((flows) => {
      flows.forEach((flow) => {
        let type = flow.flow_type;
        if (flow.flow_subtype) type += `.${flow.flow_subtype}`;
        if (!countBySubtype[type]) countBySubtype[type] = 0;
        countBySubtype[type]++;
      });
    });
    const logOutput = Object.keys(countBySubtype)
      .sort()
      .map((key) => {
        const [type, subtype] = key.split(".");
        return { type, subtype: subtype || null, total: countBySubtype[key] };
      });
    console.log("\nSheet Summary");
    console.table(logOutput);
  }

  private writeCacheContentsJson() {
    const contentsFilename = "_contents.json";
    const cacheHashmap = generateFolderFlatMap(this.options.cacheFolder, {
      filterFn: (p) => p !== contentsFilename,
    });
    const contentsData = Object.values(cacheHashmap).map((entry) => {
      entry.relativePath = entry.relativePath.replace(".json", "");
      const contentsEntry: IConvertedContentsEntry = {
        ...entry,
        converterVersion: this.converterVersion,
        relativePath: entry.relativePath.replace(".json", ""),
      };

      return contentsEntry;
    });

    const contentsOutput = path.resolve(this.options.cacheFolder, contentsFilename);
    fs.writeFileSync(contentsOutput, JSON.stringify(contentsData, null, 2));
  }

  private saveCachedConversion(entry: IGDriveContentsEntry, convertedData: any) {
    const { xlsxPath } = entry;
    const relativePath = path.relative(this.options.inputFolder, xlsxPath);
    const cacheTarget = path.resolve(this.options.cacheFolder, `${relativePath}.json`);
    fs.ensureDirSync(path.dirname(cacheTarget));
    fs.writeFileSync(cacheTarget, JSON.stringify(convertedData, null, 2));
    const modifiedTime = new Date(entry.modifiedTime);
    // apply same modified time as original file for future comparison
    fs.utimesSync(cacheTarget, modifiedTime, modifiedTime);
  }

  private loadCachedConversion(entry: IGDriveContentsEntry) {
    const { xlsxPath } = entry;
    const relativePath = path.relative(this.options.inputFolder, xlsxPath);
    const cacheTarget = path.resolve(this.options.cacheFolder, `${relativePath}.json`);
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

function processData(dataByFlowType: IParsedWorkbookData): IParsedWorkbookData {
  const parsedData: IParsedWorkbookData = {};
  const parsers = getDataParsers();
  Object.entries(dataByFlowType).forEach(([flow_type, contentFlows]) => {
    const parser: Parsers.AbstractParser = parsers[flow_type] || new DefaultParser();
    // process individual rows via parser.run method
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
function postProcessData(dataByFlowType: IParsedWorkbookData): IParsedWorkbookData {
  const parsedData: IParsedWorkbookData = {};
  const parsers = getDataParsers();
  Object.entries(dataByFlowType).forEach(([flow_type, contentFlows]) => {
    const parser: Parsers.AbstractParser = parsers[flow_type] || new DefaultParser();
    parsedData[flow_type] = parser.postProcessFlows(contentFlows);
  });
  return parsedData;
}

function getDataParsers() {
  // All flow types will be processed by the default parser unless otherwise specified here
  const customParsers: { [flowType in FlowTypes.FlowType]?: Parsers.AbstractParser } = {
    template: new Parsers.TemplateParser(),
    data_list: new Parsers.DataListParser(),
  };
  return customParsers;
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

interface IConverterActions {
  convert: IGDriveContentsEntry[];
  delete: IGDriveContentsEntry[];
  skip: IGDriveContentsEntry[];
}
