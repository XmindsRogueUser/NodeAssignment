const winston = require("winston");

const simpleFormat = winston.format.simple();
const jsonFormatWithTimestamp = winston.format.combine(
  winston.format.timestamp({
    format: "YYYY-MM-DD HH:mm:ss",
  }),
  winston.format.printf(
    (info) =>
      `${info.timestamp} ${info.level}: ${info.message}` +
      (info.splat !== undefined ? `${info.splat}` : " ")
  ),
  winston.format.json()
);
const formatWithTimestamp = winston.format.combine(
  winston.format.timestamp({
    format: "YYYY-MM-DD HH:mm:ss",
  }),
  winston.format.printf(
    (info) =>
      `${info.timestamp} ${info.level.toUpperCase()}: ${info.message}` +
      (info.splat !== undefined ? `${info.splat}` : " ")
  )
);
const logger = winston.createLogger({
  level: "info",
  // format: winston.format.json(),
  format: jsonFormatWithTimestamp,
  transports: [
    new winston.transports.File({ filename: "./logger/combined.log" }),
    new winston.transports.Console({ format: formatWithTimestamp }),
  ],
});

module.exports = logger;
