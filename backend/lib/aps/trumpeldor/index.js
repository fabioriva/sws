import { EventEmitter } from 'events'
import mongoose from 'mongoose'
import pino from 'pino'
import * as s7def from './def'
import * as s7obj from './entities'
import plcClient from './s7comm'
import logServer from './s7log'
import websocket from './ws'
import micro from './micro'
import notification from '../notification'
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
const PORT = 49002
const HTTP = 8084

const options = {
  autoIndex: dev,
  useCreateIndex: true,
  useNewUrlParser: true
}
const mongodbUri = 'mongodb://localhost:27017/trumpeldor'

mongoose.createConnection(mongodbUri, options).then(conn => {
  const appEmitter = new AppEmitter()

  const Log = conn.model('Log', LogSchema)
  // const Diag = conn.model('Diag', DiagSchema)

  const server = micro(HTTP, Log, s7obj)

  const wss = websocket('/ws/trumpeldor', server, appEmitter)

  plcClient(s7def, s7obj, appEmitter)

  logServer(HOST, PORT, appEmitter)

  appEmitter.on('ch1', (data) => wss('ch1', data)) // ch1: data channel
  appEmitter.on('ch2', (data) => wss('ch2', data)) // ch2: comm channel

  appEmitter.on('log', (s7log) => {
    var log = new Log()
    log.$s7log = s7log // access in pre save hook as this.$s7log
    log.$s7obj = s7obj // access in pre save hook as this.$s7obj
    log.save((err, doc) => {
      if (err) throw err
      logger.info(s7log)
      appEmitter.emit('update-log', s7log)
      wss('ch2', JSON.stringify({ mesg: notification(log) }))
    })
  })

  appEmitter.on('event', (message) => {
    const { event, data } = JSON.parse(message)
    switch (event) {
      case 'edit-stall':
        const { stall, card } = data
        const buffer = Buffer.alloc(4)
        buffer.writeUInt16BE(stall, 0)
        buffer.writeUInt16BE(card, 2)
        appEmitter.emit(event, buffer)
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
              appEmitter.emit(event, buffer)
            } else {
              // error not found
              console.log('overview-operation', 'card not found')
            }
        }
        break
    }
  })
})
