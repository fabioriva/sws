import net from 'net'
import Log from 'lib/models/LogS7'

const LOG_LEN = 32

module.exports = function startServer (PORT, HOST, eventEmitter) {
  const server = net.createServer(function (socket) {
    const client = `${socket.remoteAddress}:${socket.remotePort}`
    socket.on('error', function (e) {
      eventEmitter.emit('log-error', client, e)
    })
    socket.on('close', function () {
      eventEmitter.emit('log-close', client)
    })
    socket.on('end', function () {
      eventEmitter.emit('log-end', client)
    })
    socket.on('data', function (data) {
      const buffer = Buffer.alloc(LOG_LEN, data)
      if (buffer.length === LOG_LEN) {
        const log = new Log(buffer)
        eventEmitter.emit('log', client, log)
      }
    })
  })
  server.listen(PORT, HOST, () => console.log(`Listening on ${HOST}:${PORT}`))
}
