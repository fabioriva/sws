import winston, { format } from 'winston'

var options = {
  file: {
    level: 'info',
    filename: 'lib/s7log.log',
    handleExceptions: true,
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    colorize: false
  },
  console: {
    level: 'error',
    handleExceptions: true,
    json: false,
    colorize: true
  }
}

// // instantiate a new Winston Logger with the settings defined above
var logger = winston.createLogger({
  format: format.combine(
    format.splat(),
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
    // format.simple()
  ),
  transports: [
    new winston.transports.File(options.file),
    new winston.transports.Console(options.console)
  ],
  exitOnError: false // do not exit on handled exceptions
})

export default logger
