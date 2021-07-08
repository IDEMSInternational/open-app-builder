require("ts-node/register");

import * as path from "path";
import { Client } from "pg";
import { Sequelize } from "sequelize-typescript";
import { environment } from "src/environment";
import { Umzug, SequelizeStorage } from "umzug";
import { ADMIN_CLIENT_CONFIG, USER_DB_CONFIG } from "./config";

const DB_DIR = path.resolve(process.cwd(), "src", "db");
const APP_DB_NAME = environment.DB_NAME || "app";
const APP_DB_PASSWORD = environment.DB_PASSWORD || "app";
const APP_DB_USER = environment.DB_USER || "app";

/**
 * Bootstrap app database and initial user
 * NOTE - this could all be done outside the app
 */
export async function setupDB() {
  const adminClient = new Client(ADMIN_CLIENT_CONFIG);
  try {
    await adminClient.connect();
    await setupTables(adminClient);
    await setupUsers(adminClient);
    await adminClient.end();
    await runMigrations();
  } catch (error) {
    console.error(error);
    throw new Error("Could not bootstrap DB");
  }
}

/** Create DB (if not exist) */
async function setupTables(client: Client) {
  const dbNamesQuery = await client.query("SELECT datname FROM pg_database");
  const dbNames = dbNamesQuery.rows.map((r) => r.datname);
  if (!dbNames.includes(APP_DB_NAME)) {
    console.log("create app db", APP_DB_NAME);
    const createDBQuery = `CREATE DATABASE ${APP_DB_NAME};`;
    await client.query(createDBQuery);
  }
}

/** Create USER (if not exist)*/
async function setupUsers(client: Client) {
  const usersQuery = await client.query("SELECT usename FROM pg_catalog.pg_user");
  const userNames = usersQuery.rows.map((r) => r.usename);
  if (!userNames.includes(APP_DB_USER)) {
    const createUserQuery = `CREATE USER ${APP_DB_USER} WITH ENCRYPTED PASSWORD '${APP_DB_PASSWORD}';`;
    await client.query(createUserQuery);
    // Grant priviledges
    console.log("grant priviledges");
    const privilegesQuery = `GRANT ALL PRIVILEGES ON DATABASE ${APP_DB_NAME} TO ${APP_DB_USER};`;
    await client.query(privilegesQuery);
  }
}

/**
 * Perform all listed database migration functions as found in local migrations folder
 * For more info see: https://github.com/sequelize/umzug
 */
async function runMigrations() {
  const sequelize = new Sequelize(USER_DB_CONFIG);
  const migrator = new Umzug({
    migrations: {
      glob: ["migrations/*.ts", { cwd: DB_DIR }],
    },
    context: sequelize.getQueryInterface(),
    storage: new SequelizeStorage({ sequelize }),
    logger: console,
  });
  await migrator.up();
  await sequelize.close();
}
