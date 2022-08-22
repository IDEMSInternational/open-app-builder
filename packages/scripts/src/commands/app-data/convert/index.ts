import * as fs from "fs-extra";
import { Command } from "commander";
import * as xlsx from "xlsx";
import * as path from "path";
import chalk from "chalk";
import logUpdate from "log-update";
import * as Parsers from "./parsers";
import { groupJsonByKey } from "./utils";
import { FlowTypes } from "data-models";
import { getActiveDeployment } from "../../deployment/get";
import { DefaultParser } from "./parsers";
import { ContentsFileProcessor } from "./processors/contentsFile";
import { IParsedWorkbookData } from "./types";
import {
  logCacheActionsSummary,
  logSheetErrorSummary,
  logSheetsSummary,
  throwTemplateParseError,
} from "./logging";

/***************************************************************************************
 * CLI
 * @example yarn
 *************************************************************************************/
const program = new Command("convert");
interface IProgramOptions {
  skipCache?: boolean;
  cacheFolder?: string;
  inputFolder?: string;
  outputFolder?: string;
}
export default program
  .description("Convert app data")
  .option("-i --input-folder <string>", "")
  .option("-s --skip-cache", "Wipe local conversion cache and process all files")
  .option("-c --cache-folder <string>", "")
  .option("-o --output-folder <string>", "")
  .action(async (options: IProgramOptions) => {
    await new AppDataConverter(options).run();
  });

/***************************************************************************************
 * Main Methods
 *************************************************************************************/

class AppDataConverter {
  /** Change version to invalidate any cached conversions */
  public converterVersion = 20220818.2;

  private activeDeployment = getActiveDeployment();
  private paths = {
    SHEETS_INPUT_FOLDER: "",
    SHEETS_CACHE_FOLDER: "",
    SHEETS_OUTPUT_FOLDER: "",
  };

  private conversionErrors = [];
  private conversionWarnings = [];

  constructor(private options: IProgramOptions) {
    console.log(chalk.yellow("App Data Convert"));
    // Setup Folders
    const { inputFolder, outputFolder, cacheFolder } = options;
    const { app_data, _workspace_path } = this.activeDeployment;
    const SHEETS_CACHE_FOLDER = app_data.converter_cache_path;
    this.paths = {
      SHEETS_INPUT_FOLDER: inputFolder || path.resolve(_workspace_path, "app_data", "sheets"),
      SHEETS_CACHE_FOLDER: cacheFolder || path.resolve(SHEETS_CACHE_FOLDER, "individual"),
      SHEETS_OUTPUT_FOLDER: outputFolder || path.resolve(SHEETS_CACHE_FOLDER, "converted"),
    };
    Object.values(this.paths).forEach((p) => fs.ensureDir(p));
    if (this.options.skipCache) {
      fs.emptyDirSync(SHEETS_CACHE_FOLDER);
    }
  }

  /**
   * Reads xlsx files from gdrive-download output and converts to json
   * objects representing sheet names and data values
   */
  public async run() {
    const actions = this.compareCachedConversions();
    this.processCacheDeletions(actions.DELETE);
    const cached: IParsedWorkbookData[] = actions.IGNORE.map((entry) =>
      this.loadCachedConversion(entry)
    );
    const converted = this.processSheetConversions(actions.CREATE);
    this.writeCacheContentsJson();
    const allConvertedData = [...converted, ...cached].filter((data) =>
      this.applySheetFilters(data)
    );
    const mergedData = this.mergeOutputsByType(allConvertedData);
    const postProcessedData = postProcessData(mergedData);
    this.writeOutputJsons(postProcessedData);
    logSheetsSummary(postProcessedData);
    logSheetErrorSummary(this.conversionWarnings, this.conversionErrors);
    console.log(chalk.yellow("Conversion Complete"));
  }

  /**
   * Read downloaded sheets contents folder and compare against cached conversions contents.
   * Generate a list of sheets requiring conversion and cached files requiring deletion
   */
  private compareCachedConversions() {
    const { SHEETS_INPUT_FOLDER, SHEETS_CACHE_FOLDER } = this.paths;
    const contentsProcessor = new ContentsFileProcessor<IGDriveContentsEntry>(
      this.converterVersion
    );
    const inputContents = contentsProcessor.read(SHEETS_INPUT_FOLDER);
    const cacheContents = contentsProcessor.read(SHEETS_CACHE_FOLDER);
    const actions = contentsProcessor.compare(inputContents, cacheContents);
    logCacheActionsSummary(actions);
    return actions;
  }

  private processCacheDeletions(entries: IGDriveContentsEntry[]) {
    const cacheBase = this.paths.SHEETS_CACHE_FOLDER;
    for (const entry of entries) {
      const targetFile = path.resolve(cacheBase, `${entry.relativePath}.json`);
      if (fs.existsSync(targetFile)) {
        fs.removeSync(targetFile);
      }
    }
  }

  private processSheetConversions(entries: IGDriveContentsEntry[]) {
    const { SHEETS_INPUT_FOLDER } = this.paths;
    let i = 0;
    let total = entries.length;
    const processed: IParsedWorkbookData[] = [];
    const jsonEntries = entries.map(({ xlsxPath }) => convertXLSXSheetsToJson(xlsxPath));

    for (let entry of entries) {
      const { xlsxPath } = entry;
      const json = convertXLSXSheetsToJson(xlsxPath);
      const merged = this.mergeAppData(SHEETS_INPUT_FOLDER, [{ json, xlsxPath }]);
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
    const outputBase = this.paths.SHEETS_OUTPUT_FOLDER;
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

  private writeCacheContentsJson() {
    return new ContentsFileProcessor(this.converterVersion).write(this.paths.SHEETS_CACHE_FOLDER);
  }

  private saveCachedConversion(entry: IGDriveContentsEntry, convertedData: any) {
    const { xlsxPath } = entry;
    const relativePath = path.relative(this.paths.SHEETS_INPUT_FOLDER, xlsxPath);
    const cacheTarget = path.resolve(this.paths.SHEETS_CACHE_FOLDER, `${relativePath}.json`);
    fs.ensureDirSync(path.dirname(cacheTarget));
    fs.writeFileSync(cacheTarget, JSON.stringify(convertedData, null, 2));
    const modifiedTime = new Date(entry.modifiedTime);
    // apply same modified time as original file for future comparison
    fs.utimesSync(cacheTarget, modifiedTime, modifiedTime);
  }

  private loadCachedConversion(entry: IGDriveContentsEntry) {
    const { xlsxPath } = entry;
    const relativePath = path.relative(this.paths.SHEETS_INPUT_FOLDER, xlsxPath);
    const cacheTarget = path.resolve(this.paths.SHEETS_CACHE_FOLDER, `${relativePath}.json`);
    const cachedConversion = fs.readJSONSync(cacheTarget);
    return cachedConversion;
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
    // data_pipe: new Parsers.DataPipeParser(),
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
