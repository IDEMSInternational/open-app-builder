import { createChildFileLogger } from "shared/src/utils/logging/file-logger";

export default () => {
  // Create a logger instance so that parallel test calls don't try to create/empty
  // directory when initiating for first time
  createChildFileLogger();
};
