import logger from "./src/helpers/logger";
import db from "./src/database/database.service";
import SyncServer from "./src/sync-server/sync-server.service";
import dotenv from "dotenv";

console.log("starting server");
const { parsed, error } = dotenv.config();
if (error) {
  throw new Error(error.message);
}

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
