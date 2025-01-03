// TODO - not working in prod - should check if still required
// require("ts-node/register");

import * as path from "path";
import { Client } from "pg";
import { Sequelize } from "sequelize-typescript";
import { environment } from "src/environment";
import { Umzug, SequelizeStorage } from "umzug";
import { ADMIN_CLIENT_CONFIG, USER_DB_CONFIG } from "./config";

const MIGRATIONS_DIR = path.resolve(__dirname, "migrations");
const { APP_DB_USER, APP_DB_PASSWORD } = environment;

export class DBInstance {
  constructor(private dbName = environment.APP_DB_NAME) {}

  /**
   * Bootstrap app database and initial user
   * NOTE - this could all be done outside the app
   */
  public async setup() {
    // create an admin client to create new tables and users as required
    const adminClient = new Client(ADMIN_CLIENT_CONFIG);
    try {
      await adminClient.connect();
      await this.setupTables(adminClient);
      await this.setupUsers(adminClient);
      await adminClient.end();
      // create additional client on target db to perform migrations
      const migrationClient = new Sequelize({
        ...USER_DB_CONFIG,
        database: this.dbName,
        // disable verbose migration logs in test
        logging: process.env.NODE_ENV === "test" ? false : true,
        // Enable ssl mode when running on production
        // https://dev.to/rodjosh/connectionerror-sequelizeconnectionerror-no-pghbaconf-entry-for-host-in-heroku-postgresql-using-sequelize-3icj
        // https://stackoverflow.com/a/61411969
        dialectOptions: environment.production ? {
          ssl:  {
            require: true,
            rejectUnauthorized: false,
          },
        } : {},
      });
      await this.runMigrations(migrationClient);
      await migrationClient.close();
    } catch (error) {
      console.error(error);
      console.error("Could not bootstrap DB");
      process.exit(1);
    }
  }

  /** Create DB (if not exist) */
  private async setupTables(client: Client) {
    const dbNamesQuery = await client.query("SELECT datname FROM pg_database");
    const dbNames = dbNamesQuery.rows.map((r) => r.datname);
    if (!dbNames.includes(this.dbName)) {
      console.log("create app db", this.dbName);
      const createDBQuery = `CREATE DATABASE ${this.dbName};`;
      await client.query(createDBQuery);
    }
  }

  /** Create USER (if not exist)*/
  private async setupUsers(client: Client) {
    const usersQuery = await client.query("SELECT usename FROM pg_catalog.pg_user");
    const userNames = usersQuery.rows.map((r) => r.usename);
    if (!userNames.includes(APP_DB_USER)) {
      const createUserQuery = `CREATE USER ${APP_DB_USER} WITH ENCRYPTED PASSWORD '${APP_DB_PASSWORD}';`;
      await client.query(createUserQuery);
      // Grant priviledges
      console.log("grant priviledges");
      const privilegesQuery = `GRANT ALL PRIVILEGES ON DATABASE ${this.dbName} TO ${APP_DB_USER};`;
      await client.query(privilegesQuery);
    }
  }

  /**
   * Perform all listed database migration functions as found in local migrations folder
   * For more info see: https://github.com/sequelize/umzug
   */
  private async runMigrations(client: Sequelize) {
    console.log("[Migration] start");
    const migrator = new Umzug({
      migrations: {
        // files might be local typescript or the compiled js files
        // in case compiled ignore type definitions
        glob: ["*.{js,ts}", { cwd: MIGRATIONS_DIR, ignore: ["*.d.ts"] }],
      },
      context: client.getQueryInterface(),
      storage: new SequelizeStorage({ sequelize: client }),
      // Limit migrator logs only to error and warn
      logger: { error: console.error, warn: console.warn, info: () => null, debug: () => null },
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
  }

  /**
   * Example to call migrator rollback to specific version
   * Can be called before applying pending or calling up
   * @param migrator
   * @param migrationToRollback applies down methods on ALL migrations from latest to named migration inclusively
   * @example await this.rollbackDB(migrator,"004-create-app_feedback.js")
   */
  private async rollbackDB(migrator: Umzug, migrationToRollback: string) {
    return migrator.down({ to: migrationToRollback });
  }
}
