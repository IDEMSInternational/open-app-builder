import { DataTypes, QueryInterface } from "sequelize";
import { UmzugOptions } from "umzug";

export const up = async (options: UmzugOptions<QueryInterface>) => {
  const queryInterface = options.context as QueryInterface;
  await queryInterface.createTable("app_feedback", {
    // Default columns populated by sequelize
    id: { type: DataTypes.INTEGER, autoIncrement: true, unique: true, primaryKey: true },
    createdAt: { type: DataTypes.DATE },
    updatedAt: { type: DataTypes.DATE },
    deletedAt: { type: DataTypes.DATE },
    version: { type: DataTypes.INTEGER },
    // Custom columns
    app_user_id: {
      allowNull: false,
      autoIncrement: false,
      type: DataTypes.STRING,
    },
    user_feedback_id: {
      allowNull: false,
      autoIncrement: false,
      type: DataTypes.INTEGER,
    },
    raw: {
      allowNull: false,
      type: DataTypes.JSONB,
    },
  });
};
export const down = async (options: UmzugOptions<QueryInterface>) => {
  const queryInterface = options.context as QueryInterface;
  await queryInterface.dropTable("app_feedback");
};
