import { environment } from "../../environment";
import { StartSyncServer } from "./sync-server.service";
import { logger } from "../../helpers/logger";

const webSocketPort = environment.WEBSOCKET_PORT;
StartSyncServer(Number(webSocketPort));
logger.info(`Websocket server started at ${webSocketPort} port.`);
