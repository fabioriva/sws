import net from 'net'
import Log from 'lib/models/LogS7'
import * as aps from 'lib/aps/def'
import { bassanoEmitter } from 'lib/aps/bassano'
import { museEmitter } from 'lib/aps/muse'

const dev = process.env.NODE_ENV !== 'production'
const HOST = dev ? process.env.BACKEND_URL : '192.168.20.3'
const PORT = 49000
const LOG_LEN = 32

const logger = require('pino')()
const server = net.createServer(function (socket) {
  let client = `${socket.remoteAddress}:${socket.remotePort}`
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
    logger.info('%s %o', client, buffer)
    if (buffer.length === LOG_LEN) {
      const log = new Log(buffer)
      switch (log.system) {
        case aps.BASSANO:
          bassanoEmitter.emit('data', log)
          break
        case aps.BOSTON:
          break
        case aps.MUSE:
          museEmitter.emit('data', log)
          break
        case aps.NYU:
          break
      }
    }
  })
})
server.listen(PORT, HOST)

bassanoEmitter.on('logger', (mesg) => logger.info('bassano %s', mesg))
museEmitter.on('logger', (mesg) => logger.info('muse %s', mesg))
