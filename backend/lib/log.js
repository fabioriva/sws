import net from 'net'
// import pino from 'pino'
import Log from 'lib/models/LogS7'

const LOG_LEN = 32
// const logger = pino({
//   prettyPrint: {
//     colorize: true,
//     translateTime: 'yyyy-mm-dd HH:MM:ss.l o'
//   }
// })

module.exports = function startServer (PORT, HOST, eventEmitter) {
  const server = net.createServer(function (socket) {
    const client = `${socket.remoteAddress}:${socket.remotePort}`
    socket.on('error', function (e) {
      // logger.error('%s socket error %s', client, e)
      console.log('error', client)
    })
    socket.on('close', function () {
      // logger.warn('%s socket close', client)
      console.log('close', client)
    })
    socket.on('end', function () {
      // logger.warn('%s socket end', client)
      console.log('end', client)
    })
    socket.on('data', function (data) {
      console.log(data)
      const buffer = Buffer.alloc(LOG_LEN, data)
      // logger.info('%s %o', client, buffer)
      if (buffer.length === LOG_LEN) {
        const log = new Log(buffer)
        eventEmitter.emit('log', log)
      }
    })
  }).listen(PORT, HOST, () => console.log(`Listening on ${HOST}:${PORT}`))
}
