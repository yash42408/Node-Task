const winston = require('winston');

winston.emitErrs =false;

function formatter(args){
    const dateTimeComponent = new Date();
    const loggerMessage = dateTimeComponent + ' - '+ args.level +  ': ' + args.message;
    return loggerMessage;
}

const logger = new winston.Logger({
    transports:[
        new winston.transports.File({
            filename: 'logs/nodeLogs.log',
            handleExceptions: true,
            json: false,
            colorize: true,
            maxsize:5242880,
            level: 'debug',
            formatter: formatter
        }),
        new winston.transports.Console({
            level: 'debug',
            handleExceptions: true,
            json: false,
            colorize: true,
            timestamp: true,
            label: 'node-service',
            humanReadableUnhandledException: true
        })
    ],
    exitOnError: false
})

module.exports = logger;

module.exports.stream = {
    write: function(message, encoding){
        logger.info(message);
    }
};