import * as xlsx from "xlsx";
import path from "path";
import { FlowTypes } from "data-models";
import { IConverterPaths } from "../types";
import chalk from "chalk";
import BaseProcessor from "./base";
import { existsSync } from "fs-extra";
import { IContentsEntry, parseAppDataCollectionString } from "../utils";

const cacheVersion = 20250515.0;
const sheetsFolderBaseUrl = "https://drive.google.com/drive/u/0/folders";

export class XLSXWorkbookProcessor extends BaseProcessor<IContentsEntry> {
  constructor(paths: IConverterPaths) {
    super({ paths, namespace: "xlsxWorkbookProcessor", cacheVersion });
  }

  public async processInput(entry: IContentsEntry) {
    const { relativePath } = entry;
    const inputFolder = this.context.paths.SHEETS_INPUT_FOLDER;
    const xlsxPath = path.resolve(inputFolder, relativePath);
    if (!existsSync(xlsxPath)) {
      this.logger.error({ message: `Xlsx not found: ${relativePath}` });
      return;
    }
    // convert and merge contents sheet
    const json = this.convertXLSXSheetsToJson(xlsxPath);
    const merged = this.mergeContentsSheet([{ json, xlsxPath }]);
    // Ensure all paths use / to match HTTP style paths
    const { SHEETS_INPUT_FOLDER } = this.context.paths;
    const _xlsxPath = path.relative(SHEETS_INPUT_FOLDER, xlsxPath).replace(/\\/g, "/");
    const sheetsFolderId = path.basename(SHEETS_INPUT_FOLDER);
    const sheetsFolderUrl = `${sheetsFolderBaseUrl}/${sheetsFolderId}`;
    const processed = merged.map((v) => {
      v._xlsxPath = _xlsxPath;
      v._sheetsFolderUrl = sheetsFolderUrl;
      return v;
    });
    return processed;
  }

  /**
   * Parses an xlsx file, returning an object with sheet names as keys
   * and a corresponding array of key-value pairs to represent the sheet data
   * (assumes header provided in top row)
   */
  private convertXLSXSheetsToJson(xlsxFilePath: string) {
    const json = {};
    const workbook = xlsx.readFile(xlsxFilePath);
    const { Sheets } = workbook;

    for (const [sheetName, worksheet] of Object.entries(Sheets)) {
      Object.values(worksheet).forEach(this.processCell);
      json[sheetName] = xlsx.utils.sheet_to_json(worksheet);
    }
    return json;
  }

  /**
   * Interpret cell formatting and update cell value
   */
  private processCell(cell: xlsx.CellObject) {
    if (!cell) return;

    // If bold or italics, include HTML in cell value
    let html = cell.h;
    if (
      html !== undefined &&
      typeof html === "string" &&
      (html.includes("<b>") || html.includes("<em>") || html.includes("<i>"))
    ) {
      html = html.replace(/<span[^>]*>/g, "<span>"); // Remove span style
      cell.v = html;
    }

    // If authored value was a percentage, override converted decimal value to preserve percentage representation
    // xlsx library parser saves formatted text version of cell value in the .w field
    // https://docs.sheetjs.com/docs/api/parse-options#parsing-options
    const cellText = cell.w;
    if (typeof cell.v === "number" && cellText?.includes("%")) {
      cell.v = cellText;
    }
  }

  /**
   * App data sheets contain contents page with metadata that can be merged into regular data
   * Merge and collate with other existing data, warning in case of overwrites
   * @returns - array of all merged sheets (no grouping or collating)
   */
  private mergeContentsSheet(jsons: { json: any; xlsxPath: string }[]) {
    const merged: { [flow_name: string]: FlowTypes.FlowTypeWithData } = {};
    const releasedSummary = {};
    const skippedSummary = {};
    for (let el of jsons) {
      const { json, xlsxPath } = el;
      const contentList = json["==content_list=="] as FlowTypes.FlowTypeWithData[];
      if (contentList) {
        for (const contents of contentList) {
          const { flow_name, flow_type, module, parameter_list } = contents;
          const filename = path.basename(xlsxPath, ".xlsx");
          // only include flows marked as released in the contents
          if (flow_name) {
            releasedSummary[flow_name] = { flow_type, module, filename };
            if (json.hasOwnProperty(flow_name)) {
              if (merged.hasOwnProperty(flow_name)) {
                this.logger.warn(chalk.yellow(`Duplicate flow: ${flow_name}`));
              }
              merged[flow_name] = { ...contents, rows: json[flow_name] };
              // convert parameter list from string to object
              if (parameter_list) {
                merged[flow_name].parameter_list = parseAppDataCollectionString(
                  parameter_list as any
                );
              }
            } else {
              this.logger.warn(chalk.yellow(`No Contents: ${flow_name}`));
            }
          } else {
            skippedSummary[flow_name] = { flow_type, module, filename };
          }
        }
      } else {
        this.logger.warn(chalk.yellow(`No Content List: ${path.basename(xlsxPath)}`));
      }
    }
    return Object.values(merged);
  }
}
