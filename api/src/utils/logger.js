const winston = require('winston');

const { createLogger, format, transports } = winston;

const logger = createLogger({
  format: format.combine(
    format.timestamp({
      format: 'DD/MM HH:mm:ss.SSS',
    }),
    format.printf((i) => `${i.timestamp} ${i.level} ${i.message}`),
  ),
  transports: [
    new transports.File({
      level: 'info',
      filename: '../log/all-logs.log',
      handleExceptions: true,
      maxsize: 1000000, // 5MB
      json: false,
      maxFiles: 10,
      colorize: false,
    }),
    new transports.Console({
      level: 'debug',
      handleExceptions: true,
      json: false,
      colorize: true,
    }),
  ],
  exitOnError: false,
});

module.exports = logger;
module.exports.stream = {
  // eslint-disable-next-line no-unused-vars
  write(message, encoding) {
    logger.info(message);
  },
};
