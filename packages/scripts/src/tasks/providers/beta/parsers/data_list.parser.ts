import { FlowTypes } from "data-models";
import { FlowParser, IFlowParserOptions } from "./flow.parser";
import { parseListColumns } from "./transforms";

/**
 * Process an imported data_list flow before it is written to app_data
 * - Parse values of columns with names ending `_list` into arrays
 * - Update `_source` (see `FlowParser`)
 */
export class DataListParser extends FlowParser {
  protected parseRows(rows: FlowTypes.Data_listRow[]) {
    return rows.map((row) => {
      let parsed = row;
      parsed = parseListColumns(parsed);
      return parsed;
    });
  }
}

export function parseDataList(flow: FlowTypes.FlowTypeWithData, options?: IFlowParserOptions) {
  return new DataListParser().parse(flow, options);
}
