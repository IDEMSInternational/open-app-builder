import { FlowTypes } from "../../../../types";
import { AbstractParser } from "../abstract.parser";
// When running this parser assumes there is a 'type' column
type IRowData = { type: string };

/**
 * The default processor performs the following:
 * - Look for rows starting `being_groupname` and `end_groupname`, form a
 * nested group `groupname_group`. E.g. `begin_step` and `end_step` -> `step_group`
 */
export class DefaultParser implements AbstractParser {
  /** All rows are handled in a queue, processing linearly */
  private queue: IRowData[];

  /** Default function to call a start the process of parsing rows */
  public run(flow: FlowTypes.FlowTypeWithData): FlowTypes.FlowTypeWithData {
    this.queue = flow.rows;
    const processedRows = [];
    while (this.queue.length > 0) {
      const row = this.queue[0];
      const processed = this.processRow(row, flow);
      // some rows may be omitted during processing so ignore
      if (processed) {
        processedRows.push(processed);
      }
      this.queue.shift();
    }
    return { ...flow, rows: processedRows };
  }

  /** Handle a single row */
  private processRow(row: IRowData, flow: FlowTypes.FlowTypeWithData) {
    const { type } = row;
    // Extract sub group where indicated
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
