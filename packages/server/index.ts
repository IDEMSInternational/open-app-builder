const logger = require("./src/helpers/logger");
const db = require("./src/database/database.service");
const SyncServer = require("./src/sync-server/sync-server.service");

require("dotenv").config();

const webSocketPort = process.env.WEBSOCKET_PORT;

try {
  db.client.connect().then(() => {
    logger.info(`Connected to database.`);

    SyncServer(webSocketPort);
    logger.info(`Websocket server started at ${webSocketPort} port.`);
  });
} catch (err) {
  logger.error(err);
}
