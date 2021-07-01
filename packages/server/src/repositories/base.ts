const database = require("../database/database.service");

async function getTables() {
  const response = await database.query(`SELECT table_name
    FROM information_schema.tables
    WHERE table_schema = 'public'
    ORDER BY table_name;`);
  return response.rows;
}

async function doesTableExist(table) {
  const response = await database.query(
    `SELECT table_name
    FROM information_schema.tables
    WHERE table_schema = 'public'
    and table_name=$1
    ORDER BY table_name;`,
    [table]
  );
  return !!response.rows.length;
}

async function getByKey(table, key) {
  const tableExist = await doesTableExist(table);
  if (tableExist) {
    const response = await database.select(table, ["*"], { id: key });
    return response.rows[0];
  }
  return;
}

module.exports = {
  getByKey,
  getTables,
  doesTableExist,
};
