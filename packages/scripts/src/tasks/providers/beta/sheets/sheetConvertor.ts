import { FlowTypes } from "data-models";
import * as xlsx from "xlsx";
import { xlsxToJson } from "../../../../lib/app-data/convert/utils/xlsx.utils";
import { logWarning } from "../../../../utils";

const CONTENT_LIST_SHEET = "==content_list==";
/** Excel limits tab names to 31 characters, and the xlsx writer enforces it */
const MAX_TAB_NAME_LENGTH = 31;

/**
 * Convert between sheets (xlsx workbooks in the authoring format) and flows (the jsons kept in
 * the external deployment, before they are run through the parsers).
 *
 * A workbook has a `==content_list==` tab listing its flows, and a tab per flow, named after
 * the flow, containing its rows. Row data is kept as authored in both directions
 */
export class SheetConvertor {
  /**
   * Convert an xlsx workbook to flows. Each entry in the `==content_list==` tab produces a flow
   * containing all content list columns (flow_type, flow_name, and any others) along with the
   * rows from the matching tab. Entries without a flow_name or matching tab are skipped
   */
  static sheetToFlow(xlsxData: Buffer, sourcePath: string): FlowTypes.FlowTypeWithData[] {
    const sheetData = xlsxToJson(xlsxData);
    const contentList = sheetData[CONTENT_LIST_SHEET] as FlowTypes.FlowTypeBase[];
    if (!contentList) {
      logWarning({ msg1: "No Content List", msg2: sourcePath });
      return [];
    }
    const flows: FlowTypes.FlowTypeWithData[] = [];
    for (const { flow_type, flow_name, ...contentColumns } of contentList) {
      if (!flow_name) continue;
      if (!Object.prototype.hasOwnProperty.call(sheetData, flow_name)) {
        logWarning({ msg1: `No Contents: ${flow_name}`, msg2: sourcePath });
        continue;
      }
      flows.push({
        flow_type,
        flow_name,
        ...contentColumns,
        rows: sheetData[flow_name],
      } as FlowTypes.FlowTypeWithData);
    }
    return flows;
  }

  /**
   * Convert one or more flows to an xlsx workbook: a `==content_list==` tab listing the flows,
   * and a tab per flow containing its rows. `_source` and the `transient` tag are not written,
   * as they are set by the sync
   */
  static flowToSheet(flows: FlowTypes.FlowTypeWithData | FlowTypes.FlowTypeWithData[]) {
    const flowList = Array.isArray(flows) ? flows : [flows];
    if (flowList.length === 0) throw new Error("At least one flow is required");
    const contentsRows: Record<string, any>[] = [];
    const tabs: { name: string; rows: Record<string, any>[] }[] = [];
    for (const flow of flowList) {
      const {
        rows = [],
        _source,
        transient,
        ...contents
      } = flow as FlowTypes.FlowTypeWithData & { transient?: string };
      if (flow.flow_name.length > MAX_TAB_NAME_LENGTH) {
        throw new Error(
          `Flow name is longer than ${MAX_TAB_NAME_LENGTH} characters, create the sheet manually: ${flow.flow_name}`
        );
      }
      // Tabs are named by flow_name, so the same name cannot be used twice (e.g. by different types)
      if (tabs.some(({ name }) => name === flow.flow_name)) {
        throw new Error(`Flow name used more than once in workbook: ${flow.flow_name}`);
      }
      contentsRows.push(contents);
      tabs.push({ name: flow.flow_name, rows });
    }
    const workbook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(workbook, toWorksheet(contentsRows), CONTENT_LIST_SHEET);
    for (const { name, rows } of tabs) {
      xlsx.utils.book_append_sheet(workbook, toWorksheet(rows), name);
    }
    return workbook;
  }
}

/** Convert rows to a worksheet, with columns in the order they first appear */
function toWorksheet(rows: Record<string, any>[]) {
  const header: string[] = [];
  const cellRows = rows.map((row) => {
    const cells: Record<string, string | number | boolean> = {};
    for (const [key, value] of Object.entries(row)) {
      if (value === undefined || value === null) continue;
      if (!header.includes(key)) header.push(key);
      // Rows are kept as authored by the sync so should be primitive, but keep anything else
      cells[key] = typeof value === "object" ? JSON.stringify(value) : value;
    }
    return cells;
  });
  return xlsx.utils.json_to_sheet(cellRows, { header });
}
