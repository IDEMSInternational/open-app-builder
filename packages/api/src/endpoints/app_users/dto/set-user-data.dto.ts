import { ApiProperty } from "@nestjs/swagger";
import { DataType } from "sequelize-typescript";

export class SetUserDataDto {
  @ApiProperty({ type: DataType.JSONB, default: {} })
  contact_fields?: { [fieldname: string]: string };
}
