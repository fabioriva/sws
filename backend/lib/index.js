import net from 'net'
import pino from 'pino'
import Log from 'lib/models/LogS7'
import * as aps from 'lib/aps/def'
import { bassanoEmitter } from 'lib/aps/bassano'
import { museEmitter } from 'lib/aps/muse'
import { nyuEmitter } from 'lib/aps/nyu'
import { trumpeldorEmitter } from 'lib/aps/trumpeldor'

const dev = process.env.NODE_ENV !== 'production'
const HOST = dev ? process.env.BACKEND_URL : '192.168.20.3'
const PORT = 49000
const LOG_LEN = 32

const log = (aps, mesg) => `[${aps}] ${mesg}`
const logger = pino({
  prettyPrint: {
    colorize: true,
    translateTime: 'yyyy-mm-dd HH:MM:ss.l o'
  }
})
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
        case aps.DONINI:
          break
        case aps.MUSE:
          museEmitter.emit('data', log)
          break
        case aps.NYU:
          nyuEmitter.emit('data', log)
          break
        case aps.WASHINGTON_BLVD:
          break
        case aps.TRUMPELDOR:
          trumpeldorEmitter.emit('data', log)
          break
      }
    }
  })
})
server.listen(PORT, HOST)

bassanoEmitter.on('logger', mesg => logger.info(log('bassano', mesg)))
museEmitter.on('logger', mesg => logger.info(log('muse', mesg)))
nyuEmitter.on('logger', mesg => logger.info(log('nyu', mesg)))
trumpeldorEmitter.on('logger', mesg => logger.info(log('trumpeldor', mesg)))
