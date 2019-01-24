import async from 'async'
import snap7 from 'node-snap7'
import * as utils from './utils'

// const wait = ms => new Promise((resolve) => setTimeout(resolve, ms))

export const comm = (s7def, s7obj, s7Emitter) => {
  const s7client = new snap7.S7Client()
  async.retry({
    times: 5,
    interval: s7def.PLC.polling_time
  }, commOpen.bind(this, s7def.PLC, s7client), function (err, isOnline) {
    if (err) return commError(err, s7def.PLC, s7client)
    s7def.PLC.isOnline = isOnline
    s7client.ReadArea(0x84, s7def.DB_CARDS, s7def.DB_CARDS_INIT, s7def.DB_CARDS_LEN, 0x02, function (err, s7data) {
      if (err) return commError(err, s7def.PLC, s7client)
      utils.updateCards(0, s7data, s7def.CARD_LEN, s7obj.cards, function (res) {
        s7Emitter.emit('ch1', JSON.stringify({ cards: s7obj.cards }))
      })
    })
    s7client.ReadArea(0x84, s7def.DB_MAP, s7def.DB_MAP_INIT, s7def.DB_MAP_LEN, 0x02, function (err, s7data) {
      if (err) return commError(err, s7def.PLC, s7client)
      utils.updateMap(0, s7data, s7def, s7obj.stalls, s7obj.map.statistics, function (res) {
        s7Emitter.emit('ch1', JSON.stringify({ map: s7obj.map }))
      })
    })
    setInterval(() => {
      s7Emitter.emit('ch2', JSON.stringify({ comm: s7def.PLC }))
      if (s7def.PLC.isOnline) {
        s7Emitter.emit('ch2', JSON.stringify({
          diag: {
            alarmCount: s7obj.diag.count,
            isActive: s7obj.diag.count > 0
          }
        }))
        s7client.ReadArea(0x84, s7def.DB_DATA, s7def.DB_DATA_INIT, s7def.DB_DATA_LEN, 0x02, function (err, s7data) {
          if (err) return commError(err, s7def.PLC, s7client)
          utils.updateData(s7data, s7def, s7obj, function (err, res) {
            if (err) throw err
            s7Emitter.emit('ch1', JSON.stringify({
              overview: s7obj.overview,
              racks: s7obj.racks
            }))
          })
        })
      } else {
        s7def.PLC.isOnline = s7client.Connect()
      }
    }, s7def.PLC.polling_time)
    s7Emitter.on('edit-stall', function (buffer) {
      console.log('edit-stall', buffer, s7client.WriteArea(0x84, s7def.DB_DATA, s7def.MAP_INDEX_INIT, 4, 0x02, buffer))
      // return s7client.WriteArea(0x84, s7def.DB_DATA, s7def.MAP_INDEX_INIT, 4, 0x02, buffer)
    })
    s7Emitter.on('overview-operation', (buffer) => {
      console.log('overview-operation', buffer, s7client.WriteArea(0x84, s7def.DB_DATA, s7def.REQ_EXIT, 2, 0x02, buffer))
    })
  })
  return s7client
}

export function updateDiag (s7client, s7def, callback) {
  async.series([
    function (cb) {
      s7client.ReadArea(0x84, s7def.DB_DATA, s7def.DB_DATA_INIT, s7def.DB_DATA_LEN, 0x02, function (err, s7data) {
        if (err) return cb(err)
        cb(null, s7data)
      })
    },
    function (cb) {
      s7client.ReadArea(0x84, s7def.DB_MAP, s7def.DB_MAP_INIT, s7def.DB_MAP_LEN, 0x02, function (err, s7data) {
        if (err) return cb(err)
        cb(null, s7data)
      })
    }
  ], function (err, results) {
    if (err) return callback(commError(err, s7def.PLC, s7client))
    callback(null, results)
  })
}

export function updateLog (s7client, s7def, s7obj, log, cb) {
  const { device, operation } = log
  switch (operation) {
    case 1:
    case 2:
      updateAlarms(device, s7client, function (err, res) {
        if (err) return cb(commError(err, s7def.PLC, s7client))
        cb(null, { alarms: res })
      })
      break
    case 4:
      s7client.ReadArea(0x84, s7def.DB_CARDS, s7def.DB_CARDS_INIT, s7def.DB_CARDS_LEN, 0x02, function (err, s7data) {
        if (err) return cb(commError(err, s7def.PLC, s7client))
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
        if (err) return cb(commError(err, s7def.PLC, s7client))
        utils.updateMap(0, s7data, s7def, s7obj.stalls, s7obj.map.statistics, function (res) {
          cb(null, { map: s7obj.map })
        })
      })
      break
    default:
      cb(null, {})
  }
}

function updateAlarms (device, s7client, s7def, s7obj, callback) {
  async.series([
    function (cb) {
      s7client.ReadArea(0x84, s7def.DBS_ALARM[device], s7def.DB_ALARM_INIT, s7def.DB_ALARM_LEN, 0x02, function (err, s7data) {
        if (err) return cb(err)
        utils.updateAlarms(0, s7data, s7obj.alarms[device - 1], s7obj.diag.groups[device - 1], function (res) {
          cb(null, s7obj.diag.groups[device - 1])
        })
      })
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

const commOpen = (plc, s7client, callback) => {
  const { ip, rack, slot } = plc
  s7client.ConnectTo(ip, rack, slot, function (err) {
    if (err) return callback(err)
    callback(err, true)
  })
}

const commError = (err, plc, s7client) => {
  console.log(`${plc.ip} >> Error Code # ${err} - ${s7client.ErrorText(err)}`)
  if (err === 665420) {
    console.log(`${plc.ip} >> Disconnect # ${s7client.Disconnect()}`)
  }
  plc.isOnline = false
  return err
}

// export {
//   commError,
//   commOpen
// }
