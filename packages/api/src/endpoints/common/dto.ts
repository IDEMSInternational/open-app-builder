import { ApiProperty } from "@nestjs/swagger";
import { DataType } from "sequelize-typescript";

/**
 * Data transfer object applied when syncing from local user db into global table
 * @important - Should be kept in sync with `IDBServerUserRecord`
 **/
export class UserLocalRecordDto {
  @ApiProperty({ description: "App user ID" })
  app_user_id: string;

  @ApiProperty({ description: "Local ID for local db record" })
  app_user_record_id: number;

  @ApiProperty({ description: "Local record data", type: DataType.JSONB })
  data: any;
}
