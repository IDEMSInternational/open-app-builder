import { InferAttributes, InferCreationAttributes } from "sequelize";
import { Column, DataType, Model, Table } from "sequelize-typescript";

// NOTE - the table will not be created from this model, but instead via db migration scripts
// Model defines class properties and type definitions
// https://sequelize.org/docs/v6/other-topics/typescript/
@Table({ tableName: "app_feedback", timestamps: true })
export class AppFeedback extends Model<
  InferAttributes<AppFeedback>,
  InferCreationAttributes<AppFeedback>
> {
  @Column({ allowNull: false })
  app_user_id: string;

  @Column({ allowNull: false })
  app_user_record_id: number;

  @Column({ allowNull: false })
  app_deployment_name: string;

  @Column({ allowNull: false, type: DataType.JSONB })
  data: any;
}
