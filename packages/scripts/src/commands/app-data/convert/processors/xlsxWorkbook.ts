import * as xlsx from "xlsx";
import path from "path";
import { FlowTypes } from "data-models";
import { IConverterPaths } from "../types";
import chalk from "chalk";
import BaseProcessor from "./base";
import { existsSync } from "fs-extra";
import { IContentsEntry } from "../utils";

export class XLSXWorkbookProcessor extends BaseProcessor<IContentsEntry> {
  public cacheVersion = 20220823.1;
  constructor(paths: IConverterPaths) {
    super({ paths, namespace: "xlsxWorkbookProcessor" });
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
    const processed = merged.map((v) => {
      v._xlsxPath = _xlsxPath;
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
          const { flow_name, flow_type, module } = contents;
          const filename = path.basename(xlsxPath, ".xlsx");
          // only include flows marked as released in the contents
          if (flow_name) {
            releasedSummary[flow_name] = { flow_type, module, filename };
            if (json.hasOwnProperty(flow_name)) {
              if (merged.hasOwnProperty(flow_name)) {
                this.logger.warn(chalk.yellow(`Duplicate flow: ${flow_name}`));
              }
              merged[flow_name] = { ...contents, rows: json[flow_name] };
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
