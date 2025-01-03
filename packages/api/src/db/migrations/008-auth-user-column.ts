import { DataTypes, QueryInterface } from "sequelize";
import { UmzugOptions } from "umzug";

export const up = async (options: UmzugOptions<QueryInterface>) => {
  const queryInterface = options.context as QueryInterface;
  await queryInterface.addColumn("app_users", "auth_user_id", {
    type: DataTypes.STRING,
  });
};
export const down = async (options: UmzugOptions<QueryInterface>) => {
  const queryInterface = options.context as QueryInterface;
  await queryInterface.removeColumn("app_users", "auth_user_id");
};
