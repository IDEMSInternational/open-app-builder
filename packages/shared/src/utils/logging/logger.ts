import winston from "winston";
import Transport from "winston-transport";
import path from "path";
import { appendFileSync, existsSync, mkdirSync, truncateSync } from "fs";
import { SCRIPTS_LOGS_DIR } from "../../paths";

const logLevels = ["debug", "info", "warn", "error"] as const;
type ILogLevel = (typeof logLevels)[number];

interface ILogEntry {
  level: ILogLevel;
  message?: string;
  details?: any;
  source?: string;
}

/** In-memory log to be able to programmatically query log history */
class MemoryTransport extends Transport {
  public cache: { [level in ILogLevel]: ILogEntry[] };

  constructor() {
    super();
    this.clear();
  }

  get(level: ILogLevel) {
    return this.cache[level];
  }

  clear() {
    this.cache = { debug: [], error: [], info: [], warn: [] };
  }

  log(info: any, callback: () => void) {
    const levelStr = String(info.level || info[Symbol.for("level")] || "");
    const safeLevel = this.cache[levelStr as ILogLevel] ? (levelStr as ILogLevel) : "error";
    const message = info.message || info[Symbol.for("message")];
    const source = info.source;
    const { level: _, message: __, source: ___, ...rest } = info;
    const details = Object.keys(rest).length > 0 ? rest : undefined;

    this.cache[safeLevel].push({ level: safeLevel, message, details, source });
    callback();
  }
}

/** File-based log to persist to disk. Deferred to avoid blocking in-memory ops */
class DeferredFileTransport extends Transport {
  public readonly filename: string;
  private buffer: string[] = [];

  constructor(opts: Transport.TransportStreamOptions & { filename: string }) {
    super(opts);
    this.filename = opts.filename;
  }

  log(info: any, callback: () => void) {
    const cache = new Set();
    const serialized = JSON.stringify(
      info,
      (key, value) => {
        if (typeof value === "object" && value !== null) {
          if (cache.has(value)) return "[Circular]";
          cache.add(value);
        }
        return value;
      },
      2
    );
    this.buffer.push(serialized + "\n");
    callback();
  }

  flush() {
    if (this.buffer.length === 0) return;
    const dir = path.dirname(this.filename);
    if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
    appendFileSync(this.filename, this.buffer.join(""));
    this.buffer = [];
  }
}

// --------------- Global state ---------------

const g = global as any;

function getMemory(): MemoryTransport {
  if (!g.__logMemory) g.__logMemory = new MemoryTransport();
  return g.__logMemory;
}

function getFileTransports(): DeferredFileTransport[] {
  if (!g.__logFileTransports) {
    g.__logFileTransports = logLevels.map(
      (level) =>
        new DeferredFileTransport({
          level,
          filename: path.resolve(SCRIPTS_LOGS_DIR, `${level}.log`),
        })
    );
  }
  return g.__logFileTransports;
}

// --------------- Public API ---------------

export function getLogFiles() {
  const logFiles: { [level in ILogLevel]: string } = {} as any;
  for (const level of logLevels) {
    logFiles[level] = path.resolve(SCRIPTS_LOGS_DIR, `${level}.log`);
  }
  return logFiles;
}

export function getLogs(level: ILogLevel) {
  return getMemory().get(level);
}

export function flushLogs() {
  for (const t of getFileTransports()) t.flush();
}

export function clearLogs(includeFiles = false, attempt = 0) {
  getMemory().clear();
  if (includeFiles) {
    try {
      for (const logFile of Object.values(getLogFiles())) {
        if (existsSync(logFile)) truncateSync(logFile);
      }
    } catch (error) {
      if (++attempt > 5) throw error;
      console.log("could not clear logs, retrying...", attempt);
      return clearLogs(includeFiles, attempt);
    }
  }
}

export function getLogger(): winston.Logger {
  if (g.__logger) return g.__logger as winston.Logger;

  clearLogs(true);

  const logger = winston.createLogger({
    level: "debug",
    transports: [getMemory(), ...getFileTransports()],
  });

  const shutdown = () => flushLogs();
  process.on("exit", shutdown);
  process.on("SIGTERM", () => {
    shutdown();
    process.exit(0);
  });
  process.on("SIGINT", () => {
    shutdown();
    process.exit(0);
  });
  process.on("uncaughtException", (err) => {
    logger.error("Uncaught exception", {
      error: err.message,
      stack: err.stack,
    });
    shutdown();
    process.exit(1);
  });

  g.__logger = logger;
  return logger;
}

export function createChildLogger(meta = {}) {
  return getLogger().child(meta);
}
