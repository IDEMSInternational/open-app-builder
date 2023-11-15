import { ApiProperty } from "@nestjs/swagger";

/**
 * Common app DTO - fields below should be automatically populated by app
 * when calling api
 **/
export class AppCommonDto {
  @ApiProperty({ description: "App user ID" })
  app_user_id: string;

  @ApiProperty({ description: "Name of app deployment", default: "" })
  app_deployment_name: string;

  @ApiProperty({ description: "Current app version", default: "0.0.0" })
  app_version: string;
}

import { Column, Model } from "sequelize-typescript";

/**
 * Common model providing metadata fields such as `app_user_id`
 * and `app_user_record_id`
 *
 * Can be used to infer attributes in same way as sequelize model i.e.
 * ```ts
 * class myModel extends AppCommonModel<
 *  InferAttributes<myModel>,
 *  InferCreationAttributes<myModel>
 * >
 * ```
 */
export class AppCommonModel<
  TModelAttributes extends {} = any,
  TCreationAttributes extends {} = TModelAttributes
> extends Model<TModelAttributes, TCreationAttributes> {
  @Column({ allowNull: false })
  app_user_id: string;

  @Column({ allowNull: false })
  app_deployment_name: string;

  @Column({ allowNull: false })
  app_user_record_id: string;
}
