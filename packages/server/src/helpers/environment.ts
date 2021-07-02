import dotenv from "dotenv";
import { logger } from "./logger";

const { error, parsed } = dotenv.config();
if (error) {
  logger.error(error.message);
}
export const environment = parsed;
