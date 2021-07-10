import { ApiProperty } from "@nestjs/swagger";
import { DataType } from "sequelize-typescript";

export class SetUserDataDto {
  @ApiProperty({ type: DataType.JSONB, description: "Contact Fields from app", default: {} })
  contact_fields: { [fieldname: string]: string };

  @ApiProperty({ description: "Current app version", default: "0.0.0" })
  app_version: string;

  @ApiProperty({ type: DataType.JSONB, description: "Device info from app", default: {} })
  device_info: { [fieldname: string]: string };
}
