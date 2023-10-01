import * as fs from "fs-extra";
import { Command } from "commander";

import * as path from "path";
import chalk from "chalk";
import { FlowTypes } from "data-models";
import { ActiveDeployment } from "../../deployment/get";
import { IConverterPaths, IParsedWorkbookData } from "./types";
import { XLSXWorkbookProcessor } from "./processors/xlsxWorkbook";
import { JsonFileCache } from "./cacheStrategy/jsonFile";
import {
  generateFolderFlatMap,
  createChildFileLogger,
  logSheetsSummary,
  getLogs,
  Logger,
  getLogFiles,
  logWarning,
  clearLogs,
  standardiseNewlines,
} from "./utils";
import { FlowParserProcessor } from "./processors/flowParser/flowParser";

/***************************************************************************************
 * CLI
 * @example yarn
 *************************************************************************************/
const program = new Command("convert");
interface IProgramOptions {
  cacheFolder: string;
  /** comma-separated list in case of multiple folders */
  inputFolder: string;
  outputFolder: string;
  skipCache?: boolean;
}
export interface IConverterOptions extends Omit<IProgramOptions, "inputFolder"> {
  inputFolders: string[];
}
export default program
  .description("Convert app data")
  .requiredOption("-i --input-folders <string>", "")
  .requiredOption("-c --cache-folder <string>", "")
  .requiredOption("-o --output-folder <string>", "")
  .option("-s --skip-cache", "Wipe local conversion cache and process all files")
  .action(async (options: IProgramOptions) => {
    const mappedOptions: IConverterOptions = {
      ...options,
      inputFolders: options.inputFolder.split(",").map((f) => f.trim()),
    };
    await new AppDataConverter(mappedOptions).run();
  });

/***************************************************************************************
 * Main Methods
 *************************************************************************************/

/**
 * The AppDataConverter handles the process of converting xlsx workbooks to json
 * and then parsing as data flows
 *
 * TODO - can likely also be an extension of the base converter (?)
 */
export class AppDataConverter {
  /** Change version to invalidate all underlying caches */
  public version = 20230406.1;

  public activeDeployment = ActiveDeployment.get();

  public logger = createChildFileLogger({ source: "converter" });

  cache: JsonFileCache;

  constructor(private options: IConverterOptions, testOverrides: Partial<AppDataConverter> = {}) {
    // optional overrides, used for tests
    if (testOverrides.version) this.version = testOverrides.version;
    if (testOverrides.activeDeployment) this.activeDeployment = testOverrides.activeDeployment;

    console.log(chalk.yellow("App Data Convert"));
    // Setup Folders
    const { outputFolder, cacheFolder } = options;
    [outputFolder, cacheFolder].forEach((p) => fs.ensureDir(p));
    if (this.options.skipCache) {
      this.cache.clear();
    }
    // Create a cache that can be used to invalidate all underlying processor caches
    this.cache = new JsonFileCache(cacheFolder, this.version);
  }

  /**
   * Reads xlsx files from gdrive-download output and converts to json
   * objects representing sheet names and data values
   */
  public async run() {
    clearLogs();
    const { inputFolders, outputFolder, cacheFolder } = this.options;
    const filterFn = (relativePath: string) => relativePath.endsWith(".xlsx");
    let mergedOutputsHashmap: Record<string, FlowTypes.FlowTypeWithData> = {};
    const converterPaths: IConverterPaths = {
      SHEETS_CACHE_FOLDER: cacheFolder,
      SHEETS_INPUT_FOLDER: "",
      SHEETS_OUTPUT_FOLDER: outputFolder,
    };
    // Process each input folder, converting xlsx to json
    for (const inputFolder of inputFolders) {
      converterPaths.SHEETS_INPUT_FOLDER = inputFolder;
      const list = generateFolderFlatMap(inputFolder, { filterFn });
      const xlsxConverter = new XLSXWorkbookProcessor(converterPaths);
      const data = await xlsxConverter.process(Object.values(list));
      const outputs = this.cleanFlowOutputs(data);
      // merge outputs across folders, with latter processed overriding any flows with same type and name
      for (const output of outputs) {
        mergedOutputsHashmap[`${output.flow_type}||${output.flow_name}`] = output;
      }
      this.logger.debug({ step: inputFolder, outputs });
    }
    // Process jsons as flows
    const processor = new FlowParserProcessor(converterPaths);
    const jsonFlows = Object.values(mergedOutputsHashmap);
    const result = (await processor.process(jsonFlows)) as IParsedWorkbookData;
    const { errors, warnings } = this.logOutputs(result);
    return { result, errors, warnings };
  }

  private logOutputs(result: IParsedWorkbookData) {
    this.writeOutputJsons(result);
    logSheetsSummary(result);
    // warnings
    const warnings = getLogs("warning");
    if (warnings.length > 0) {
      const errorLogFile = getLogFiles().error;
      logWarning({
        msg1: `Completed with ${warnings.length} warnings`,
        msg2: errorLogFile,
      });
    }
    // errors
    const errors = getLogs("error");
    if (errors.length > 0) {
      const errorLogFile = getLogFiles().error;
      Logger.error({
        msg1: `Completed with errors`,
        msg2: errorLogFile,
        logOnly: true,
      });
    }
    // logSheetErrorSummary(this.conversionWarnings, this.conversionErrors);
    console.log(chalk.yellow("Conversion Complete"));
    return { errors, warnings };
  }

  private cleanFlowOutputs(data: FlowTypes.FlowTypeWithData[][]) {
    // concat array or arrays to single array
    const flattened: FlowTypes.FlowTypeWithData[] = [].concat.apply([], data);
    // filter undefined, non-released and according to deployment filter
    const { sheets_filter_function } = this.activeDeployment.app_data;
    const filtered = flattened
      .filter((flow) => flow.status === "released")
      .filter((flow) => sheets_filter_function(flow as any));
    // sort by flow type and so that data pipes are processed last (depend on other lists)
    const sorted = filtered.sort((a, b) => {
      if (a.flow_type === "data_pipe") return 1;
      if (b.flow_type === "data_pipe") return -1;
      return a.flow_type > b.flow_type ? 1 : -1;
    });
    return sorted;
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

        fs.ensureDirSync(path.dirname(flowOutputPath));
        // ensure newline characters are standardised (i.e. replace "\r\n" with "\n")
        fs.writeFileSync(flowOutputPath, standardiseNewlines(JSON.stringify(flow, null, 2)));
      });
    });
  }
}
