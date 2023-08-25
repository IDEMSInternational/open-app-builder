import winston from "winston";
import path from "path";
import { emptyDirSync, ensureDirSync, truncateSync } from "fs-extra";
import { _wait } from "../cli-utils";
import { Writable } from "stream";
import { existsSync } from "fs";
import { SCRIPTS_LOGS_DIR } from "../../paths";

const logLevels = ["debug", "info", "warning", "error"] as const;
type ILogLevel = (typeof logLevels)[number];
interface ILogEntry {
  level: ILogLevel;
  message?: string;
  details?: any;
  source?: string;
}

// Declare a history variable that can be written to via a stream
let logHistory = "";

/** Retrieve all logs from current session for a given variable */
export function getLogs(level: ILogLevel, message?: string) {
  const logEntries: ILogEntry[] = logHistory
    .split("\n")
    .filter((v) => v)
    .map((v) => JSON.parse(v));
  const logLevelEntries = logEntries.filter((entry) => entry.level === level);
  if (message) {
    return logLevelEntries.filter((entry) => entry.message === message);
  }
  return logLevelEntries;
}
export function getLogFiles() {
  const logFiles: { [level in ILogLevel]: string } = {} as any;
  for (const level of logLevels) {
    logFiles[level] = path.resolve(SCRIPTS_LOGS_DIR, `${level}.log`);
  }
  return logFiles;
}

export function clearLogs(attempt = 0) {
  logHistory = "";
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
    return clearLogs(attempt);
  }
}

/**
 * Create loggers that write to file based on level and also save all logs to a single string
 * for easy querying
 */
function getGlobalFileLogger() {
  const g = global as any;
  if (g.logger) {
    return g.logger as winston.Logger;
  }
  // setup files
  logHistory = "";
  ensureDirSync(SCRIPTS_LOGS_DIR);
  emptyDirSync(SCRIPTS_LOGS_DIR);
  const logFiles = getLogFiles();
  // file transports
  const fileTransports = logLevels.map(
    (level) =>
      new winston.transports.File({
        filename: logFiles[level],
        level,
        format: winston.format.prettyPrint(),
      })
  );
  const logger = winston.createLogger({
    level: "info",
    transports: fileTransports,
  });
  // stream (memory) transport
  const logStream = new Writable();
  logStream._write = (chunk, encoding, next) => {
    logHistory = logHistory += chunk.toString();
    next();
  };
  const streamTransport = new winston.transports.Stream({
    stream: logStream,
    format: winston.format.json(),
  });
  logger.add(streamTransport);
  g.logger = logger;
  return logger;
}

export function createChildFileLogger(meta = {}) {
  const logger = getGlobalFileLogger();
  return logger.child(meta);
}
