import { Column, DataType, Model, Table } from "sequelize-typescript";

// NOTE - the table will not be created from this model, but instead via db migration scripts
@Table({ tableName: "app_feedback", timestamps: true })
export class AppFeedback extends Model<AppFeedback> {
  @Column({ allowNull: false })
  app_user_id: string;

  @Column({ allowNull: false })
  app_user_record_id: string;

  @Column({ allowNull: false })
  app_deployment_name: string;

  @Column({ allowNull: false, type: DataType.JSONB })
  data: any;
}
