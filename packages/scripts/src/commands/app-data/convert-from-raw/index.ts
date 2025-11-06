import * as fs from "fs-extra";
import { Command } from "commander";

import * as path from "path";
import chalk from "chalk";
import { FlowTypes } from "data-models";
import { ActiveDeployment } from "../../deployment/get";
import { IParsedWorkbookData } from "../convert/types";
import {
  createChildFileLogger,
  getLogs,
  Logger,
  getLogFiles,
  logWarning,
  standardiseNewlines,
  parseAppDataCollectionString,
} from "../convert/utils";
import { FlowParserProcessor } from "../convert/processors/flowParser/flowParser";
import { generateFolderFlatMap, IContentsEntry, IContentsEntryWithLocalPath } from "shared";
import { GDRIVE_FILE_ENTRY_ARRAY_SCHEMA, IGdriveEntry } from "@idemsInternational/gdrive-tools";
import { JsonFileCache } from "../convert/cacheStrategy/jsonFile";
import { MockJsonFileCache } from "../convert/cacheStrategy/jsonFile.mock";
import { RawJsonProcessor } from "../convert/processors/rawJson";

const METADATA_FILENAME = "_metadata.json";

interface ISheetJsonWithMeta {
  _metadata: IContentsEntry & { folderName: string };
  [sheet_name: string]: any;
}

/***************************************************************************************
 * CLI
 *************************************************************************************/
const program = new Command("convert-from-raw");
interface IProgramOptions {
  cacheFolder: string;
  /** comma-separated list in case of multiple folders */
  inputFolder: string;
  outputFolder: string;
  skipCache?: boolean;
}
export interface IConverterFromRawOptions extends Omit<IProgramOptions, "inputFolder"> {
  inputFolders: string[];
}
export default program
  .description("Convert app data from raw JSON format")
  .requiredOption("-i --input-folders <string>", "")
  .requiredOption("-c --cache-folder <string>", "")
  .requiredOption("-o --output-folder <string>", "")
  .option("-s --skip-cache", "Wipe local conversion cache and process all files")
  .action(async (options: IProgramOptions) => {
    const mappedOptions: IConverterFromRawOptions = {
      ...options,
      inputFolders: options.inputFolder.split(",").map((f) => f.trim()),
    };
    await new AppDataFromRawConverter(mappedOptions).run();
  });

/***************************************************************************************
 * Main Methods
 *************************************************************************************/

/**
 * The AppDataFromRawConverter handles the process of converting raw JSON files to final
 * app data flows. This is the second step after sync-raw has created the raw JSON format.
 */
export class AppDataFromRawConverter {
  public activeDeployment = ActiveDeployment.get();

  /** Base logger used by child processors */
  public logger = createChildFileLogger({ source: "raw-converter" });

  /** Base cache used by child processors */
  private cache: JsonFileCache;

  constructor(private options: IConverterFromRawOptions) {
    this.cache = options.skipCache
      ? new MockJsonFileCache()
      : new JsonFileCache(options.cacheFolder);
  }

  public async run() {
    // 1. Raw JSON -> Sheet JSON (reconstruct workbook structure)
    let allSheetJsons: ISheetJsonWithMeta[] = [];

    for (const inputFolder of this.options.inputFolders) {
      const folderName = path.basename(inputFolder);
      const rawJsons = await this.processRawJsonFolder(inputFolder, folderName);
      allSheetJsons.push(...rawJsons);
      await this.writeSheetJsons(path.basename(inputFolder), rawJsons);
    }

    // 2. Merge jsons with contents sheet, filter, apply direct overrides and sort
    const mergedJsons = allSheetJsons.map((v) => this.mergeContentsSheet(v));
    const allJsons = mergedJsons.flat();
    const filteredJsons = this.applyFlowFilters(allJsons);
    const sortedJsons = this.applyFlowSort(filteredJsons);

    // 3. Process Flow Data
    const processor = new FlowParserProcessor({ cache: this.cache });
    processor.logger = this.logger;
    const result = (await processor.process(sortedJsons)) as IParsedWorkbookData;
    this.writeOutputJsons(result);

    // 4. Extract Logs and return
    const { errors, warnings } = this.logOutputs();
    return { errors, warnings, result };
  }

  /**
   * Process raw JSON files from a folder and reconstruct workbook structure
   */
  private async processRawJsonFolder(
    inputFolder: string,
    folderName: string
  ): Promise<ISheetJsonWithMeta[]> {
    const rawJsonProcessor = new RawJsonProcessor({ cache: this.cache });
    rawJsonProcessor.logger = this.logger;

    // Process the folder to group sheets by source file
    const groupedSheets = await rawJsonProcessor.processRawJsonFolder(inputFolder);

    // Read metadata if available
    const metadata = await this.readRawMetaEntries(inputFolder);

    // Convert back to the expected format
    const result: ISheetJsonWithMeta[] = [];

    for (const [sourceFile, sheetsData] of Object.entries(groupedSheets)) {
      // Find metadata for this source file
      const fileMetadata = metadata.find((m) => m.relativePath === sourceFile);

      const baseMetadata = fileMetadata
        ? {
            ...this.mapDriveMetaToContents(fileMetadata),
            folderName,
            size_kb: 0, // Raw JSON doesn't have original file size
            md5Checksum: "", // Raw JSON doesn't have original checksum
            relativePath: fileMetadata.relativePath,
            modifiedTime: fileMetadata.modifiedTime,
          }
        : {
            relativePath: sourceFile,
            size_kb: 0,
            md5Checksum: "",
            folderName,
            modifiedTime: new Date().toISOString(),
          };

      const sheetJson: ISheetJsonWithMeta = {
        _metadata: baseMetadata as any,
        ...sheetsData,
      };

      result.push(sheetJson);
    }

    return result;
  }

  private async readRawMetaEntries(inputFolder: string): Promise<IGdriveEntry[]> {
    const metaPath = path.resolve(inputFolder, METADATA_FILENAME);
    if (!fs.existsSync(metaPath)) {
      return [];
    }
    try {
      const meta = await fs.readJson(metaPath);
      // Support both array format and object format (for backwards compatibility)
      const metaArray = Array.isArray(meta) ? meta : Object.values(meta);
      return GDRIVE_FILE_ENTRY_ARRAY_SCHEMA.parse(metaArray);
    } catch (error) {
      this.logger.warn(`Could not parse metadata: ${metaPath}`);
      return [];
    }
  }

  /**
   * App data sheets contain contents page with metadata that can be merged into regular data
   * Merge and collate with other existing data, warning in case of overwrites
   * @returns - array of all merged sheets (no grouping or collating)
   *
   */
  private mergeContentsSheet(json: ISheetJsonWithMeta) {
    const merged: { [flow_name: string]: FlowTypes.FlowTypeWithData } = {};
    const { _metadata, ...sheetData } = json;
    const contentList = sheetData["==content_list=="] as FlowTypes.FlowTypeWithData[];
    if (contentList) {
      for (const contents of contentList) {
        const { flow_name, parameter_list } = contents;
        if (flow_name) {
          if (sheetData.hasOwnProperty(flow_name)) {
            merged[flow_name] = {
              ...contents,
              rows: sheetData[flow_name],
              // HACK - temp hide properties to make it eaiser to review PR diffs
              // TODO - uncomment post https://github.com/IDEMSInternational/open-app-builder/pull/3166
              // _remoteFolder: _metadata.folderName,
              // _remoteUrl: _metadata.remoteUrl,
              _xlsxPath: _metadata.relativePath,
              // TODO - remove post https://github.com/IDEMSInternational/open-app-builder/pull/3166
              _sheetsFolderUrl: `https://drive.google.com/drive/u/0/folders/${_metadata.folderName}`,
            };
            // convert parameter list from string to object
            // TODO - handle converting in parser
            if (parameter_list) {
              merged[flow_name].parameter_list = parseAppDataCollectionString(
                parameter_list as any
              );
            }
          } else {
            this.logger.warn(chalk.yellow(`No Contents: ${flow_name}`));
          }
        }
      }
    } else {
      this.logger.warn(chalk.yellow(`No content_list sheet found in ${_metadata.relativePath}`));
    }
    return Object.values(merged);
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
  private logOutputs() {
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

  /** Filter undefined, non-released and filter-fn excluded sheets */
  private applyFlowFilters(flows: FlowTypes.FlowTypeWithData[]) {
    // concat array of arrays to single array
    const { sheets_filter_function } = this.activeDeployment.app_data;
    return flows
      .filter((flow) => flow.status === "released")
      .filter((flow) => sheets_filter_function(flow as any));
  }

  private applyFlowSort(flows: FlowTypes.FlowTypeWithData[]) {
    return flows.sort((a, b) => {
      // ensure data pipes are processed last (depend on other lists)
      if (a.flow_type === "data_pipe") return 1;
      if (b.flow_type === "data_pipe") return -1;
      const aHash = `${a.flow_type}/${a.flow_name}`;
      const bHash = `${b.flow_type}/${b.flow_name}`;
      // if same name ensure override order from download order
      if (aHash === bHash) return 0;
      return aHash > bHash ? 1 : -1;
    });
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

  /** Populate raw json conversions of xlsx files to sheet_json folder */
  private async writeSheetJsons(folderName: string, jsons: ISheetJsonWithMeta[]) {
    const { outputFolder } = this.options;
    const sheetJsonFolder = path.resolve(outputFolder, "../", "sheet_json");
    const mergedMetadata: Record<string, any> = {};
    // Write individual jsons
    for (const { _metadata, ...jsonData } of jsons) {
      const { relativePath } = _metadata;
      mergedMetadata[relativePath] = _metadata;
      const filePath = relativePath.replace(".xlsx", ".json");
      const targetFile = path.join(sheetJsonFolder, folderName, filePath);
      await fs.ensureDir(path.dirname(targetFile));
      const fileContents = standardiseNewlines(JSON.stringify(jsonData, null, 2));
      await fs.writeFile(targetFile, fileContents);
    }
    // Write metadata
    const metaFile = path.join(sheetJsonFolder, folderName, METADATA_FILENAME);
    const metaContents = standardiseNewlines(JSON.stringify(mergedMetadata, null, 2));
    await fs.ensureDir(path.dirname(metaFile));
    await fs.writeFile(metaFile, metaContents);
  }
}
