import { ApiProperty } from "@nestjs/swagger";

// TODO - could be optimised for more specific types
export enum FieldDataType {
  text = "text",
  integer = "integer",
  number = "numeric",
}
export type ColumnMappingType = { field_name: string; field_type?: FieldDataType };

const ColumnMappingExample: ColumnMappingType[] = [
  { field_name: "example_text", field_type: FieldDataType.text },
];

export class TableColumnMappingDto {
  @ApiProperty({
    description: "Column Field Mapping",
    required: true,
    // isArray: true,
    default: ColumnMappingExample,
  })
  columns: ColumnMappingType[];
}
