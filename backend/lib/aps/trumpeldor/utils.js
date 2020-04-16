import moment from 'moment'
import util from 'util'

function plcDateTime (days, msec) {
  var h = Math.floor(msec / 3600000)
  var m = Math.floor((msec % 3600000) / 60000)
  var s = Math.floor(((msec % 3600000) % 60000) / 1000)
  var ms = Math.floor(((msec % 3600000) % 60000) % 1000)
  var d = new Date(1990, 0, 1, h, m, s, ms)
  return d.setDate(d.getDate() + days)
}

function mapCount (stalls, data, size, stallStatus) {
  data[0].value = data[1].value = data[2].value = 0
  for (let i = 0; i < stalls.length; i++) {
    if (size === 0 || stalls[i].size === size) {
      switch (stalls[i].status) {
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
    }
  }
}

export const updateBits = util.promisify((start, buffer, bytes, callback) => {
  for (let b = 0; b < bytes.length; b++) {
    let mask = 1
    for (let i = 0; i < bytes[b].length; i++) {
      bytes[b][i].status = (buffer[start] & mask ? 1 : 0)
      mask *= 2
    }
    start += 1
  }
  callback(null, bytes)
})

export const updateCards = util.promisify((start, buffer, offset, cards, callback) => {
  let byte = 0
  const min = 0
  const max = buffer.length / offset
  for (let i = min; i < max; i++) {
    cards[i].code = buffer.readInt16BE(byte).toString(16).toUpperCase()
    cards[i].from = moment(plcDateTime(0, buffer.readInt32BE(byte + 2))).format('HH:mm:ss')
    cards[i].to = moment(plcDateTime(0, buffer.readInt32BE(byte + 6))).format('HH:mm:ss')
    byte += offset
  }
  callback(null, cards)
})

export const updateDevices = util.promisify((start, buffer, offset, devices, callback) => {
  let byte = start
  for (let i = 0; i < devices.length; i++) {
    devices[i].card = buffer.readInt16BE(byte)
    devices[i].mode = {
      label: devices[i].setMode(buffer.readInt16BE(byte + 2)),
      id: buffer.readInt16BE(byte + 2)
    }
    devices[i].motor = buffer.readInt16BE(byte + 4)
    devices[i].operation = buffer.readInt16BE(byte + 6)
    devices[i].position = buffer.readInt16BE(byte + 8)
    devices[i].size = buffer.readInt16BE(byte + 10)
    devices[i].stall = buffer.readInt16BE(byte + 12)
    devices[i].step = buffer.readInt16BE(byte + 14)
    byte += offset
  }
  callback(null, devices)
})

export const updateMeasures = util.promisify((start, buffer, offset, measures, callback) => {
  let byte = start
  for (let i = 0; i < measures.length; i++) {
    measures[i].destination = buffer.readInt16BE(byte + 0)
    measures[i].position = buffer.readInt16BE(byte + 2)
    byte += offset
  }
  callback(null, measures)
})

export const updateQueue = util.promisify((start, buffer, offset, queue, callback) => {
  let byte = start
  for (let i = 0; i < queue.length; i++) {
    queue[i].card = buffer.readInt16BE(byte + 0)
    queue[i].stall = buffer.readInt16BE(byte + 2)
    byte += offset
  }
  callback(null, queue)
})

export async function updateData (buffer, s7def, s7obj) {
  // Handling multiple asynchronous results in parallel
  await Promise.all([
    updateBits(s7def.DB_DATA_INIT_MB, buffer, s7obj.merkers),
    updateBits(s7def.DB_DATA_INIT_EB, buffer, s7obj.inputs),
    updateBits(s7def.DB_DATA_INIT_AB, buffer, s7obj.outputs),
    updateDevices(s7def.DB_DATA_INIT_DEVICE, buffer, 16, s7obj.devices),
    updateMeasures(s7def.DB_DATA_INIT_POS, buffer, 4, s7obj.measures),
    updateQueue(s7def.DB_DATA_INIT_QUEUE, buffer, 4, s7obj.exitQueue)
  ])
}

export const updateStalls = util.promisify((start, buffer, offset, stalls, callback) => {
  let byte = 0
  const min = 0
  const max = buffer.length / offset
  for (let i = min; i < max; i++) {
    stalls[i].status = buffer.readInt16BE(byte)
    stalls[i].date = moment(plcDateTime(buffer.readInt16BE(byte + 2), buffer.readInt32BE(byte + 4))).format('YYYY-MM-DD HH:mm:ss')
    stalls[i].size = buffer.readInt16BE(byte + 8)
    byte += offset
  }
  callback(null, stalls)
})

export const updateStatistics = (stalls, statistics, stallStatus) => {
  statistics.forEach((item, key) => {
    mapCount(stalls, item, key, stallStatus)
  })
  // return statistics
}
