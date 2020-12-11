import chalk from "chalk";
import * as fs from "fs-extra";
import { FlowTypes } from "../../../../types";
import { AbstractParser } from "../abstract.parser";
// When running this parser assumes there is a 'type' column
type IRowData = { type: string };

/** Prefix for use with images in the app */
const ASSETS_BASE = "assets/plh_assets";

const ASSETS_CACHE_PATH = "src/gdrive-download/cache/plh_assets";

/**
 * The default processor performs the following:
 * - Look for rows starting `begin_groupname` and `end_groupname`, form a
 * nested group `groupname_group`. E.g. `begin_step` and `end_step` -> `step_group`
 * - Rewrite urls for `_asset` types to direct to local assets folder
 * - Rewrite `_list` content as string array
 */
export class DefaultParser implements AbstractParser {
  /** All rows are handled in a queue, processing linearly */
  private queue: IRowData[];
  private summary = { missingAssets: [] };

  /** Default function to call a start the process of parsing rows */
  public run(flow: FlowTypes.FlowTypeWithData): FlowTypes.FlowTypeWithData {
    this.queue = flow.rows;
    const processedRows = [];
    while (this.queue.length > 0) {
      const row = this.queue[0];
      const processed = this.processRow(row, flow);
      // some rows may be omitted during processing so ignore
      if (processed) {
        const postProcessed = this.postProcess(processed);
        processedRows.push(postProcessed);
      }
      this.queue.shift();
    }
    if (this.summary.missingAssets.length > 0) {
      console.log(chalk.red("Missing Assets:"));
      console.table(this.summary.missingAssets);
    }

    return { ...flow, rows: processedRows };
  }

  /** If extending the class add additional postprocess pipeline here */
  public postProcess(row: any) {
    return row;
  }

  /** Handle a single row */
  private processRow(row: IRowData, flow: FlowTypes.FlowTypeWithData) {
    // Handle specific data manipulations for fields
    Object.keys(row).forEach((field) => {
      if (field.endsWith("_asset")) {
        row[field] = this.handleAssetLinks(row[field], flow.flow_name);
      }
      if (field.endsWith("_list")) {
        // rewrite asset urls
        row[field] = row[field].split(";").map((val: string) => val.trim());
      }
    });

    // Extract any required groups that start from this row
    const type = row.type || "";
    if (type.startsWith("begin_")) {
      const group = this.extractGroup();
      const groupType = type.replace("begin_", "") + "_group";
      const parsedGroup = new DefaultParser().run({ ...flow, rows: group });
      return { type: groupType, rows: parsedGroup.rows };
    }
    // Can ignore as handled during subgroup extraction
    if (type.startsWith("end_")) {
      return;
    }
    return row;
  }

  /** Rewrite urls for local assets and check if currently exists in assets cache */
  private handleAssetLinks(assetPath: string, flow_name: string) {
    // log missing asset
    if (!fs.existsSync(`${ASSETS_CACHE_PATH}/${assetPath}`)) {
      this.summary.missingAssets.push({ flow_name, assetPath });
    }
    // rewrite asset urls for use in app
    assetPath = `${ASSETS_BASE}/${assetPath}`;
    return assetPath;
  }

  /**
   * Look through current queue for first instance of a group defined by `begin_` and `end_`
   * row types. Keeps an internal tally of any additional `begin_` types to handle case
   * where further groups are nested within a group
   */
  private extractGroup(startIndex = 0): IRowData[] {
    let nestedIfCount = 0;
    const endIndex = this.queue.slice(startIndex).findIndex((row) => {
      const { type } = row;
      if (type.startsWith("begin_")) nestedIfCount++;
      if (type.startsWith("end_")) nestedIfCount--;
      return nestedIfCount === 0;
    });
    if (endIndex === -1) {
      console.log("could not find end index", startIndex);
      process.exit(1);
    }
    const queueEndIndex = startIndex + endIndex;
    // remove all rows from the queue excluding start and end clause statements (e.g. if/end-if)
    const groupedRows = this.queue.splice(1, queueEndIndex - 1);
    return groupedRows;
  }
}
