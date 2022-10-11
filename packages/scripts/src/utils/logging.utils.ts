import boxen from "boxen";
import chalk from "chalk";
import { Command } from "commander";

import { SCRIPTS_LOGS_DIR } from "../paths";

import winston from "winston";
import path from "path";
import { emptyDirSync, ensureDirSync, truncateSync } from "fs-extra";
import { _wait } from "./cli-utils";
import { Writable } from "stream";
import { existsSync } from "fs";

const logLevels = ["debug", "info", "warning", "error"] as const;
type ILogLevel = typeof logLevels[number];
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
function getLogger() {
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

export function createChildLogger(meta = {}) {
  const logger = getLogger();
  return logger.child(meta);
}

/** Record a 2-line error message in a box with additional optional logging and exit */
export function logError(opts: Partial<ILogOptions> = {}) {
  const { msg1, msg2, error, logOnly } = { ...defaultLog, ...opts };
  console.log(
    boxen(
      `
    ${chalk.red(msg1)}
          
    ${chalk.yellow(msg2)}
          
          `,
      { padding: 1, borderColor: "red" }
    )
  );
  if (error) {
    console.error(error);
  }
  if (!logOnly) {
    process.exit(1);
  }
}

/** Display an output message in a blue box with 2 lines of text */
export function logOutput(opts: Partial<ILogOptions> = {}) {
  const { msg1, msg2 } = { ...defaultLog, ...opts };
  console.log(
    boxen(
      `
${chalk.blueBright(msg1)}
            
${chalk.cyanBright(msg2)}
            `,
      { padding: 1, borderColor: "blueBright" }
    )
  );
}

/** Display an output message in a blue box with 2 lines of text */
export function logWarning(opts: Partial<ILogOptions> = {}) {
  const { msg1, msg2 } = { ...defaultLog, ...opts };
  console.log(
    boxen(
      `
      ${chalk.yellowBright(msg1)}
              
      ${chalk.yellow(msg2)}
              `,
      { padding: 1, borderColor: "yellowBright" }
    )
  );
}

export function logProgramHelp(program: Command) {
  console.log(chalk.yellow("No command specified. See help below:\n"));
  program.outputHelp();
  console.log("\n");
  process.exit(0);
}

interface ILogOptions {
  msg1: string;
  msg2: string;
  error?: Error; // Optional error object to log
  logOnly?: boolean; // specify to log and continue processing instead of exiting
}
const defaultLog: ILogOptions = { msg1: "", msg2: "", logOnly: false };
