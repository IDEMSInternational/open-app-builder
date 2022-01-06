import { Sequelize } from "sequelize";
import SequelizeDefault from "sequelize";
import { USER_DB_CONFIG } from "src/db/config";
import { arrayToHashmap } from "./data.utils";
import { listTableColumns } from "./sql.utils";

/**
 * Wrapper methods provide access to a sequelize instance outside
 * of regular providers
 */
const sequelize = new Sequelize(USER_DB_CONFIG);

export function getQueryInterface() {
  return sequelize.getQueryInterface();
}

export function getSequelize() {
  return sequelize;
}

export function getTableNames() {
  return sequelize.getQueryInterface().showAllTables();
}

/**
 * Takes a sequelize model instance and flattens named json field against possible columns
 * retrieved from database definition. This is used in cases where custom columns have been dynamically added
 * and aren't recognised within the instance model
 */
export async function flattenJson(options: {
  tableName: string;
  instance: SequelizeDefault.Model;
  jsonColumnName?: string;
  idColumnName?: string;
}) {
  options.jsonColumnName = options.jsonColumnName || "raw";
  options.idColumnName = options.idColumnName || "id";

  const { idColumnName, instance, tableName, jsonColumnName } = options;
  const jsonData: any = instance.toJSON();
  const updateFields = await getMappedFieldsFromData(tableName, jsonData[jsonColumnName]);
  const queryInterface = sequelize.getQueryInterface();
  return queryInterface.update(instance, tableName, updateFields, {
    [idColumnName]: jsonData[idColumnName],
  });
}

export async function getMappedFieldsFromData(tableName: string, data: any) {
  const tableColumns = await listTableColumns(tableName);
  const tableColumnsHashmap = arrayToHashmap(tableColumns, "column_name");
  const mappedData = {};
  Object.entries(data).forEach(([key, value]) => {
    if (tableColumnsHashmap.hasOwnProperty(key)) {
      // TODO - handle data conversion
      mappedData[key] = value;
    }
  });
  return mappedData;
}
