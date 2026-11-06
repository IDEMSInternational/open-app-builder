import { FlowTypes } from "data-models";
import { parseListColumns } from "./transforms";

/**
 * Process an imported data_list flow before it is written to app_data
 * - Parse values of columns with names ending `_list` into arrays
 */
export function parseDataList(flow: FlowTypes.FlowTypeWithData): FlowTypes.FlowTypeWithData {
  // Transforms applied to each individual row
  const rows = (flow.rows || []).map((row: FlowTypes.Data_listRow) => {
    let parsed = row;
    parsed = parseListColumns(parsed);
    return parsed;
  });

  return { ...flow, rows };
}
