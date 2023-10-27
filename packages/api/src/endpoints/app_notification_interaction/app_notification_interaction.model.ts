import { InferAttributes, InferCreationAttributes } from "sequelize";
import { Column, DataType, Table } from "sequelize-typescript";
import { AppCommonModel } from "../common";

// NOTE - the table will not be created from this model, but instead via db migration scripts
@Table({ tableName: "app_notification_interaction", timestamps: true })
export class AppNotificationInteraction extends AppCommonModel<
  InferAttributes<AppNotificationInteraction>,
  InferCreationAttributes<AppNotificationInteraction>
> {
  @Column({})
  sent_recorded_timestamp: string;

  @Column({})
  schedule_timestamp: string;

  @Column({ type: DataType.JSONB })
  notification_meta: any;

  @Column({})
  action_recorded_timestamp: string;

  @Column({})
  action_id: string;

  @Column({ type: DataType.JSONB })
  action_meta: any;
}
