import { EventEmitter } from 'events'
import mongoose from 'mongoose'
import pino from 'pino'
import * as s7def from './def'
import * as s7obj from './entities'
import api from 'lib/aps/apiServer'
import log from 'lib/aps/logServer'
import plc from 'lib/aps/plc'
import websocket from 'lib/aps/ws'
import mailer from 'lib/aps/mailer'
import notification from 'lib/aps/notification'
import LogSchema from 'lib/models/LogSchema'
import DiagSchema from 'lib/models/DiagSchema'

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

const appEmitter = new AppEmitter()

mongoose.createConnection(mongodbUri, options).then(conn => {
  const Log = conn.model('Log', LogSchema)
  const Diag = conn.model('Diag', DiagSchema)

  plc(s7def, s7obj, appEmitter, logger)

  const serverApi = api(Diag, Log, s7def, s7obj)

  serverApi.listen(HTTP, () => logger.info(`Api server listening on localhost:${HTTP}`))

  const wss = websocket(websocketUri, serverApi, appEmitter, logger)

  appEmitter.on('ch1', (data) => wss.broadcast('ch1', data)) // ch1: data channel
  appEmitter.on('ch2', (data) => wss.broadcast('ch2', data)) // ch2: comm channel

  const serverLog = log(appEmitter, logger)

  serverLog.listen(PORT, HOST, () => logger.info(`Log server listening on ${HOST}:${PORT}`))

  appEmitter.on('log', (s7log) => {
    var log = new Log()
    log.$s7log = s7log // access in pre save hook as this.$s7log
    log.$s7obj = s7obj // access in pre save hook as this.$s7obj
    log.save((err, doc) => {
      if (err) throw err
      wss.broadcast('ch2', JSON.stringify({ mesg: notification(log) }))
      appEmitter.emit('plc-update', s7log)
      if (s7log.operation === 1) {
        appEmitter.emit('plc-update-diagnostic', doc._id)
        mailer('Trumpeldor', doc, s7def.EMAIL_ADDRESSES_RECIPIENT)
      }
    })
  })

  appEmitter.on('diagnostic', (_id, data, map) => {
    var diag = new Diag({
      alarmId: _id,
      s7data: data,
      s7map: map
    })
    diag.save((err) => {
      if (err) throw err
    })
  })

  appEmitter.on('ws-event', (client, mesg) => {
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
