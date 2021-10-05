import { ApiProperty } from "@nestjs/swagger";
import { ColumnMappingType, FieldDataType } from "src/types";

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
