import { DB } from "../database/database.service";

const tableName = "changes";

function insert(data) {
  return DB.insert(tableName, data);
}

async function getLastRevision(clientIdentity) {
  let response = await DB.query("select MAX(rev) from changes where source = $1", [clientIdentity]);
  return response.rows[0];
}

async function getChanges(revision, clientIdentity) {
  let reponse = await DB.query("select * from changes where rev > $1 and source = $2", [
    revision,
    clientIdentity,
  ]);
  return reponse.rows
    ? reponse.rows.map((item) => {
        return { ...item, table: item.table_name };
      })
    : [];
}

async function getServerChanges(revision) {
  let reponse = await DB.query("select * from changes where rev > $1", [revision]);
  return reponse.rows
    ? reponse.rows.map((item) => {
        return { ...item, table: item.table_name };
      })
    : [];
}

export default {
  insert,
  getChanges,
  getServerChanges,
};
