import { Client } from "pg";
import { DBInstance } from "src/db";
import { ADMIN_CLIENT_CONFIG } from "src/db/config";

// Ensure test admin client can connect and delete legacy db
(async function () {
  try {
    const adminClient = new Client(ADMIN_CLIENT_CONFIG);
    await adminClient.connect();
    // Delete test DB if exists
    const testDBName = `test_e2e`;
    await adminClient.query(`DROP DATABASE IF EXISTS ${testDBName};`);
    await adminClient.end();
    // Run full setup with db migrations
    await new DBInstance().setup();
  } catch (error) {
    console.error(error);
    console.error("Could not bootstrap DB");
    process.exit(1);
  }
})();
