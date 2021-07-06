import winston from "winston";

const { format, transports, createLogger } = winston;
const { combine, printf } = format;

const LoggerLevel = {
  error: "error",
  warn: "warn",
  info: "info",
  verbose: "verbose",
  debug: "debug",
};

const defaultLevel = LoggerLevel.info;

const myFormat = printf(({ level, message }) => {
  return `[${level}]: ${message}`;
});

export const logger = createLogger({
  level: defaultLevel,
  transports: [
    new transports.Console({
      format: combine(myFormat),
    }),
    new winston.transports.File({ filename: "error.log", level: "error" }),
    new winston.transports.File({ filename: "combined.log" }),
  ],
  format: format.combine(format.colorize(), format.timestamp(), format.json()),
});

// Catch any unhandled rejections
process.on("unhandledRejection", (error: Error) => {
  logger.error(error.message);
});
process.on("uncaughtException", (error: Error) => {
  logger.error(error.message);
});
