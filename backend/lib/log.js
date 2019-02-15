import net from 'net'
import Log from 'lib/models/LogS7'

const LOG_LEN = 32

module.exports = function startServer (eventEmitter, logger) {
  const server = net.createServer(function (socket) {
    const client = `${socket.remoteAddress}:${socket.remotePort}`
    socket.on('error', function (e) {
      logger.error('%s socket error %s', client, e)
    })
    socket.on('close', function () {
      logger.warn('%s socket close', client)
    })
    socket.on('end', function () {
      logger.warn('%s socket end', client)
    })
    socket.on('data', function (data) {
      const buffer = Buffer.alloc(LOG_LEN, data)
      if (buffer.length === LOG_LEN) {
        const log = new Log(buffer)
        logger.info('%s socket data', client, log)
        eventEmitter.emit('log', log)
      }
    })
  })
  return server
}
