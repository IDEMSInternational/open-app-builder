import * as fs from "fs-extra";

import * as path from "path";
import chalk from "chalk";
import { FlowTypes } from "data-models";
import { ActiveDeployment } from "../../../commands/deployment/get";
import { IParsedWorkbookData } from "./types";
import { XLSXWorkbookProcessor } from "./processors/xlsxWorkbook";
import {
  createChildFileLogger,
  getLogs,
  Logger,
  getLogFiles,
  logWarning,
  standardiseNewlines,
  parseAppDataCollectionString,
} from "./utils";
import { FlowParserProcessor } from "./processors/flowParser/flowParser";
import { generateFolderFlatMap, IContentsEntry, IContentsEntryWithLocalPath } from "shared";
import { GDRIVE_FILE_ENTRY_ARRAY_SCHEMA, IGdriveEntry } from "@idemsInternational/gdrive-tools";
import { JsonFileCache } from "./cacheStrategy/jsonFile";
import { MockJsonFileCache } from "./cacheStrategy/jsonFile.mock";

const METADATA_FILENAME = "_metadata.json";

interface ISheetJsonWithMeta {
  _metadata: IContentsEntry & { folderName: string };
  [sheet_name: string]: any;
}

interface IConverterOptions {
  cacheFolder: string;
  /** comma-separated list in case of multiple folders */
  inputFolders: string[];
  outputFolder: string;
  skipCache?: boolean;
}

/** Entry format for minimal flow metadata stored */
type FlowMetaEntry = Pick<
  FlowTypes.FlowTypeBase,
  "flow_type" | "flow_subtype" | "flow_name" | "_source"
>;

/***************************************************************************************
 * Main Methods
 *************************************************************************************/

/**
 * The AppDataConverter handles the process of converting xlsx workbooks to json
 * and then parsing as data flows
 */
export class AppDataConverter {
  public activeDeployment = ActiveDeployment.get();

  /** Base logger used by child processors */
  public logger = createChildFileLogger({ source: "converter" });

  /** Base cache used by child processors */
  private cache: JsonFileCache;

  constructor(private options: IConverterOptions) {
    // Setup Folders
    const { outputFolder, cacheFolder } = options;
    [outputFolder, cacheFolder].forEach((p) => fs.ensureDir(p));

    this.cache = cacheFolder ? new JsonFileCache(cacheFolder) : new MockJsonFileCache();

    if (this.options.skipCache) {
      this.cache.clear();
    }
  }

  public async run() {
    // 1. XLSX -> Sheet JSON
    let allSheetJsons: ISheetJsonWithMeta[] = [];
    for (const inputFolder of this.options.inputFolders) {
      // Extract list of files for conversion
      const fileEntries = await this.listFilesForConversion(inputFolder);
      const folderName = path.basename(inputFolder);
      // Convert to xlsx sheet representation (with merged metadata)
      const xlsxProcessor = new XLSXWorkbookProcessor({ cache: this.cache });
      xlsxProcessor.logger = this.logger;
      const converted = await xlsxProcessor.process(fileEntries);
      const sheetJsons: ISheetJsonWithMeta[] = converted.map((sheetData, i) => {
        const { localPath, ..._metadata } = fileEntries[i];
        return { _metadata: { ..._metadata, folderName }, ...sheetData };
      });
      sheetJsons.forEach((json) => allSheetJsons.push(json));
    }

    // 2. Merge jsons with contents sheet, filter, apply direct overrides and sort
    const mergedJsons = allSheetJsons.map((v) => this.mergeContentsSheet(v));
    const allJsons = mergedJsons.flat();
    const filteredJsons = this.applyFlowFilters(allJsons);
    const sortedJsons = this.applyFlowSort(filteredJsons);

    // 3. Write intermediate to file
    await this.writeSheetJsons(sortedJsons);

    // 4. Process Flow Data
    const processor = new FlowParserProcessor({ cache: this.cache });
    processor.logger = this.logger;
    const result = (await processor.process(sortedJsons)) as IParsedWorkbookData;
    this.writeOutputJsons(result);

    // 5. Extract Logs and return
    const { errors, warnings } = this.logOutputs();
    return { errors, warnings, result };
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
              _source: {
                name: _metadata.folderName,
                path: _metadata.relativePath,
                url: _metadata.remoteUrl,
              },
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
      this.logger.warn(chalk.yellow(`No Content List: ${_metadata.relativePath}`));
    }

    return Object.values(merged);
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
    return Object.values(localFiles) as IContentsEntryWithLocalPath[];
  }

  private async readDriveMetaEntries(inputFolder: string) {
    const metadataPath = path.resolve(inputFolder, METADATA_FILENAME);
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
  private async writeSheetJsons(jsons: FlowTypes.FlowTypeWithData[]) {
    const { outputFolder } = this.options;
    const sheetJsonFolder = path.resolve(outputFolder, "../", "sheet_json");
    await fs.ensureDir(sheetJsonFolder);
    await fs.emptyDir(sheetJsonFolder);
    const mergedMetadata: FlowMetaEntry[] = [];
    // Write individual jsons, keeping source metadata in top-level file
    // and contents in individual jsons by {flow_type}/{flow_name}
    for (const { _source, ...jsonData } of jsons) {
      const { flow_type, flow_subtype, flow_name } = jsonData;
      const metaEntry = { flow_type, ...(flow_subtype && { flow_subtype }), flow_name, _source };
      mergedMetadata.push(metaEntry);
      const targetFile = path.join(sheetJsonFolder, flow_type, `${flow_name}.json`);
      await fs.ensureDir(path.dirname(targetFile));
      const fileContents = standardiseNewlines(JSON.stringify(jsonData, null, 2));
      await fs.writeFile(targetFile, fileContents);
    }
    // Write metadata
    const metaFile = path.join(sheetJsonFolder, METADATA_FILENAME);
    const metaContents = standardiseNewlines(JSON.stringify(mergedMetadata, null, 2));
    await fs.writeFile(metaFile, metaContents);
  }
}
