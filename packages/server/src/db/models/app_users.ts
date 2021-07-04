import { DataTypes, Model, ModelAttributes } from "sequelize";

const attributes: ModelAttributes = {
  uuid: DataTypes.STRING,
};

class ModelWithAttributes extends Model {
  static model_attributes: ModelAttributes;
}

export class app_users extends ModelWithAttributes {
  model_attributes = attributes;
}
