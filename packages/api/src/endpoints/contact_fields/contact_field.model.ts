import { InferAttributes } from "sequelize";
import { Column, DataType, Model, Table } from "sequelize-typescript";

// NOTE - the table will not be created from this model, but instead via db migration scripts
@Table({ tableName: "contact_fields", timestamps: true })
export class ContactFieldEntry extends Model<InferAttributes<ContactFieldEntry>> {
  @Column({ allowNull: false, unique: true })
  app_user_id: string;

  @Column({ allowNull: false })
  app_deployment_name: string;

  @Column({ type: DataType.JSONB })
  raw: any;
}
