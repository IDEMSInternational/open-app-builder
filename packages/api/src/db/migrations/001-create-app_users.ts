import { DataTypes, QueryInterface } from "sequelize";
import { UmzugOptions } from "umzug";

export const up = async (options: UmzugOptions<QueryInterface>) => {
  const queryInterface = options.context as QueryInterface;
  await queryInterface.createTable("app_users", {
    // Default columns populated by sequelize
    id: { type: DataTypes.STRING },
    createdAt: { type: DataTypes.DATE },
    updatedAt: { type: DataTypes.DATE },
    deletedAt: { type: DataTypes.DATE },
    version: { type: DataTypes.INTEGER },
    // Custom columns
    app_user_id: {
      allowNull: false,
      autoIncrement: false,
      primaryKey: true,
      type: DataTypes.STRING,
    },
    contact_fields: {
      allowNull: false,
      type: DataTypes.JSONB,
    },
    app_version: {
      allowNull: false,
      type: DataTypes.STRING,
    },
  });
};
export const down = async (options: UmzugOptions<QueryInterface>) => {
  const queryInterface = options.context as QueryInterface;
  await queryInterface.dropTable("app_users");
};
