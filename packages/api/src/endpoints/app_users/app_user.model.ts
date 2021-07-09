import { Column, DataType, Model, Table } from "sequelize-typescript";

// NOTE - the table will not be created from this model, but instead via db migration scripts
@Table({ tableName: "app_users", timestamps: true })
export class AppUser extends Model<AppUser> {
  @Column({ allowNull: false, unique: true })
  app_user_id: string;

  @Column
  app_version: string;

  @Column({ type: DataType.JSONB })
  contact_fields: any;
}
