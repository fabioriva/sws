import { EventEmitter } from 'events'
import mongoose from 'mongoose'
// import redis from 'redis'
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

class AppEmitter extends EventEmitter {}
export const bassanoEmitter = new AppEmitter()

const dev = process.env.NODE_ENV !== 'production'
const options = {
  autoIndex: dev,
  useCreateIndex: true,
  useNewUrlParser: true
}
const mongodbUri = 'mongodb://localhost:27017/bassano'

mongoose.createConnection(mongodbUri, options).then(conn => {
  var Log = conn.model('Log', LogSchema)
  var Diag = conn.model('Diag', DiagSchema)
  /**
   * http API
   */
  const server = http(Diag, Log, s7def, s7obj).listen(s7def.HTTP_PORT)
  // server.listen(s7def.HTTP_PORT)
  /**
   * Redis Pub/Sub
   */
  // const publisher = redis.createClient()
  s7plc.s7Emitter.on('ch1', (data) => wss.broadcast('ch1', data)) // publisher.publish('ch1', data)) // ch1: data channel
  s7plc.s7Emitter.on('ch2', (data) => wss.broadcast('ch2', data)) // publisher.publish('ch2', data)) // ch2: comm channel
  /**
   * websocket
   */
  const wss = new WebSocket.Server({
    path: '/ws/bassano',
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
    // ws.subscriber = redis.createClient()
    // ws.subscriber.subscribe(ws.channel)
    // ws.subscriber.on('message', (channel, message) => {
    //   if (ws.readyState === WebSocket.OPEN && ws.channel === channel) {
    //     ws.send(message)
    //   }
    // })
    ws.on('pong', utils.heartbeat)
    ws.on('message', function incoming (message) {
      const { event, data } = JSON.parse(message)
      bassanoEmitter.emit('logger', message, event, data)
      handleEvent(event, data)
    })
    bassanoEmitter.emit('logger', `${ip}, ${ws.id}, ${ws.channel}, ${wss.clients.size}`)
  })
  setInterval(function ping () {
    wss.clients.forEach((ws) => {
      if (ws.isAlive === false) {
        // ws.subscriber.unsubscribe()
        // ws.subscriber.quit()
        return ws.terminate()
      }
      ws.isAlive = false
      ws.ping(utils.noop)
    })
  }, 3000)
  /**
   * S7 log
   */
  bassanoEmitter.on('data', (s7log) => {
    var log = new Log()
    log.$s7log = s7log // access in pre save hook as this.$s7log
    log.$s7obj = s7obj // access in pre save hook as this.$s7obj
    log.save((err, doc) => {
      if (err) throw err
      bassanoEmitter.emit('logger', doc)
      s7plc.updateLog(s7log, (err, res) => {
        if (err) console.log(err)
        wss.broadcast('ch1', JSON.stringify(res)) // publisher.publish('ch1', JSON.stringify(res))
        wss.broadcast('ch2', JSON.stringify({ mesg: notification(log) })) // publisher.publish('ch2', JSON.stringify({ mesg: notification(log) }))
      })
      if (s7log.operation === 1) {
        s7plc.updateDiag(doc, (err, res) => {
          if (err) console.log(err)
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
          } else {
            // error not found

          }
      }
      break
  }
}
