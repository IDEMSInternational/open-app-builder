import { ApiProperty } from "@nestjs/swagger";
import { DataType } from "sequelize-typescript";
import { AppCommonDto } from "src/endpoints/common";

export class UserDataPostDTO extends AppCommonDto {
  @ApiProperty({ type: DataType.JSONB, description: "Contact Fields from app", default: {} })
  contact_fields: { [fieldname: string]: string };

  @ApiProperty({ type: DataType.JSONB, description: "Device info from app", default: {} })
  device_info: { [fieldname: string]: string };

  @ApiProperty({ type: DataType.JSONB, description: "Dynamic data entries", default: {} })
  dynamic_data: { [flow_type: string]: { [flow_name: string]: any } };
}
