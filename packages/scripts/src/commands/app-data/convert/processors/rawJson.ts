import BaseProcessor from "./base";
import { readFile } from "fs-extra";
import { basename, extname } from "path";
import { JsonFileCache } from "../cacheStrategy/jsonFile";

const cacheVersion = 20251104.0;
const namespace = "RawJsonProcessor";

/** Path to raw json file for conversion */
type InputType = { localPath: string; md5Checksum?: string };

type OutputType = { [sheetName: string]: Record<string, any> };

interface IRawSheetContent {
  source_file: string;
  sheet_name: string;
  metadata?: {
    flow_type: string;
    flow_name: string;
    status: string;
    flow_subtype?: string;
  };
  data: Record<string, any>[];
}

/**
 * The RawJsonProcessor handles converting raw JSON files (created by sync-raw command)
 * back to the sheet representation expected by the flow parser.
 * It groups sheets by their original source file to recreate the workbook structure.
 */
export class RawJsonProcessor extends BaseProcessor<InputType, OutputType> {
  constructor(context: { cache: JsonFileCache }) {
    super({ namespace, cache: context.cache });
    this.cache.configure(namespace, cacheVersion);
  }

  public override async processInput(input: InputType) {
    const { localPath } = input;

    try {
      const rawContent = await readFile(localPath, "utf8");
      const rawData: IRawSheetContent = JSON.parse(rawContent);

      // Extract sheet name and data
      const { sheet_name, data } = rawData;

      // Return in the format expected by the flow parser
      // This creates a single sheet workbook representation
      return { [sheet_name]: data };
    } catch (error) {
      this.logger.error(`Failed to process raw JSON file ${localPath}: ${error.message}`);
      return {};
    }
  }

  public override generateCacheEntryName(input: InputType): string {
    const { localPath, md5Checksum } = input;
    const filename = basename(localPath);
    const extName = extname(localPath);

    if (md5Checksum) {
      return filename.replace(`${extName}`, `.${md5Checksum}.json`);
    } else {
      // For raw JSON files, use file modification time as cache key if no checksum provided
      return filename.replace(`${extName}`, `.processed.json`);
    }
  }

  /**
   * Group raw JSON files by their original source file to recreate workbook structure
   */
  public async processRawJsonFolder(
    folderPath: string
  ): Promise<{ [sourceFile: string]: { [sheetName: string]: Record<string, any> } }> {
    const fs = require("fs-extra");
    const path = require("path");

    const result: { [sourceFile: string]: { [sheetName: string]: Record<string, any> } } = {};
    const contentListsBySourceFile: { [sourceFile: string]: any[] } = {};

    // Read all JSON files in the folder
    const files = await fs.readdir(folderPath);
    const jsonFiles = files.filter(
      (file: string) => file.endsWith(".json") && file !== "_metadata.json"
    );

    for (const jsonFile of jsonFiles) {
      const filePath = path.join(folderPath, jsonFile);

      try {
        const rawContent = await fs.readFile(filePath, "utf8");
        const rawData: IRawSheetContent = JSON.parse(rawContent);

        const { source_file, sheet_name, metadata, data } = rawData;

        // Initialize the source file entry if it doesn't exist
        if (!result[source_file]) {
          result[source_file] = {};
          contentListsBySourceFile[source_file] = [];
        }

        // Add the sheet data to the appropriate source file
        result[source_file][sheet_name] = data;

        // If this sheet has metadata, add it to the content list
        if (metadata) {
          contentListsBySourceFile[source_file].push(metadata);
        }
      } catch (error) {
        this.logger.error(`Failed to process raw JSON file ${filePath}: ${error.message}`);
      }
    }

    // Add reconstructed content lists to each source file
    for (const [sourceFile, contentList] of Object.entries(contentListsBySourceFile)) {
      if (contentList.length > 0) {
        result[sourceFile]["==content_list=="] = contentList;
      }
    }

    return result;
  }
}
