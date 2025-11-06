import * as fs from "fs-extra";
import * as path from "path";
import { Command } from "commander";
import { ActiveDeployment } from "../../deployment/get";
import { xlsxToJson } from "../convert/utils/xlsx.utils";
import { generateFolderFlatMap, IContentsEntry, IContentsEntryWithLocalPath } from "shared";
import { GDRIVE_FILE_ENTRY_ARRAY_SCHEMA, IGdriveEntry } from "@idemsInternational/gdrive-tools";
import { createChildFileLogger, standardiseNewlines } from "../convert/utils";

const METADATA_FILENAME = "_metadata.json";

/***************************************************************************************
 * CLI
 *************************************************************************************/
interface IProgramOptions {
  /** comma-separated list in case of multiple folders */
  inputFolder: string;
  outputFolder: string;
}

const program = new Command("sync-raw");
export default program
  .description("Sync raw sheet data from Google Sheets to simple JSON format")
  .requiredOption(
    "-i --input-folders <string>",
    "Comma-separated list of input folders containing XLSX files"
  )
  .requiredOption("-o --output-folder <string>", "Output folder for raw JSON files")
  .action(async (options: IProgramOptions) => {
    const inputFolders = options.inputFolder.split(",").map((f) => f.trim());
    await new RawSheetsSyncer({ inputFolders, outputFolder: options.outputFolder }).run();
  });

/***************************************************************************************
 * Main Class
 *************************************************************************************/

interface IRawSyncOptions {
  inputFolders: string[];
  outputFolder: string;
}

interface IRawSheetJsonWithMeta {
  _metadata: IContentsEntry & { folderName: string };
  [sheet_name: string]: any;
}

/**
 * The RawSheetsSyncer downloads Google Sheets and converts them to a simple JSON format
 * with minimal processing. Each sheet becomes a JSON file named after the sheet tab,
 * containing a simple table structure with the first row as headers.
 */
export class RawSheetsSyncer {
  public activeDeployment = ActiveDeployment.get();
  public logger = createChildFileLogger({ source: "raw-syncer" });

  constructor(private options: IRawSyncOptions) {}

  public async run() {
    // 1. XLSX -> Raw Sheet JSON
    let allSheetJsons: IRawSheetJsonWithMeta[] = [];

    for (const inputFolder of this.options.inputFolders) {
      // Extract list of files for conversion
      const fileEntries = await this.listFilesForConversion(inputFolder);
      const folderName = path.basename(inputFolder);

      // Convert XLSX files to simple JSON format
      for (const fileEntry of fileEntries) {
        const { localPath } = fileEntry;
        this.logger.info(`Processing: ${localPath}`);

        try {
          const xlsxData = await fs.readFile(localPath);
          const sheetsData = xlsxToJson(xlsxData);

          const sheetJson: IRawSheetJsonWithMeta = {
            _metadata: { ...fileEntry, folderName },
            ...sheetsData,
          };

          allSheetJsons.push(sheetJson);
        } catch (error) {
          this.logger.error(`Failed to process ${localPath}: ${error.message}`);
        }
      }

      // Write raw JSON files for this folder
      await this.writeRawSheetJsons(folderName, allSheetJsons);
    }

    this.logger.info(`Processed ${allSheetJsons.length} sheet files`);
    return this.options.outputFolder;
  }

  private async listFilesForConversion(baseFolder: string): Promise<IContentsEntryWithLocalPath[]> {
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

  private async readDriveMetaEntries(inputFolder: string): Promise<IGdriveEntry[]> {
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

  /** Write raw JSON files in simple format */
  private async writeRawSheetJsons(folderName: string, jsons: IRawSheetJsonWithMeta[]) {
    const { outputFolder } = this.options;
    const rawJsonFolder = path.resolve(outputFolder, "raw_sheets", folderName);
    const mergedMetadata: Record<string, any> = {};

    // Ensure output directory exists
    await fs.ensureDir(rawJsonFolder);

    // Write individual sheet JSONs
    for (const sheetJson of jsons) {
      const { _metadata, ...sheetsData } = sheetJson;
      const { relativePath } = _metadata;
      mergedMetadata[relativePath] = _metadata;

      // Find content list to get metadata for each sheet
      const contentList = sheetsData["==content_list=="] || [];
      const contentMap = new Map();

      // Create mapping of sheet names to their metadata from content list
      if (Array.isArray(contentList)) {
        for (const contentItem of contentList) {
          if (contentItem.flow_name) {
            contentMap.set(contentItem.flow_name, {
              flow_type: contentItem.flow_type,
              flow_name: contentItem.flow_name,
              status: contentItem.status,
              flow_subtype: contentItem.flow_subtype,
            });
          }
        }
      }

      // Create a separate JSON file for each sheet tab (excluding content_list)
      for (const [sheetName, sheetData] of Object.entries(sheetsData)) {
        // Skip content_list sheets and empty/invalid sheets
        if (
          sheetName === "==content_list==" ||
          !Array.isArray(sheetData) ||
          sheetData.length === 0
        ) {
          continue;
        }

        // Use just the sheet name as filename
        const targetFileName = `${sheetName}.json`;
        const targetFilePath = path.join(rawJsonFolder, targetFileName);

        // Get metadata for this sheet from content list
        const sheetMetadata = contentMap.get(sheetName) || {
          flow_type: "unknown",
          flow_name: sheetName,
          status: "unknown",
        };

        // New structure: metadata + data in single file
        const rawSheetContent = {
          source_file: relativePath,
          sheet_name: sheetName,
          metadata: sheetMetadata,
          data: sheetData,
        };

        const fileContents = standardiseNewlines(JSON.stringify(rawSheetContent, null, 2));
        await fs.writeFile(targetFilePath, fileContents);

        this.logger.info(`Wrote raw sheet: ${targetFileName}`);
      }
    }

    // Write metadata file
    const metaFile = path.join(rawJsonFolder, METADATA_FILENAME);
    const metaContents = standardiseNewlines(JSON.stringify(mergedMetadata, null, 2));
    await fs.writeFile(metaFile, metaContents);
  }
}
