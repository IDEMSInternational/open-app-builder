import { ApiProperty } from "@nestjs/swagger";
import { DataType } from "sequelize-typescript";
import { AppCommonDto } from "./app.dto";

/**
 * Data transfer object applied when syncing from local user db into global table
 * @important - Should be kept in sync with `IDBServerUserRecord`
 **/
export class UserCommonDto extends AppCommonDto {
  @ApiProperty({ description: "Local ID for local db record" })
  app_user_record_id: number;

  @ApiProperty({ description: "Local record data", type: DataType.JSONB })
  data: any;
}
