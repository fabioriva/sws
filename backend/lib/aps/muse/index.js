import async from 'async'
import { EventEmitter } from 'events'
import mongoose from 'mongoose'
import snap7 from 'node-snap7'
import WebSocket from 'ws'
import * as s7def from './def'
import * as s7obj from './entities'
import * as utils from '../utils'
import http from '../api'
import notification from '../notification'
import {
  commError,
  commOpen
} from '../s7comm'
import LogSchema from 'lib/models/LogSchema'
import DiagSchema from 'lib/models/DiagSchema'

class AppEmitter extends EventEmitter {}
export const museEmitter = new AppEmitter()

const dev = process.env.NODE_ENV !== 'production'
const options = {
  autoIndex: dev,
  useCreateIndex: true,
  useNewUrlParser: true
}
const mongodbUri = 'mongodb://localhost:27017/muse'
mongoose.connect(mongodbUri, options)
mongoose.Promise = global.Promise

const conn = mongoose.connection
conn.on('error', console.error.bind(console, 'connection error:'))
conn.once('open', () => {
  /**
   * http API
   */
  const server = http(LogSchema, s7obj)
  server.listen(s7def.HTTP_PORT)
  /**
   * websocket
   */
  const wss = new WebSocket.Server({
    path: '/ws/muse',
    server: server
  })
  wss.broadcast = function broadcast (data) {
    wss.clients.forEach(function each (client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(data)
      }
    })
  }
  wss.on('connection', function connection (ws, req) {
    // const ip = req.connection.remoteAddress
    const ip = req.headers['x-forwarded-for'].split(/\s*,\s*/)[0]
    ws.isAlive = true
    ws.on('pong', utils.heartbeat)
    console.log('muse', ip, wss.clients.size)
    ws.on('message', function incoming (message) {
      const { event, data } = JSON.parse(message)
      console.log('received: %s', message, event, data)
      switch (event) {
        case 'edit-stall':
          const { stall, card } = data
          const buffer = Buffer.alloc(4)
          buffer.writeUInt16BE(stall, 0)
          buffer.writeUInt16BE(card, 2)
          s7client.WriteArea(0x84, s7def.DB_DATA, s7def.MAP_INDEX_INIT, 4, 0x02, buffer, function (err) {
            if (err) return commError(err, s7def.PLC, s7client)
          })
          break
        case 'overview-operation':
          const { operation, value } = data
          let s = s7obj.stalls.find(s => s.status === value)
          switch (operation) {
            case 1: // Entry 1
              console.log('Entry 1', value)
              break
            case 2: // Entry 2
              console.log('Entry 2', value)
              break
            default:
              if (s) {
                const buffer = Buffer.alloc(2)
                buffer.writeUInt16BE(value, 0)
                s7client.WriteArea(0x84, s7def.DB_DATA, s7def.REQ_EXIT, 2, 0x02, buffer, function (err) {
                  if (err) return commError(err, s7def.PLC, s7client)
                })
              } else {
                // error not found
              }
          }
          break
        case 'overview-rollback':
          const { id } = data
          console.log(id)
          switch (id) {
            case 3:
              s7client.WriteArea(0x84, s7def.DB_DATA, ((184 * 8) + 4), 1, 0x01, s7def.TRUE, function (err) {
                if (err) return commError(err, s7def.PLC, s7client)
              })
              break
            case 4:
              s7client.WriteArea(0x84, s7def.DB_DATA, ((184 * 8) + 5), 1, 0x01, s7def.TRUE, function (err) {
                if (err) return commError(err, s7def.PLC, s7client)
              })
              break
          }
          break
        case 'diag-enable':
          console.log('diag-enable', data)
          DiagSchema.find({ alarmId: data._id }).exec(function (err, data) {
            if (err) console.log(err)
            if (data.length > 0) {
              console.log(data[0].alarmId, typeof data[0].s7data, data[0].s7data)
              utils.updateData(data[0].s7data, s7def, s7obj, function (err, res) {
                if (err) throw err
                s7obj.diag.isActive = true
                wss.broadcast(
                  JSON.stringify({
                    overview: s7obj.overview,
                    racks: s7obj.racks
                  })
                )
              })
            }
          })
          break
        case 'diag-disable':
          console.log('diag-disable', data)
          s7obj.diag.isActive = false
          break
      }
    })
  })
  setInterval(function ping () {
    wss.clients.forEach((ws) => {
      if (ws.isAlive === false) return ws.terminate()
      ws.isAlive = false
      ws.ping(utils.noop)
    })
  }, 3000)
  /**
   * S7 comm
   */
  const s7client = new snap7.S7Client()
  async.retry({
    times: 5,
    interval: s7def.PLC.polling_time
  }, commOpen.bind(this, s7def.PLC, s7client), function (err, isOnline) {
    if (err) return commError(err, s7def.PLC, s7client)
    s7def.PLC.isOnline = isOnline
    async.series([
      function (cb) {
        s7client.ReadArea(0x84, s7def.DB_CARDS, s7def.DB_CARDS_INIT, s7def.DB_CARDS_LEN, 0x02, function (err, s7data) {
          if (err) return cb(err)
          utils.updateCards(0, s7data, s7def.CARD_LEN, s7obj.cards, function (res) {
            cb(null, s7obj.cards)
          })
        })
      },
      function (cb) {
        s7client.ReadArea(0x84, s7def.DB_MAP, s7def.DB_MAP_INIT, s7def.DB_MAP_LEN, 0x02, function (err, s7data) {
          if (err) return cb(err)
          utils.updateMap(0, s7data, s7def, s7obj.stalls, s7obj.map.statistics, function (res) {
            cb(null, s7obj.map)
          })
        })
      }
    ], function (err, results) {
      if (err) return commError(err, s7def.PLC, s7client)
      wss.broadcast(JSON.stringify({ cards: results[0] }))
      wss.broadcast(JSON.stringify({ map: results[1] }))
    })
    async.forever(function (next) {
      setTimeout(function () {
        wss.broadcast(JSON.stringify({ comm: s7def.PLC }))
        if (s7def.PLC.isOnline) {
          wss.broadcast(
            JSON.stringify({
              diag: {
                alarmCount: s7obj.diag.count,
                isActive: s7obj.diag.isActive // count > 0
              }
            })
          )
          if (!s7obj.diag.isActive) {
            s7client.ReadArea(0x84, s7def.DB_DATA, s7def.DB_DATA_INIT, s7def.DB_DATA_LEN, 0x02, function (err, s7data) {
              if (err) return commError(err, s7def.PLC, s7client)
              utils.updateData(s7data, s7def, s7obj, function (err, res) {
                if (err) throw err
                wss.broadcast(
                  JSON.stringify({
                    overview: s7obj.overview,
                    racks: s7obj.racks
                  })
                )
              })
            })
          }
        } else {
          s7def.PLC.isOnline = s7client.Connect()
        }
        next()
      }, s7def.PLC.polling_time)
    })
  })
  /**
   * S7 log
   */
  museEmitter.on('data', (s7log) => {
    var document = new LogSchema()
    document.$s7log = s7log // access in pre save hook as this.$s7log
    document.$s7obj = s7obj // access in pre save hook as this.$s7obj
    document.save((err, doc) => {
      console.log(doc)
      if (err) throw err
      updateLog(s7log, s7client, (err, res) => {
        if (err) return commError(err, s7def.PLC, s7client)
        // console.log(res)
        wss.broadcast(JSON.stringify(res))
        wss.broadcast(JSON.stringify({ mesg: notification(document) }))
      })
      updateDiag(doc, s7client, (err, res) => {
        if (err) return commError(err, s7def.PLC, s7client)
        // console.log('diag', res)
      })
    })
  })
})

function updateDiag (doc, s7client, cb) {
  s7client.ReadArea(0x84, s7def.DB_DATA, s7def.DB_DATA_INIT, s7def.DB_DATA_LEN, 0x02, function (err, s7data) {
    if (err) return cb(err)
    var diag = new DiagSchema({
      alarmId: doc._id,
      s7data: s7data
    })
    diag.save((err, doc) => {
      if (err) return cb(err)
      cb(null, doc)
    })
  })
}

function updateLog (log, s7client, cb) {
  const { device, operation } = log
  switch (operation) {
    case 1:
    case 2:
      updateAlarms(device, s7client, function (err, res) {
        if (err) return cb(err)
        cb(null, { alarms: res })
      })
      break
    case 4:
      s7client.ReadArea(0x84, s7def.DB_CARDS, s7def.DB_CARDS_INIT, s7def.DB_CARDS_LEN, 0x02, function (err, s7data) {
        if (err) return cb(err)
        utils.updateCards(0, s7data, s7def.CARD_LEN, s7obj.cards, function (res) {
          cb(null, { cards: s7obj.cards })
        })
      })
      break
    case 5:
    case 6:
    case 7:
    case 8:
      s7client.ReadArea(0x84, s7def.DB_MAP, s7def.DB_MAP_INIT, s7def.DB_MAP_LEN, 0x02, function (err, s7data) {
        if (err) return cb(err)
        utils.updateMap(0, s7data, s7def, s7obj.stalls, s7obj.map.statistics, function (res) {
          cb(null, { map: s7obj.map })
        })
      })
      break
    default:
      cb(null, {})
  }
}

function updateAlarms (device, s7client, callback) {
  async.series([
    function (cb) {
      switch (device) {
        case 1:
          s7client.ReadArea(0x84, s7def.DB_ALARM_1, s7def.DB_ALARM_INIT, s7def.DB_ALARM_LEN, 0x02, function (err, s7data) {
            if (err) return cb(err)
            utils.updateAlarms(0, s7data, s7obj.alarms[0], s7obj.diag.groups[0], function (res) {
              cb(null, s7obj.diag.groups[0])
            })
          })
          break
        case 2:
          s7client.ReadArea(0x84, s7def.DB_ALARM_2, s7def.DB_ALARM_INIT, s7def.DB_ALARM_LEN, 0x02, function (err, s7data) {
            if (err) return cb(err)
            utils.updateAlarms(0, s7data, s7obj.alarms[1], s7obj.diag.groups[1], function (res) {
              cb(null, s7obj.diag.groups[1])
            })
          })
          break
        case 3:
          s7client.ReadArea(0x84, s7def.DB_ALARM_3, s7def.DB_ALARM_INIT, s7def.DB_ALARM_LEN, 0x02, function (err, s7data) {
            if (err) return cb(err)
            utils.updateAlarms(0, s7data, s7obj.alarms[2], s7obj.diag.groups[2], function (res) {
              cb(null, s7obj.diag.groups[2])
            })
          })
          break
        case 4:
          s7client.ReadArea(0x84, s7def.DB_ALARM_4, s7def.DB_ALARM_INIT, s7def.DB_ALARM_LEN, 0x02, function (err, s7data) {
            if (err) return cb(err)
            utils.updateAlarms(0, s7data, s7obj.alarms[3], s7obj.diag.groups[3], function (res) {
              cb(null, s7obj.diag.groups[3])
            })
          })
      }
    },
    function (cb) {
      s7obj.diag.count = 0
      s7obj.diag.groups.forEach(g => {
        s7obj.diag.count += g.count
      })
      cb(null, s7obj.diag)
    }
  ], function (err, results) {
    if (err) return callback(err)
    callback(null, results[1])
  })
}
