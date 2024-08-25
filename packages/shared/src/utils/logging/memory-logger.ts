import Transport from "winston-transport";

const logLevels = ["debug", "info", "warning", "error"] as const;
type ILogLevel = (typeof logLevels)[number];

interface ILogEntry {
  level: ILogLevel;
  message?: string;
  details?: any;
  source?: string;
}

/**
 * In-memory log transport capable of returning all stored logs
 * Should be added as a transport to the default logging instance
 **/
export class MemoryLogger extends Transport {
  private cache: { [level in ILogLevel]: ILogEntry[] };

  constructor() {
    super();
    this.clear();
  }
  public get(level: ILogLevel) {
    return this.cache[level];
  }
  clear() {
    this.cache = {
      debug: [],
      error: [],
      info: [],
      warning: [],
    };
  }
  log(entry: ILogEntry, callback) {
    const { level, details, message, source } = entry;
    this.cache[level].push({ level, details, message, source });
    callback();
  }
}

/** Provide access to a shared global instance of memory logger */
export function getGlobalMemoryLoggerTransport() {
  const g = global as any;
  g["logCache"] ??= new MemoryLogger();
  return g["logCache"] as MemoryLogger;
}
