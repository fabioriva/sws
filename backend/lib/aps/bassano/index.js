import { EventEmitter } from 'events'
import mongoose from 'mongoose'
import pino from 'pino'
import * as s7def from './def'
import * as s7obj from './entities'
import plc from 'lib/plc'
import log from 'lib/log'
import micro from 'lib/micro'
import websocket from 'lib/ws'
import notification from 'lib/aps/notification'
import LogSchema from 'lib/models/LogSchema'
// import DiagSchema from 'lib/models/DiagSchema'

class AppEmitter extends EventEmitter {}

const logger = pino({
  prettyPrint: {
    colorize: true,
    translateTime: 'yyyy-mm-dd HH:MM:ss.l o'
  }
})

const dev = process.env.NODE_ENV !== 'production'
const HOST = dev ? process.env.BACKEND_URL : '192.168.20.3'

const websocketUri = '/ws/bassano'
const PORT = 49001
const HTTP = 8081

const mongodbUri = 'mongodb://localhost:27017/bassano'
const options = {
  autoIndex: dev,
  useCreateIndex: true,
  useNewUrlParser: true
}

mongoose.createConnection(mongodbUri, options).then(conn => {
  const appEmitter = new AppEmitter()

  const Log = conn.model('Log', LogSchema)
  // const Diag = conn.model('Diag', DiagSchema)

  const server = micro(HTTP, Log, s7obj)

  const wss = websocket(websocketUri, server, appEmitter)

  plc(s7def, s7obj, appEmitter)

  appEmitter.on('ch1', (data) => wss.broadcast('ch1', data)) // ch1: data channel
  appEmitter.on('ch2', (data) => wss.broadcast('ch2', data)) // ch2: comm channel

  log(PORT, HOST, appEmitter)

  appEmitter.on('log-error', (client, e) => logger.error('%s socket error %s', client, e))
  appEmitter.on('log-close', (client) => logger.warn('%s socket close', client))
  appEmitter.on('log-end', (client) => logger.warn('%s socket end', client))
  appEmitter.on('log', (client, s7log) => {
    logger.info('%s socket data', client, s7log)
    var log = new Log()
    log.$s7log = s7log // access in pre save hook as this.$s7log
    log.$s7obj = s7obj // access in pre save hook as this.$s7obj
    log.save((err, doc) => {
      if (err) throw err
      appEmitter.emit('plc-update', s7log)
      wss.broadcast('ch2', JSON.stringify({ mesg: notification(log) }))
    })
  })

  appEmitter.on('ws-connect', (client, mesg) => logger.info('%s websocket connect %s', client, mesg))
  appEmitter.on('ws-event', (client, mesg) => {
    logger.info('%s websocket event %s', client, mesg)
    const { event, data } = JSON.parse(mesg)
    switch (event) {
      case 'edit-stall':
        const { stall, card } = data
        const buffer = Buffer.alloc(4)
        buffer.writeUInt16BE(stall, 0)
        buffer.writeUInt16BE(card, 2)
        appEmitter.emit('plc-write', 0x84, s7def.DB_DATA, s7def.MAP_INDEX_INIT, 4, 0x02, buffer)
        break
      case 'overview-operation':
        const { operation, value } = data
        let s = s7obj.stalls.find(s => s.status === value)
        switch (operation) {
          case 1: // Entry 1
            break
          case 2: // Entry 2
            break
          default:
            if (s) {
              const buffer = Buffer.alloc(2)
              buffer.writeUInt16BE(value, 0)
              appEmitter.emit('plc-write', 0x84, s7def.DB_DATA, s7def.REQ_EXIT, 2, 0x02, buffer)
            } else {
              // error not found
              logger.warn('%s websocket event: %s, message: %s', client, event, 'card not found')
            }
        }
        break
    }
  })
})
