import { logger } from "./helpers/logger";
import { StartSyncServer } from "./integrations/dexie/sync-server.service";
import { environment } from "./environment";

import { db } from "./db";
console.log("init");
try {
  db.client.sync({ logging: environment.production }).then((v) => {
    logger.info("tables synced");
  });
} catch (error) {
  logger.error(error.message);
}

// try {
//   DB.client.connect().then(async () => {
//     logger.info(`Connected to database.`);
//     logger.info(`Applying Migrations`);
//     try {
//       await runMigrations(DB.client);
//       logger.info("Migration Success");
//     } catch (err) {
//       logger.error(err.message);
//     }
//   });
// } catch (err) {
//   logger.error(err);
// }
