const { Client } = require("pg");

const { where, updates } = require("./database.utils");

require("dotenv").config();

class PostgresDB {
  client;

  constructor() {
    this.client = new Client({
      host: process.env.HOST,
      port: process.env.PORT,
      database: process.env.DATABASE,
      user: process.env.USER,
      password: process.env.PASSWORD,
    });
  }

  connect() {
    this.client.connent();
  }

  async query(sql, values) {
    const result = await this.client.query(sql, values);
    if (result.rows) {
      result.rows = result.rows;
    }

    return result;
  }

  insert(table, record) {
    const keys = Object.keys(record);
    const nums = new Array(keys.length);
    const data = new Array(keys.length);
    let i = 0;
    for (const key of keys) {
      data[i] = record[key];
      nums[i] = `$${++i}`;
    }
    const fields = keys.join(", ");
    const params = nums.join(", ");
    const sql = `INSERT INTO ${table} (${fields}) VALUES (${params})`;
    return this.query(sql, data);
  }

  select(table, fields = ["*"], conditions = null) {
    const keys = fields.join(", ");
    const sql = `SELECT ${keys} FROM ${table}`;
    let whereClause = "";
    let args = [];
    if (conditions) {
      const whereData = where(conditions);
      whereClause = " WHERE " + whereData.clause;
      args = whereData.args;
    }

    return this.query(sql + whereClause, args);
  }

  delete(table, conditions = null) {
    const { clause, args } = where(conditions);
    const sql = `DELETE FROM ${table} WHERE ${clause}`;
    return this.query(sql, args);
  }

  update(table, delta = null, conditions = null) {
    const upd = updates(delta);
    const cond = where(conditions, upd.args.length + 1);
    const sql = `UPDATE ${table} SET ${upd.clause} WHERE ${cond.clause}`;
    const args = [...upd.args, ...cond.args];
    return this.query(sql, args);
  }

  close() {
    this.client.end();
  }
}

module.exports = new PostgresDB();
