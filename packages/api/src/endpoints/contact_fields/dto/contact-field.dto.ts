import { ApiProperty } from "@nestjs/swagger";
import { DataType } from "sequelize-typescript";

export class ContactFieldDto {
  @ApiProperty({ type: DataType.JSONB, description: "Contact Fields from app", default: {} })
  contact_fields: { [fieldname: string]: string };
}
