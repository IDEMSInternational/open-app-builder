import { FlowTypes } from "data-models";
import { isObjectLiteral } from "shared";
import { parseAppDataCollectionString } from "../../../../../lib/app-data/convert/utils";
import { logWarning } from "../../../../../utils";
import { splitLanguageSuffix } from "./translations.transform";

/**
 * `id` of the data_list row that defines column metadata, e.g. `type: number` in each column.
 * Adapted from the `@metadata` row of the legacy data_list parser
 */
export const METADATA_ROW_ID = "${metadata}";

type IDataListMetadata = NonNullable<FlowTypes.Data_list["_metadata"]>;

/**
 * Remove the metadata row from data_list rows. Only a first row is used, any other metadata
 * row is removed with a warning so it is not kept as data
 */
export function splitMetadataRow(rows: FlowTypes.Data_listRow[], context?: string) {
  const [firstRow, ...otherRows] = rows;
  const metadataRow = firstRow?.id === METADATA_ROW_ID ? firstRow : undefined;
  const dataRows = (metadataRow ? otherRows : rows).filter((row) => {
    if (row.id !== METADATA_ROW_ID) return true;
    logWarning({ msg1: `"${METADATA_ROW_ID}" row must be the first row, skipping`, msg2: context });
    return false;
  });
  return { metadataRow, rows: dataRows };
}

/**
 * Get column metadata from a metadata row if given, or infer column types from the data.
 * Columns of type `string` are omitted, as this is the default at runtime
 * (`DynamicDataService.inferSchema`)
 * @param rows parsed data rows
 * @param metadataRow authored metadata row, see `splitMetadataRow`
 */
export function getColumnMetadata(
  rows: FlowTypes.Data_listRow[],
  metadataRow?: FlowTypes.Data_listRow
): IDataListMetadata {
  const metadata = metadataRow ? metadataFromRow(metadataRow) : inferMetadataFromRows(rows);
  for (const [column, { type }] of Object.entries(metadata)) {
    if (type === "string" || type === undefined) delete metadata[column];
  }
  return metadata;
}

/**
 * Parse each column of a metadata row, e.g. `type: number`. Language suffixes are removed from
 * column names to match the data rows (see `assignTranslatedFields`)
 */
function metadataFromRow(metadataRow: FlowTypes.Data_listRow): IDataListMetadata {
  const { id, ...columns } = metadataRow;
  const metadata: IDataListMetadata = {};
  for (const [column, value] of Object.entries(columns)) {
    if (!value || typeof value !== "string") continue;
    const field = splitLanguageSuffix(column)?.field ?? column;
    metadata[field] = parseAppDataCollectionString(value) as FlowTypes.Data_listColumnMetadata;
  }
  return metadata;
}

/** Infer the type of each column from the first row with a value for it */
function inferMetadataFromRows(rows: FlowTypes.Data_listRow[]): IDataListMetadata {
  const metadata: IDataListMetadata = {};
  for (const row of rows) {
    const { id, ...values } = row;
    for (const [column, value] of Object.entries(values)) {
      // `_` columns are app metadata (e.g. `_translatedFields`), not data
      if (column.startsWith("_") || metadata[column]?.type) continue;
      const type = inferColumnType(value);
      if (type) metadata[column] = { type };
    }
  }
  return metadata;
}

function inferColumnType(value: any): FlowTypes.Data_listColumnType | undefined {
  if (typeof value === "string") return "string";
  if (typeof value === "number") return "number";
  if (typeof value === "boolean") return "boolean";
  if (isObjectLiteral(value)) return "object";
  return undefined;
}
