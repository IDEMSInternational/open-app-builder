require("ts-node/register");

import * as path from "path";
import { Client } from "pg";
import { Sequelize } from "sequelize-typescript";
import { environment } from "src/environment";
import { Umzug, SequelizeStorage } from "umzug";
import { ADMIN_CLIENT_CONFIG, USER_DB_CONFIG } from "./config";

const MIGRATIONS_DIR = path.resolve(__dirname, "migrations");
const APP_DB_NAME = environment.APP_DB_NAME;
const APP_DB_PASSWORD = environment.APP_DB_PASSWORD;
const APP_DB_USER = environment.APP_DB_USER;

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
    console.error("Could not bootstrap DB");
    process.exit(1);
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
  console.log("[Migration] start");
  const sequelize = new Sequelize(USER_DB_CONFIG);
  const migrator = new Umzug({
    migrations: {
      // files might be local typescript or the compiled js files
      // in case compiled ignore type definitions
      glob: ["*.{js,ts}", { cwd: MIGRATIONS_DIR, ignore: ["*.d.ts"] }],
    },
    context: sequelize.getQueryInterface(),
    storage: new SequelizeStorage({ sequelize }),
    logger: console,
  });
  const pending = await migrator.pending();
  console.log("[Migrations] pending", pending);
  try {
    await migrator.up();
    // await migrator.down({ to: "005-add-app_deployment-columns.js" });
    const executed = await migrator.executed();
    console.log("[Migrations] executed", executed);
    console.log("[Migration] complete");
  } catch (error) {
    console.error("[Migration] error", error);
  }

  await sequelize.close();
}

/**
 * Example to call migrator rollback to specific version
 * Can be called before applying pending or calling up
 * @param migrator
 * @param migrationToRollback applies down methods on ALL migrations from latest to named migration inclusively
 * @example await this.rollbackDB(migrator,"004-create-app_feedback.js")
 */
async function rollbackDB(migrator: Umzug, migrationToRollback: string) {
  return migrator.down({ to: migrationToRollback });
}
