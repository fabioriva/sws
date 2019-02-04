import { EventEmitter } from 'events'
import mongoose from 'mongoose'
import url from 'url'
import uuid from 'uuid/v4'
import WebSocket from 'ws'
import * as s7def from './def'
import * as s7obj from './entities'
import * as s7plc from './plc'
import * as utils from '../utils'
import http from '../api'
import notification from '../notification'
import LogSchema from 'lib/models/LogSchema'
import DiagSchema from 'lib/models/DiagSchema'
// import {
//   comm,
//   updateDiag,
//   updateLog
// } from '../s7comm'

class AppEmitter extends EventEmitter {}
export const museEmitter = new AppEmitter()

const dev = process.env.NODE_ENV !== 'production'
const options = {
  autoIndex: dev,
  useCreateIndex: true,
  useNewUrlParser: true
}
const mongodbUri = 'mongodb://localhost:27017/muse'

mongoose.createConnection(mongodbUri, options).then(conn => {
  var Log = conn.model('Log', LogSchema)
  var Diag = conn.model('Diag', DiagSchema)
  /**
   * http API
   */
  const server = http(Diag, Log, s7def, s7obj).listen(s7def.HTTP_PORT)
  /**
   * s7 comm
   */
  // const s7Emitter = new AppEmitter()
  // const s7client = comm(s7def, s7obj, s7Emitter)
  s7plc.s7Emitter.on('ch1', (data) => wss.broadcast('ch1', data)) // ch1: data channel
  s7plc.s7Emitter.on('ch2', (data) => wss.broadcast('ch2', data)) // ch2: comm channel
  /**
   * websocket
   */
  const wss = new WebSocket.Server({
    path: '/ws/muse',
    server: server
  })
  wss.broadcast = function broadcast (channel, data) {
    wss.clients.forEach(function each (client) {
      if (client.readyState === WebSocket.OPEN && client.channel === channel) {
        client.send(data)
      }
    })
  }
  wss.on('connection', function connection (ws, req) {
    const ip = req.headers['x-forwarded-for'].split(/\s*,\s*/)[0]
    const { query: { channel } } = url.parse(req.url, true)
    ws.isAlive = true
    ws.id = uuid()
    ws.channel = channel
    ws.on('pong', utils.heartbeat)
    ws.on('message', function incoming (message) {
      const { event, data } = JSON.parse(message)
      museEmitter.emit('logger', message, event, data)
      handleEvent(event, data)
    })
    museEmitter.emit('logger', `${ip}, ${ws.id}, ${ws.channel}, ${wss.clients.size}`)
  })
  setInterval(function ping () {
    wss.clients.forEach((ws) => {
      if (ws.isAlive === false) return ws.terminate()
      ws.isAlive = false
      ws.ping(utils.noop)
    })
  }, 3000)
  /**
   * S7 log
   */
  museEmitter.on('data', (s7log) => {
    var log = new Log()
    log.$s7log = s7log // access in pre save hook as this.$s7log
    log.$s7obj = s7obj // access in pre save hook as this.$s7obj
    log.save((err, doc) => {
      if (err) throw err
      museEmitter.emit('logger', doc)
      s7plc.updateLog(s7log, (err, res) => {
      // updateLog(s7client, s7def, s7obj, s7log, (err, res) => {
        // if (err) console.log(err)
        if (err) throw err
        wss.broadcast('ch1', JSON.stringify(res))
        wss.broadcast('ch2', JSON.stringify({ mesg: notification(log) }))
      })
      if (s7log.operation === 1) {
        s7plc.updateDiag(doc, (err, res) => {
        // updateDiag(s7client, s7def, (err, res) => {
          // if (err) console.log(err)
          if (err) throw err
          var diag = new Diag({
            alarmId: doc._id,
            s7data: res[0],
            s7map: res[1]
          })
          diag.save((err) => {
            if (err) throw err
          })
        })
      }
    })
  })
})

function handleEvent (event, data) {
  switch (event) {
    case 'edit-stall':
      const { stall, card } = data
      const buffer = Buffer.alloc(4)
      buffer.writeUInt16BE(stall, 0)
      buffer.writeUInt16BE(card, 2)
      if (s7plc.editStall(buffer)) console.log('done')
      // s7Emitter.emit(event, buffer)
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
            if (s7plc.requestOp(buffer)) console.log('done')
            // s7Emitter.emit(event, buffer)
          } else {
            // error not found

          }
      }
      break
  }
}
