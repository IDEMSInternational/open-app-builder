import { InferAttributes, InferCreationAttributes } from "sequelize";
import { Column, DataType, Model, Table } from "sequelize-typescript";

// NOTE - the table will not be created from this model, but instead via db migration scripts
@Table({ tableName: "app_users", timestamps: true })
export class AppUser extends Model<InferAttributes<AppUser>, InferCreationAttributes<AppUser>> {
  @Column({ allowNull: false, unique: true })
  app_user_id: string;

  @Column
  app_version: string;

  @Column({ allowNull: false })
  app_deployment_name: string;

  @Column({ type: DataType.JSONB })
  contact_fields: any;

  @Column({ type: DataType.JSONB })
  device_info: any;

  @Column({ type: DataType.JSONB })
  dynamic_data: any;
}
