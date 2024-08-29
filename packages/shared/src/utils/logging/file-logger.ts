import winston from "winston";
import path from "path";
import { truncateSync } from "fs-extra";
import { _wait } from "../async-utils";
import { existsSync } from "fs";
import { SCRIPTS_LOGS_DIR } from "../../paths";
import { getGlobalMemoryLoggerTransport } from "./memory-logger";

const logLevels = ["debug", "info", "warning", "error"] as const;
type ILogLevel = (typeof logLevels)[number];

/** Retrieve all logs from current session for a given variable */
export function getLogs(level: ILogLevel) {
  const logger = getGlobalMemoryLoggerTransport();
  return logger.get(level);
}

export function getLogFiles() {
  const logFiles: { [level in ILogLevel]: string } = {} as any;
  for (const level of logLevels) {
    logFiles[level] = path.resolve(SCRIPTS_LOGS_DIR, `${level}.log`);
  }
  return logFiles;
}

/**
 * Clear existing log data. Clears all in-memory logs and optional persisted file
 * @param includeFiles - clear log files written to disk.
 * Operation will fail if open during parallel operations
 */
export function clearLogs(includeFiles = false, attempt = 0) {
  // Clear in-memory logs
  const memoryLogger = getGlobalMemoryLoggerTransport();
  memoryLogger.clear();
  // Clear file-based logs
  if (includeFiles) {
    try {
      const logFiles = getLogFiles();
      for (const logFile of Object.values(logFiles)) {
        if (existsSync(logFile)) {
          truncateSync(logFile);
        }
      }
    } catch (error) {
      attempt++;
      if (attempt > 5) {
        throw error;
      }
      console.log("could not clear logs, retrying...", attempt);
      return clearLogs(includeFiles, attempt);
    }
  }
}

/**
 * Create loggers that write to file based on level and also save to memory
 * for easy querying
 */
export function getGlobalFileLogger() {
  const g = global as any;
  if (g.logger) {
    return g.logger as winston.Logger;
  }
  // remove any previous log files
  clearLogs(true);

  // create in-memory logger transport
  const memoryLogger = getGlobalMemoryLoggerTransport();

  // create file-write logger transports
  const logFiles = getLogFiles();
  const fileTransports = logLevels.map(
    (level) =>
      new winston.transports.File({
        filename: logFiles[level],
        level,
        format: winston.format.prettyPrint(),
      })
  );

  // create unified logger
  const logger = winston.createLogger({
    level: "info",
    transports: [memoryLogger, ...fileTransports],
  });

  g.logger = logger;
  return logger;
}

/** Create a child instance of the file logger with additional context meta */
export function createChildFileLogger(meta = {}) {
  const logger = getGlobalFileLogger();
  return logger.child(meta);
}
