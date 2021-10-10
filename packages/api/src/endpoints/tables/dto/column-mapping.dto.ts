import { ApiProperty } from "@nestjs/swagger";
import { ColumnMappingType } from "src/types";

const ColumnMappingExample: ColumnMappingType[] = [
  { field_name: "test_text", field_type: "text" },
  { field_name: "test_integer", field_type: "integer" },
  { field_name: "test_number", field_type: "number" },
  { field_name: "test_date", field_type: "date" },
  { field_name: "test_boolean", field_type: "boolean" },
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
