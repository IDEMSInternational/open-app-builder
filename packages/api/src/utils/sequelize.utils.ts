import { Sequelize } from "sequelize";
import SequelizeDefault from "sequelize";
import { arrayToHashmap } from "./data.utils";
import { listTableColumns } from "./sql.utils";
import { DeploymentService } from "src/modules/deployment.service";
import { USER_DB_CONFIG } from "src/db/config";

/**
 * Get the active client of the injected deployment service outside of provider environment
 */
export function getActiveClient() {
  return DeploymentService.getService().client;
}

/**
 * DEPRECATED CC 2023-04-29
 * Create a new client to interact with DB using default credentials
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function createClient() {
  return new Sequelize(USER_DB_CONFIG);
}

export function getQueryInterface() {
  const client = getActiveClient();
  return client.getQueryInterface();
}

export function getSequelize() {
  const client = getActiveClient();
  return client;
}

export function getTableNames() {
  const client = getActiveClient();
  return client.getQueryInterface().showAllTables();
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
  const client = getActiveClient();
  const queryInterface = client.getQueryInterface();
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
