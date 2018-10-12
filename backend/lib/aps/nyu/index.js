import async from 'async'
import http from 'http'
import snap7 from 'node-snap7'
import WebSocket from 'ws'
import * as s7def from './def'
import * as s7obj from './entities'
import * as utils from '../utils'
import {
  commError,
  commOpen
} from '../s7comm'
import notification from '../notification'

const s7client = new snap7.S7Client()
const PLC = {
  ip: '192.168.55.2',
  rack: 0,
  slot: 1,
  polling_time: 500
}

const port = parseInt(process.env.PORT, 10) || 8083
const server = http.createServer((req, res) => {
  let page = req.url.split('/').pop()
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('X-Powered-By', 'Sotefin')
  switch (page) {
    case 'alarms':
      res.writeHead(200, { 'Content-Type': 'text/json' })
      res.end(JSON.stringify(s7obj.diag))
      break
    case 'cards':
      res.writeHead(200, { 'Content-Type': 'text/json' })
      res.end(JSON.stringify(s7obj.cards))
      break
    case 'map':
      res.writeHead(200, { 'Content-Type': 'text/json' })
      res.end(JSON.stringify(s7obj.map))
      break
    case 'overview':
      res.writeHead(200, { 'Content-Type': 'text/json' })
      res.end(JSON.stringify(s7obj.overview))
      break
    case 'racks':
      res.writeHead(200, { 'Content-Type': 'text/json' })
      res.end(JSON.stringify(s7obj.racks))
      break
    default:
      res.writeHead(404, { 'Content-Type': 'text/html' })
      res.write(`
      <h2 style="color:red">Error 404: Not found</h2>
      <a href="https://www.sotefinservice.com">https://www.sotefinservice.com</a>
      `)
      res.end()
  }
})
server.listen(port)

const wss = new WebSocket.Server({
  path: '/ws/nyu',
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
  const ip = req.connection.remoteAddress
  ws.isAlive = true
  ws.on('pong', utils.heartbeat)
  console.log('nyu', ip, wss.clients.size)
  ws.on('message', function incoming (message) {
    const { event, data } = JSON.parse(message)
    // console.log('received: %s', message, event, data)
    switch (event) {
      case 'edit-stall':
        const { stall, card } = data
        const buffer = Buffer.alloc(4)
        buffer.writeUInt16BE(stall, 0)
        buffer.writeUInt16BE(card, 2)
        s7client.WriteArea(0x84, s7def.DB_DATA, s7def.MAP_INDEX_INIT, 4, 0x02, buffer, function (err) {
          if (err) return commError(err, PLC, s7client)
        })
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
              s7client.WriteArea(0x84, s7def.DB_DATA, s7def.REQ_EXIT, 2, 0x02, buffer, function (err) {
                if (err) return commError(err, PLC, s7client)
              })
            } else {
              // error not found
            }
        }
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

export const createApplication = () => {
  async.retry({
    times: 5,
    interval: PLC.polling_time
  }, commOpen.bind(this, PLC, s7client), function (err, isOnline) {
    if (err) return commError(err, PLC, s7client)
    PLC.isOnline = isOnline
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
          updateMap(0, s7data, s7obj.stalls, s7obj.map.statistics, function (res) {
            cb(null, s7obj.map)
          })
        })
      }
    ], function (err, results) {
      if (err) return commError(err, PLC, s7client)
      wss.broadcast(JSON.stringify({ cards: results[0] }))
      wss.broadcast(JSON.stringify({ map: results[1] }))
    })
    async.forever(function (next) {
      setTimeout(function () {
        wss.broadcast(JSON.stringify({ comm: PLC }))
        if (PLC.isOnline) {
          wss.broadcast(
            JSON.stringify({
              diag: {
                alarmCount: s7obj.diag.count,
                isActive: s7obj.diag.count > 0
              }
            })
          )
          s7client.ReadArea(0x84, s7def.DB_DATA, s7def.DB_DATA_INIT, s7def.DB_DATA_LEN, 0x02, function (err, s7data) {
            if (err) return commError(err, PLC, s7client)
            async.series([
              function (cb) {
                utils.updateBits(s7def.DB_DATA_INIT_MB, s7data, s7obj.merkers, function (results) {
                  cb(null, s7obj.merkers)
                })
              },
              function (cb) {
                utils.updateBits(s7def.DB_DATA_INIT_EB, s7data, s7obj.inputs, function (results) {
                  cb(null, s7obj.inputs)
                })
              },
              function (cb) {
                utils.updateBits(s7def.DB_DATA_INIT_AB, s7data, s7obj.outputs, function (results) {
                  cb(null, s7obj.outputs)
                })
              },
              function (cb) {
                utils.updateDevices(s7def.DB_DATA_INIT_DEVICE, s7data, s7obj.devices, function (results) {
                  cb(null, s7obj.devices)
                })
              },
              function (cb) {
                utils.updateMeasures(s7def.DB_DATA_INIT_POS, s7data, s7obj.measures, function (results) {
                  cb(null, s7obj.measures)
                })
              },
              function (cb) {
                utils.updateQueue(s7def.DB_DATA_INIT_QUEUE, s7data, s7obj.exitQueue, function (results) {
                  cb(null, s7obj.exitQueue)
                })
              }
            ], function (err, results) {
              if (err) return commError(err, PLC, s7client)
              wss.broadcast(
                JSON.stringify({
                  overview: s7obj.overview,
                  racks: s7obj.racks
                })
              )
            })
          })
        } else {
          PLC.isOnline = s7client.Connect()
        }
        next()
      }, PLC.polling_time)
    })
  })
}

export const s7log = (log, callback) => {
  async.waterfall([
    (cb) => {
      const { device, operation } = log
      switch (operation) {
        case 1:
        case 2:
          updateAlarms(device, function (err, res) {
            if (err) return commError(err, PLC, s7client)
            wss.broadcast(JSON.stringify({ alarms: res }))
            cb(null, log)
          })
          break
        case 4:
          s7client.ReadArea(0x84, s7def.DB_CARDS, s7def.DB_CARDS_INIT, s7def.DB_CARDS_LEN, 0x02, function (err, s7data) {
            if (err) return commError(err, PLC, s7client)
            utils.updateCards(0, s7data, s7def.CARD_LEN, s7obj.cards, function (res) {
              wss.broadcast(JSON.stringify({ cards: s7obj.cards }))
              cb(null, log)
            })
          })
          break
        case 5:
        case 6:
        case 7:
        case 8:
          s7client.ReadArea(0x84, s7def.DB_MAP, s7def.DB_MAP_INIT, s7def.DB_MAP_LEN, 0x02, function (err, s7data) {
            if (err) return commError(err, PLC, s7client)
            updateMap(0, s7data, s7obj.stalls, s7obj.map.statistics, function (res) {
              wss.broadcast(JSON.stringify({ map: s7obj.map }))
              cb(null, log)
            })
          })
          break
        default:
          cb(null, log)
      }
    },
    (log, cb) => {
      var document = {
        alarm: {
          id: log.alarm,
          info: log.alarm === 0 ? 'Ready' : s7obj.alarms[log.device - 1].find(a => a.id === log.alarm).info
        },
        card: log.card,
        date: log.date,
        device: {
          id: log.device,
          name: log.device === 0 ? 'Operator' : s7obj.devices.find(d => d.id === log.device).name
        },
        event: log.event,
        mode: {
          id: log.mode,
          info: log.device === 0 ? '---' : s7obj.devices.find(d => d.id === log.device).mode.label
        },
        operation: {
          id: log.operation,
          info: s7obj.operations.find(o => o.id === log.operation).info
        },
        size: log.size,
        stall: log.stall,
        system: log.system
      }
      cb(null, document)
    }
  ], (err, document) => {
    if (err) return callback(err)
    wss.broadcast(JSON.stringify({ mesg: notification(document) }))
    callback(null, document)
  })
}

function updateAlarms (device, callback) {
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

function updateMap (start, buffer, stalls, statistics, callback) {
  async.waterfall([
    function (cb) {
      utils.updateStalls(start, buffer, s7def.STALL_LEN, stalls, function (err, results) {
        if (err) return cb(err)
        cb(null, stalls)
      })
    },
    function (stalls, cb) {
      utils.updateStatistics(stalls, statistics, s7def.StallStatus, function (err, results) {
        if (err) return cb(err)
        cb(null, results)
      })
    }
  ], (err, results) => {
    if (err) return callback(err)
    callback(null, results)
  })
}
