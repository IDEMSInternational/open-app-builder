import { FlowTypes } from "data-models";
import { FlowParser, IFlowParserOptions } from "./flow.parser";
import {
  assignTranslatedFields,
  getColumnMetadata,
  getFlowLanguage,
  parseListColumns,
  splitMetadataRow,
} from "./transforms";

/**
 * Process an imported data_list flow before it is written to app_data
 * - Remove the `${metadata}` row, if any (see `splitMetadataRow`)
 * - Remove language suffixes from column names and record them in `_translatedFields`
 *   (see `assignTranslatedFields`)
 * - Parse values of columns with names ending `_list` into arrays
 * - Assign `_metadata` column types from the `${metadata}` row, or inferred from the data
 *   (see `getColumnMetadata`)
 * - Update `_source` (see `FlowParser`)
 */
export class DataListParser extends FlowParser {
  override parse(
    flow: FlowTypes.FlowTypeWithData,
    options: IFlowParserOptions = {}
  ): FlowTypes.FlowTypeWithData {
    const { metadataRow, rows } = splitMetadataRow(flow.rows || [], flow.flow_name);
    const parsed = super.parse({ ...flow, rows }, options);
    const _metadata = getColumnMetadata(parsed.rows, metadataRow);
    if (Object.keys(_metadata).length === 0) return parsed;
    return { ...parsed, _metadata } as FlowTypes.FlowTypeWithData;
  }

  protected parseRows(
    rows: FlowTypes.Data_listRow[],
    flow: FlowTypes.FlowTypeWithData,
    options: IFlowParserOptions
  ) {
    const language = getFlowLanguage(flow);
    const { translations } = options;
    return rows.map((row) => {
      let parsed = assignTranslatedFields(row, language, { translations, context: "data_list" });
      parsed = parseListColumns(parsed);
      return parsed;
    });
  }
}

export function parseDataList(flow: FlowTypes.FlowTypeWithData, options?: IFlowParserOptions) {
  return new DataListParser().parse(flow, options);
}
