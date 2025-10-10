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
  createChildFileLogger,
  getLogs,
  Logger,
  getLogFiles,
  logWarning,
  standardiseNewlines,
} from "./utils";
import { FlowParserProcessor } from "./processors/flowParser/flowParser";
import { generateFolderFlatMap, IContentsEntry } from "shared";
import { GDRIVE_FILE_ENTRY_ARRAY_SCHEMA, IGdriveEntry } from "@idemsInternational/gdrive-tools";

const GRDIVE_METADATA_FILENAME = "_metadata.json";

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
  public version = 20241104.15;

  public activeDeployment = ActiveDeployment.get();

  public logger = createChildFileLogger({ source: "converter" });

  cache: JsonFileCache;

  private sheetJsons: { [folderId: string]: { [relativePath: string]: any } } = {};
  private sheetJsonMeta: { [folderId: string]: IContentsEntry[] } = {};

  constructor(
    private options: IConverterOptions,
    testOverrides: Partial<AppDataConverter> = {}
  ) {
    console.log(chalk.yellow("App Data Convert"));
    // optional overrides, used for tests
    if (testOverrides.version) this.version = testOverrides.version;
    if (testOverrides.activeDeployment) this.activeDeployment = testOverrides.activeDeployment;

    // Setup Folders
    const { outputFolder, cacheFolder } = options;
    [outputFolder, cacheFolder].forEach((p) => fs.ensureDir(p));
    if (this.options.skipCache) {
      this.cache.clear();
    }
    // Create a cache that can be used to invalidate all underlying processor caches
    this.cache = new JsonFileCache(cacheFolder, this.version);
  }

  public async run() {
    const { inputFolders, outputFolder, cacheFolder } = this.options;
    const combinedOutputsHashmap: Record<string, FlowTypes.FlowTypeWithData> = {};
    const converterPaths: IConverterPaths = {
      SHEETS_CACHE_FOLDER: cacheFolder,
      SHEETS_INPUT_FOLDER: "",
      SHEETS_OUTPUT_FOLDER: outputFolder,
    };

    // Processing Steps
    for (const inputFolder of inputFolders) {
      // 0. Extract list of files for conversion (with merged metadata)
      const fileEntries = await this.listFilesForConversion(inputFolder);

      // 1.1 Generate a list of xlsx files in data source and convert to json
      const folderOutputsHashmap: Record<string, FlowTypes.FlowTypeWithData> = {};
      converterPaths.SHEETS_INPUT_FOLDER = inputFolder;
      const xlsxConverter = new XLSXWorkbookProcessor(converterPaths);
      xlsxConverter.logger = this.logger;
      const data = await xlsxConverter.process(fileEntries);

      // 1.2 Sort and filter output jsons
      const outputs = this.cleanFlowOutputs(data);
      // 1.3 Merge jsons both within input sources (duplicate are errors) and across input sources (duplicates are overrrides)
      for (const output of outputs) {
        const hashName = `${output.flow_type}||${output.flow_name}`;
        if (folderOutputsHashmap[hashName]) {
          this.logDuplicateFlowError(folderOutputsHashmap[hashName], output);
        }
        folderOutputsHashmap[hashName] = output;
        if (combinedOutputsHashmap[hashName]) {
          this.logger.debug({
            message: "flow_override",
            details: { flow_type: output.flow_type, flow_name: output.flow_name, inputFolder },
          });
        }
        combinedOutputsHashmap[hashName] = output;
      }
      this.logger.debug({ step: inputFolder, outputs });

      // Store intermediate sheet JSONs
      const folderName = path.basename(inputFolder);
      this.sheetJsons[folderName] = xlsxConverter.convertedSheetJsons;
      this.sheetJsonMeta[folderName] = fileEntries.map(({ localPath, ...meta }) => meta);
    }
    // 2.1 - Convert all merged jsons to flow data using flow parsers
    const processor = new FlowParserProcessor(converterPaths);
    processor.logger = this.logger;
    const jsonFlows = Object.values(combinedOutputsHashmap);
    const result = (await processor.process(jsonFlows)) as IParsedWorkbookData;
    await this.writeSheetJsons();

    // TODO - write to disk and log
    const { errors, warnings } = this.logOutputs(result);
    return { result, errors, warnings };
  }

  private async listFilesForConversion(baseFolder: string) {
    // List all local xlsx files for conversion
    const localFiles = generateFolderFlatMap(baseFolder, {
      filterFn: (v) => v.endsWith(".xlsx"),
      includeLocalPath: true,
    });
    // Merge custom meta populated from google drive downloader
    const customMetadata = await this.readDriveMetaEntries(baseFolder);
    for (const item of customMetadata) {
      if (localFiles[item.relativePath]) {
        localFiles[item.relativePath] = { ...localFiles[item.relativePath], ...item };
      }
    }
    return Object.values(localFiles);
  }

  /**
   * Log error in case duplicate flows appear in the same folder
   * Duplicate flows across input folders are assumed overrides
   */
  private logDuplicateFlowError(
    initialFlow: FlowTypes.FlowTypeWithData,
    duplicateFlow: FlowTypes.FlowTypeWithData
  ) {
    const { flow_name, flow_type, _xlsxPath } = initialFlow;
    this.logger.error({
      message: "Duplicate flow name",
      details: { flow_name, flow_type, _xlsxPaths: [_xlsxPath, duplicateFlow._xlsxPath] },
    });
  }

  private async readDriveMetaEntries(inputFolder: string) {
    const metadataPath = path.resolve(inputFolder, GRDIVE_METADATA_FILENAME);
    const metadataExists = await fs.pathExists(metadataPath);
    if (metadataExists) {
      const metadataContents = await fs.readJSON(metadataPath);
      return GDRIVE_FILE_ENTRY_ARRAY_SCHEMA.parse(metadataContents).map((v) =>
        this.mapDriveMetaToContents(v)
      );
    } else {
      return [];
    }
  }

  private mapDriveMetaToContents(metadata: IGdriveEntry): Partial<IContentsEntry> {
    const { lastModifyingUser, relativePath, modifiedTime, id } = metadata;
    return {
      relativePath,
      modifiedTime,
      modifiedBy: lastModifyingUser?.displayName,
      remoteUrl: `https://docs.google.com/spreadsheets/d/${id}`,
    };
  }

  /** Create log of total warnings and errors */
  private logOutputs(result: IParsedWorkbookData) {
    this.writeOutputJsons(result);
    const warnings = getLogs("warn");
    if (warnings.length > 0) {
      const warningLogFile = getLogFiles().warn;
      logWarning({
        msg1: `Completed with ${warnings.length} warnings`,
        msg2: warningLogFile,
      });
    }
    const errors = getLogs("error");
    if (errors.length > 0) {
      const errorLogFile = getLogFiles().error;
      Logger.error({
        msg1: `Completed with errors`,
        msg2: errorLogFile,
        logOnly: true,
      });
    }
    console.log(chalk.yellow("Conversion Complete"));
    return { errors, warnings };
  }

  /** Filter undefined, non-released and filter-fn excluded sheets, and apply custom sort ordering */
  private cleanFlowOutputs(data: FlowTypes.FlowTypeWithData[][]) {
    // concat array of arrays to single array
    const flattened: FlowTypes.FlowTypeWithData[] = [].concat.apply([], data);
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

  /**
   * Populate raw json conversions of xlsx files to sheet_json folder
   * This is used by some deployments as part of git tracking, and in the future
   * may be used directly as a 2-step conversion process
   */
  private async writeSheetJsons() {
    const { outputFolder } = this.options;
    const sheetJsonFolder = path.resolve(outputFolder, "../", "sheet_json");
    // Write individual jsons
    for (const [folderId, convertedSheets] of Object.entries(this.sheetJsons)) {
      for (const [relativePath, convertedContent] of Object.entries(convertedSheets)) {
        const filePath = relativePath.replace(".xlsx", ".json");
        const targetFile = path.join(sheetJsonFolder, folderId, filePath);
        await fs.ensureDir(path.dirname(targetFile));
        const fileContents = standardiseNewlines(JSON.stringify(convertedContent, null, 2));
        await fs.writeFile(targetFile, fileContents);
      }
    }
    // Write metadata
    const metaFile = path.join(sheetJsonFolder, GRDIVE_METADATA_FILENAME);
    const metaContents = standardiseNewlines(JSON.stringify(this.sheetJsonMeta, null, 2));
    await fs.ensureDir(path.dirname(metaFile));
    await fs.writeFile(metaFile, metaContents);
  }
}
