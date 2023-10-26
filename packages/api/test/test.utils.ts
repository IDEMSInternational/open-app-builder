import { randomUUID } from "crypto";
import { Client } from "pg";
import { DBInstance } from "src/db";
import { ADMIN_CLIENT_CONFIG } from "src/db/config";

export async function testDBQuery(sql: string, database?: string) {
  const config = { ...ADMIN_CLIENT_CONFIG };
  if (database) {
    config.database = database;
  }
  const client = new Client(config);
  await client.connect();
  const res = await client.query(sql);
  await client.end();
  return res;
}

/** Create database and users for a `test_e2e` database */
export async function testDBBootstrap() {
  // Set a longer timeout for setup (default 5s)
  jest.setTimeout(30000);
  jest.useFakeTimers();
  // Ensure any previous data wiped
  await testDBTeardown();
  // Run full setup with db migrations
  await new DBInstance().setup();
  jest.setTimeout(5000);
  jest.useRealTimers();
}

/** Drop all database tables prefixed with `test_e2e` */
export async function testDBTeardown() {
  const adminClient = new Client(ADMIN_CLIENT_CONFIG);
  await adminClient.connect();

  const dbNamesQuery = await adminClient.query("SELECT datname FROM pg_database");
  const dbNames: string[] = dbNamesQuery.rows.map((r) => r.datname);

  for (const dbName of dbNames) {
    if (dbName.startsWith("test_e2e")) {
      console.log("deleting", dbName);
      await adminClient.query(`DROP DATABASE IF EXISTS ${dbName} WITH (force);`);
    }
  }
  await adminClient.end();
}

/** Generate a random 6-character id for testing */
export function generateTestID() {
  return randomUUID().substring(0, 6);
}
