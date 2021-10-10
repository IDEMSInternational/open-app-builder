import { Column, Model, Table } from "sequelize-typescript";

// NOTE - the table will not be created from this model, but instead via db migration scripts
@Table({ tableName: "tables", timestamps: false })
export class TablesModel extends Model<any> {
  @Column({ allowNull: false, unique: true })
  table_name: string;
}
