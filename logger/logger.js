const winston = require("winston");

const logger = winston.createLogger({
    levels: winston.config.syslog.levels,
    transports: [
        new winston.transports.File({
            filename: './logs/errors.log',
            level: 'error'
        }),
        new winston.transports.File({
            filename: './logs/info.log',
            level: 'info'
        })
    ]
});
module.exports = logger;