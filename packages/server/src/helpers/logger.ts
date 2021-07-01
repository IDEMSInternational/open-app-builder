import winston from "winston";

const { format, transports, createLogger } = winston;

const LoggerLevel = {
  error: "error",
  warn: "warn",
  info: "info",
  verbose: "verbose",
  debug: "debug",
  silly: "silly",
};

const defaultLevel = LoggerLevel.info;

export default createLogger({
  level: defaultLevel,
  transports: [new transports.Console()],
  format: format.combine(format.timestamp(), format.json()),
});
