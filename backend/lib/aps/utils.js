import async from 'async'
import moment from 'moment'

const BytesToInt = (b1, b2) => {
  return (b1 << 8) | b2
}

const BytesToLong = (b1, b2, b3, b4) => {
  return (b1 << 24) | (b2 << 16) | (b3 << 8) | b4
}

const IntToBytes = (i, b) => {
  b[0] = i & 0xFF
  b[1] = (i >> 8) & 0xFF
  return i
}

const LongToBytes = (i, b) => {
  b[0] = i & 0xFF
  b[1] = (i >> 8) & 0xFF
  b[2] = (i >> 16) & 0xFF
  b[3] = (i >> 24) & 0xFF
  return i
}

export const getPLCDateTime = (days, msec) => {
  var h = Math.floor(msec / 3600000)
  var m = Math.floor((msec % 3600000) / 60000)
  var s = Math.floor(((msec % 3600000) % 60000) / 1000)
  var ms = Math.floor(((msec % 3600000) % 60000) % 1000)
  var d = new Date(1990, 0, 1, h, m, s, ms)
  return d.setDate(d.getDate() + days)
}

const updateBits = (byte, data, bytes, callback) => {
  var iterations = 0
  for (var b = 0; b < bytes.length; b++) {
    var mask = 1
    for (var i = 0; i < bytes[b].length; i++) {
      bytes[b][i].status = (data[byte] & mask ? 1 : 0)
      mask *= 2
    }
    byte += 1
    if (++iterations === bytes.length) {
      // console.log(iterations, bytes.length)
      callback(null, iterations)
    }
  }
}

const updateAlarms = (byte, data, alarms, alerts, callback) => {
  var iterations = 0
  alerts.count = 0
  alerts.active = []
  var mask = 1
  for (var a = 0; a < alarms.length; a++) {
    alarms[a].status = data[byte + 0] & mask ? 1 : 0
    alarms[a].cancel = data[byte + 0] & (4) ? 1 : 0
    var date = getPLCDateTime(BytesToInt(data[byte + 2], data[byte + 3]), BytesToLong(data[byte + 4], data[byte + 5], data[byte + 6], data[byte + 7]))
    alarms[a].date = moment(date).format('YYYY-MM-DD HH:mm:ss:SSS')
    byte += 8
    if (alarms[a].status) {
      ++alerts.count
      // alerts.active.push(alarms[a])
      alerts.active.push(Object.assign({}, alarms[a])) // clone object
    }
    if (++iterations === alarms.length) {
      // console.log(iterations, alarms.length, data.length, alerts)
      alerts.active.sort(dateSortAsc)
      callback(null, iterations)
    }
  }
}

function dateSortAsc (a1, a2) {
  // This is a comparison function that will result in dates being sorted in
  // ASCENDING order. As you can see, JavaScript's native comparison operators
  // can be used to compare dates. This was news to me.
  if (a1.date > a2.date) return 1
  if (a1.date < a2.date) return -1
  return 0
}

const updateCards = (start, buffer, offset, cards, callback) => {
  const OFFSET = offset // s7def.CARD_LEN
  var byte = 0
  var min = start === 0 ? 0 : (start / OFFSET)
  var max = (buffer.length / OFFSET) + min
  var iterations = min
  for (var c = min; c < max; c++) {
    cards[c].code = BytesToInt(buffer[byte + 0], buffer[byte + 1]).toString(16).toUpperCase()
    cards[c].from = moment(getPLCDateTime(0, BytesToLong(buffer[byte + 2], buffer[byte + 3], buffer[byte + 4], buffer[byte + 5]))).format('HH:mm:ss')
    cards[c].to = moment(getPLCDateTime(0, BytesToLong(buffer[byte + 6], buffer[byte + 7], buffer[byte + 8], buffer[byte + 9]))).format('HH:mm:ss')
    byte += OFFSET
    if (++iterations === max) {
      // console.log(iterations, min, max)
      callback(null, iterations)
    }
  }
}

const updateDevices = (byte, data, devices, callback) => {
  var iterations = 0
  for (var d = 0; d < devices.length; d++) {
    devices[d].card = BytesToInt(data[byte + 0], data[byte + 1])
    // devices[d].mode = modes[BytesToInt(data[byte + 2], data[byte + 3])]
    devices[d].mode = {
      label: devices[d].setMode(BytesToInt(data[byte + 2], data[byte + 3])),
      id: BytesToInt(data[byte + 2], data[byte + 3])
    }
    devices[d].motor = BytesToInt(data[byte + 4], data[byte + 5])
    devices[d].operation = BytesToInt(data[byte + 6], data[byte + 7])
    devices[d].position = BytesToInt(data[byte + 8], data[byte + 9])
    devices[d].size = BytesToInt(data[byte + 10], data[byte + 11])
    devices[d].stall = BytesToInt(data[byte + 12], data[byte + 13])
    devices[d].step = BytesToInt(data[byte + 14], data[byte + 15])
    byte += 16
    if (++iterations === devices.length) {
      // console.log(iterations, devices.length, devices)
      callback(null, iterations)
    }
  }
}

const updateMeasures = (byte, data, measures, callback) => {
  var iterations = 0
  for (var m = 0; m < measures.length; m++) {
    measures[m].destination = BytesToInt(data[byte + 0], data[byte + 1])
    measures[m].position = BytesToInt(data[byte + 2], data[byte + 3])
    byte += 4
    if (++iterations === measures.length) {
      // console.log(iterations, measures.length)
      callback(null, iterations)
    }
  }
}

const updateQueue = (byte, data, queue, callback) => {
  var iterations = 0
  for (var q = 0; q < queue.length; q++) {
    queue[q].card = BytesToInt(data[byte + 0], data[byte + 1])
    queue[q].stall = BytesToInt(data[byte + 2], data[byte + 3])
    byte += 4
    if (++iterations === queue.length) {
      // console.log(iterations, devices.length)
      callback(null, iterations)
    }
  }
}

function updateData (s7data, s7def, s7obj, callback) {
  async.series([
    function (cb) {
      updateBits(s7def.DB_DATA_INIT_MB, s7data, s7obj.merkers, function (results) {
        cb(null, s7obj.merkers)
      })
    },
    function (cb) {
      updateBits(s7def.DB_DATA_INIT_EB, s7data, s7obj.inputs, function (results) {
        cb(null, s7obj.inputs)
      })
    },
    function (cb) {
      updateBits(s7def.DB_DATA_INIT_AB, s7data, s7obj.outputs, function (results) {
        cb(null, s7obj.outputs)
      })
    },
    function (cb) {
      updateDevices(s7def.DB_DATA_INIT_DEVICE, s7data, s7obj.devices, function (results) {
        cb(null, s7obj.devices)
      })
    },
    function (cb) {
      updateMeasures(s7def.DB_DATA_INIT_POS, s7data, s7obj.measures, function (results) {
        cb(null, s7obj.measures)
      })
    },
    function (cb) {
      updateQueue(s7def.DB_DATA_INIT_QUEUE, s7data, s7obj.exitQueue, function (results) {
        cb(null, s7obj.exitQueue)
      })
    }
  ], function (err, results) {
    if (err) return callback(err)
    callback(null, results)
  })
}

const updateStalls = (start, buffer, offset, stalls, callback) => {
  const OFFSET = offset // s7def.STALL_LEN
  var byte = 0
  var min = start === 0 ? 0 : (start / OFFSET)
  var max = (buffer.length / OFFSET) + min
  var iterations = min
  for (var s = min; s < max; s++) {
    stalls[s].status = BytesToInt(buffer[byte + 0], buffer[byte + 1])
    var date = getPLCDateTime(BytesToInt(buffer[byte + 2], buffer[byte + 3]), BytesToLong(buffer[byte + 4], buffer[byte + 5], buffer[byte + 6], buffer[byte + 7]))
    stalls[s].date = moment(date).format('YYYY-MM-DD HH:mm:ss')
    stalls[s].size = BytesToInt(buffer[byte + 8], buffer[byte + 9])
    byte += OFFSET
    if (++iterations === max) {
      // console.log(iterations, min, max)
      callback(null, iterations)
    }
  }
}

var updateStatistics = (stalls, statistics, stallStatus, callback) => {
  var iterations = 0
  for (var s = 0; s < statistics.length; s++) {
    mapCount(stalls, statistics[s], s, stallStatus)
    if (++iterations === statistics.length) {
      // console.log(iterations, statistics)
      callback(null, iterations)
    }
  }
}

function mapCount (stalls, data, size, stallStatus) {
  data[0].value = data[1].value = data[2].value = 0
  for (var s = 0; s < stalls.length; s++) {
    if (size === 0 || stalls[s].size === size) {
      switch (stalls[s].status) {
        case 0 :
          ++data[0].value
          break
        case stallStatus.LOCK :
          ++data[2].value
          break
        default :
          ++data[1].value
          break
      }
      // ++data.total
    }
  }
}

function updateMap (start, buffer, s7def, stalls, statistics, callback) {
  async.waterfall([
    function (cb) {
      stalls.forEach((e, i) => e.update(buffer.readInt16BE(i * s7def.STALL_LEN), buffer.readInt16BE((i * s7def.STALL_LEN) + 2), buffer.readInt32BE((i * s7def.STALL_LEN) + 4), buffer.readInt16BE((i * s7def.STALL_LEN) + 8)))
      //updateStalls(start, buffer, s7def.STALL_LEN, stalls, function (err, results) {
        // if (err) return cb(err)
        cb(null, stalls)
      //})
    },
    function (stalls, cb) {
      updateStatistics(stalls, statistics, s7def.StallStatus, function (err, results) {
        if (err) return cb(err)
        cb(null, results)
      })
    }
  ], (err, results) => {
    if (err) return callback(err)
    callback(null, results)
  })
}

export {
  BytesToInt,
  BytesToLong,
  IntToBytes,
  LongToBytes,
  // updateBits,
  updateAlarms,
  updateCards,
  // updateDevices,
  // updateMeasures,
  // updateQueue,
  updateData,
  // updateStalls,
  // updateStatistics
  updateMap
}

/*
 * Websocket utilities.
 */

export function heartbeat () {
  this.isAlive = true
}

export function noop () {}
