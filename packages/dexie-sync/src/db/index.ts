import { Sequelize } from "sequelize";
import { config } from "./config/config";
import { models, IModelType } from "./models";

const sequelize = new Sequelize(config);

const db: {
  client: Sequelize;
  table: IModelType;
} = { client: sequelize, table: {} as any };

Object.values(models).forEach((model) => {
  db.table[model.name] = model.init(model.model_attributes, { sequelize, tableName: model.name });
});

db.client = sequelize;

export { db };
