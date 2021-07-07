import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table
export class AppUser extends Model<AppUser> {
  @Column({ allowNull: false, unique: true })
  app_user_id: string;

  @Column
  firstName: string;

  @Column
  lastName: string;

  @Column({ type: DataType.JSONB })
  contact_fields: any;
}
