import { DB } from "../database/database.service";

const tableName = "session_actions";

function insert(data) {
  return DB.insert(tableName, data);
}

function update(data) {
  // setting id for all actions and filter Null values // to do
  const actions = data.actions
    .map((action, index) => (action && !action.id ? { id: index, ...action } : action))
    .filter((action) => action);
  return DB.update(tableName, { actions }, { id: data.id });
}

function remove(id) {
  return DB.delete(tableName, { id });
}

export default {
  insert,
  update,
  remove,
};
