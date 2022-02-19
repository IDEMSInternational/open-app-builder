import { DataTypes, QueryInterface } from "sequelize";
import { UmzugOptions } from "umzug";

export const up = async (options: UmzugOptions<QueryInterface>) => {
  const queryInterface = options.context as QueryInterface;
  await queryInterface.addColumn("app_users", "app_deployment_name", { type: DataTypes.STRING });
  await queryInterface.addColumn("app_feedback", "app_deployment_name", { type: DataTypes.STRING });
  await queryInterface.addColumn("contact_fields", "app_deployment_name", {
    type: DataTypes.STRING,
  });
};
export const down = async (options: UmzugOptions<QueryInterface>) => {
  const queryInterface = options.context as QueryInterface;
  await queryInterface.removeColumn("app_users", "app_deployment_name");
  await queryInterface.removeColumn("app_feedback", "app_deployment_name");
  await queryInterface.removeColumn("contact_fields", "app_deployment_name");
};
