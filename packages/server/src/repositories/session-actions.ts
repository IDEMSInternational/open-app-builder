const database = require("../database/database.service");

const tableName = "session_actions";

function insert(data) {
  return database.insert(tableName, data);
}

function update(data) {
  // setting id for all actions and filter Null values // to do
  const actions = data.actions
    .map((action, index) => (action && !action.id ? { id: index, ...action } : action))
    .filter((action) => action);
  return database.update(tableName, { actions: actions }, { id: data.id });
}

function remove(id) {
  return database.delete(tableName, { id });
}

module.exports = {
  insert,
  update,
  remove,
};
