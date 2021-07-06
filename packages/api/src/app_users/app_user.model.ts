import { Column, Model, Table } from "sequelize-typescript";

@Table
export class AppUser extends Model {
  @Column
  firstName: string;

  @Column
  lastName: string;

  @Column({ defaultValue: true })
  isActive: boolean;
}
