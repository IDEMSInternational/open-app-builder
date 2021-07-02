import { Client } from "pg";
import { migrate } from "postgres-migrations";

export async function runMigrations(client: Client) {
  try {
    const res = await migrate({ client }, __dirname, { logger: console.log });
    console.log(res);
  } catch (err) {
    console.log("Migration failed:", err);
  } finally {
    await client.end();
  }
}
