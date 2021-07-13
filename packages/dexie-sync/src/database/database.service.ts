import { Client, ClientConfig } from "pg";
import { where, updates } from "./database.utils";
import { environment } from "../environment";

const CLIENT_CONFIG: ClientConfig = {
  host: environment.DB_HOST,
  port: Number(environment.DB_PORT),
  database: environment.DB_NAME,
  user: environment.DB_USER,
  password: environment.DB_PASSWORD,
};

class PostgresDB {
  client: Client;

  constructor() {
    console.log("creating client", CLIENT_CONFIG);
    this.client = new Client(CLIENT_CONFIG);
  }

  async connect() {
    console.log("connecting", this.client);
    return this.client.connect();
  }

  async query(sql: string, values?: string[]) {
    const result = await this.client.query(sql, values);
    if (result.rows) {
      result.rows = result.rows;
    }

    return result;
  }

  insert(table: string, record: any) {
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
    return this.client.end();
  }
}

export const DB = new PostgresDB();
