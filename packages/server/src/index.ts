import { logger } from "./helpers/logger";
import { DB } from "./database/database.service";
import { StartSyncServer } from "./sync-server/sync-server.service";
import { runMigrations } from "./migrations_old";
import { environment } from "./helpers/environment";

const webSocketPort = environment.WEBSOCKET_PORT;

try {
  DB.client.connect().then(async () => {
    logger.info(`Connected to database.`);
    logger.info(`Applying Migrations`);
    try {
      await runMigrations(DB.client);
      logger.info("Migration Success");
    } catch (err) {
      logger.error(err.message);
    }

    StartSyncServer(Number(webSocketPort));
    logger.info(`Websocket server started at ${webSocketPort} port.`);
  });
} catch (err) {
  logger.error(err);
}
