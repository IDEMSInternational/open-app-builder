import { DB } from "../database/database.service";

async function getTables() {
  const response = await DB.query(`SELECT table_name
    FROM information_schema.tables
    WHERE table_schema = 'public'
    ORDER BY table_name;`);
  return response.rows;
}

async function doesTableExist(table: string) {
  const response = await DB.query(
    `SELECT table_name
    FROM information_schema.tables
    WHERE table_schema = 'public'
    and table_name=$1
    ORDER BY table_name;`,
    [table]
  );
  return !!response.rows.length;
}

async function getByKey(table: string, key: string) {
  const tableExist = await doesTableExist(table);
  if (tableExist) {
    const response = await DB.select(table, ["*"], { id: key });
    return response.rows[0];
  }
  return;
}

export default {
  getByKey,
  getTables,
  doesTableExist,
};
