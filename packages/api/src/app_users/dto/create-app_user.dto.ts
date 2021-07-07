import { ApiProperty } from "@nestjs/swagger";
import { DataType } from "sequelize-typescript";

export class AppUserDto {
  @ApiProperty({ uniqueItems: true, required: true })
  app_user_id: string;

  @ApiProperty({ type: DataType.JSONB, default: {} })
  contact_fields?: { [fieldname: string]: string };
}
