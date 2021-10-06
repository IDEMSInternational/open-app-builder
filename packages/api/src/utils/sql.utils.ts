import { ITableColumn } from "../types";
import { getSequelize } from "./sequelize.utils";

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
export function addTableColumn(table_name: string, column_name: string, datatype: string) {
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
  const sequelize = getSequelize();
  const res = await sequelize.query({ query, values });
  return res;
}
