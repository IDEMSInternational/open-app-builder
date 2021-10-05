// TODO - could be optimised for more specific types
export enum FieldDataType {
  text = "text",
  integer = "integer",
  number = "numeric",
}
export type ColumnMappingType = { field_name: string; field_type?: FieldDataType };

export type ITableColumn = { column_name: string; data_type: string };
