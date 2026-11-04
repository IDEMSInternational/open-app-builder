import { FlowTypes } from "data-models";
import { parseListColumns, updateElement } from "./transforms";

export interface IFlowParserOptions {
  /**
   * Whether the flow was synced from the google drive folder, so its `_source` links to the sheet
   * it came from and is kept. Otherwise `_source` is replaced, as the file may be a copy of a
   * synced flow
   */
  fixed?: boolean;
  /** Folder of the flow json, relative to the source sheets folder ("" for the root) */
  folder?: string;
}

/**
 * `_source` for a flow not synced from google drive. Replaces any existing `_source`, which
 * may have been copied from a synced file
 */
export function localFlowSource(folder = ""): FlowTypes.FlowTypeBase["_source"] {
  return { folder };
}

/**
 * Process an imported data_list flow before it is written to app_data
 * - Parse values of columns with names ending `_list` into arrays
 * - Replace `_source` with the local folder unless `fixed` is set
 */
export function parseDataList(
  flow: FlowTypes.FlowTypeWithData,
  options: IFlowParserOptions = {}
): FlowTypes.FlowTypeWithData {
  const { fixed = false, folder } = options;
  // Transforms applied to each individual row
  const rows = (flow.rows || []).map((row: FlowTypes.Data_listRow) => {
    let parsed = row;
    parsed = parseListColumns(parsed);
    return parsed;
  });

  const parsedFlow = fixed ? flow : updateElement(flow, "_source", localFlowSource(folder));
  return { ...parsedFlow, rows };
}
