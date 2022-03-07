const winston = require('winston')

function getLogger (options = {} ) {

    return winston.createLogger( {
        level  : options.level || 'debug',
        format : winston.format.combine(
            winston.format.colorize( { all: true, colors: { info: 'blue', error: 'red', debug: 'yellow' } } ),
            winston.format.timestamp(),
            winston.format.errors( { stack: true } ),
            winston.format.prettyPrint(),
            winston.format.printf(info => {

                const { timestamp, level, message, ...args } = info

                return `${timestamp} [${level}]: ${message} ${Object.keys(args).length ? JSON.stringify(args, null, 2) : ''}`
            
            } ),
        ),
        transports: [
            new winston.transports.Console(),
        ],
    } )

}

module.exports = {
    logger: getLogger(),
    getLogger,
}
