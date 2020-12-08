// const winston = require("winston");

// const logger = winston.createLogger({
//     levels: winston.config.syslog.levels,
//     transports: [
//         new winston.transports.File({
//             filename: './logs/errors.log',
//             level: 'error'
//         }),
//         new winston.transports.File({
//             filename: './logs/info.log',
//             level: 'info'
//         })
//     ]
// });
// module.exports = logger;

const { createLogger, transports, format } = require("winston");

const logger = createLogger({
  transports: [
    new transports.File({
      filename: "./log/info.log",
      level: "info",
      format: format.combine(format.timestamp(), format.json()),
    }),
    new transports.File({
      filename: "./log/error.log",
      level: "error",
      format: format.combine(format.timestamp(), format.json()),
    }),
    new transports.File({
      filename: "./log/warning.log",
      level: "warn",
      format: format.combine(format.timestamp(), format.json()),
    }),
    new transports.File({
      filename: "./log/debug.log",
      level: "debug",
      format: format.combine(format.timestamp(), format.json()),
    }),
    ],
});

module.exports = logger;