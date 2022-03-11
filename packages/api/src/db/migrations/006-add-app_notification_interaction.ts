import { DataTypes, QueryInterface } from "sequelize";
import { UmzugOptions } from "umzug";

export const up = async (options: UmzugOptions<QueryInterface>) => {
  const queryInterface = options.context as QueryInterface;
  await queryInterface.createTable("app_notification_interaction", {
    // Default columns populated by sequelize
    id: { type: DataTypes.INTEGER, autoIncrement: true, unique: true, primaryKey: true },
    createdAt: { type: DataTypes.DATE },
    updatedAt: { type: DataTypes.DATE },
    deletedAt: { type: DataTypes.DATE },
    version: { type: DataTypes.INTEGER },
    // App User Record - common columns
    app_user_id: {
      allowNull: false,
      autoIncrement: false,
      type: DataTypes.STRING,
    },
    app_user_record_id: {
      allowNull: false,
      autoIncrement: false,
      type: DataTypes.INTEGER,
    },
    app_deployment_name: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    // Notification Columns

    action_recorded_timestamp: { type: DataTypes.STRING },

    action_id: { type: DataTypes.STRING },

    action_meta: { type: DataTypes.JSONB },

    sent_recorded_timestamp: {
      type: DataTypes.STRING,
    },
    schedule_timestamp: {
      type: DataTypes.STRING,
    },

    notification_meta: {
      type: DataTypes.JSONB,
    },
  });
};
export const down = async (options: UmzugOptions<QueryInterface>) => {
  const queryInterface = options.context as QueryInterface;
  await queryInterface.dropTable("app_notification_interaction");
};
