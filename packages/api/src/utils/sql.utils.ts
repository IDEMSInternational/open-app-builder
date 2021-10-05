import { Sequelize } from "sequelize";
import { any } from "sequelize/types/lib/operators";
import { USER_DB_CONFIG } from "src/db/config";
import { FieldDataType, ITableColumn } from "../types";

export async function listTableNames() {
  const query = `
  SELECT table_name 
  FROM information_schema.tables
  WHERE table_schema = 'public'
  `;
  const res = await executeSQL(query, []);
  // TODO improve type coersion
  return res[0].map((r) => (r as any).table_name);
}

/**
 *
 */
export async function listTableColumns(table_name: string) {
  // https://sequelize.org/master/manual/raw-queries.html
  const query =
    "SELECT column_name, data_type FROM information_schema.columns WHERE table_name = ?";
  const result = await executeSQL(query, [table_name]);
  const columns = result[0] as ITableColumn[];
  return columns;
}

/**
 *
 */
export function addTableColumn(table_name: string, column_name: string, datatype: FieldDataType) {
  const query = `ALTER TABLE ${table_name} ADD ${column_name} ${datatype}`;
  return this.executeSQL(query);
}

/**
 *
 */
export function dropTableColumn(table_name: string, column_name: string) {
  const query = `ALTER TABLE ${table_name} DROP ${column_name}`;
  return this.executeSQL(query);
}

/**
 *
 */
export async function executeSQL(query: string, values: string[] = []) {
  // TODO - might be way to pass existing connection
  const sequelize = new Sequelize(USER_DB_CONFIG);
  const res = await sequelize.query({ query, values });
  await sequelize.close();
  return res;
}
