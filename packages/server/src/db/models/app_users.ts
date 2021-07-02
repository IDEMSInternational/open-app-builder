import { DataTypes, Model, Sequelize } from "sequelize";

export default (sequelize: Sequelize) => {
  class app_users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  app_users.init(
    {
      uuid: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "app_users",
    }
  );
  return app_users;
};
