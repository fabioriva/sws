import forever from 'async/forever'
import snap7 from 'node-snap7'
import util from 'util'
import {
  updateCards,
  updateData,
  updateStalls,
  updateStatistics
} from './utils.js'

const NS_PER_SEC = 1e9

function executionTime (event, diff) {
  console.log(`[${event}] => Benchmark ${(diff[0] * NS_PER_SEC + diff[1]) / 1e6} msec`)
}

const s7client = new snap7.S7Client()

const s7Error = (error, plc, logger) => {
  logger.error('%s s7 error %s', plc.ip, s7client.ErrorText(error))
  plc.isOnline = !s7client.Disconnect()
}

const connectTo = util.promisify((plc, callback) => {
  const { ip, rack, slot } = plc
  s7client.ConnectTo(ip, rack, slot, function (err) {
    if (err) callback(err)
    callback(err, true)
  })
})

const readArea = util.promisify((area, dbNumber, start, amount, wordLen, callback) => {
  s7client.ReadArea(area, dbNumber, start, amount, wordLen, function (err, s7data) {
    if (err) callback(err)
    callback(err, s7data)
  })
})

const writeArea = util.promisify((area, dbNumber, start, amount, wordLen, buffer, callback) => {
  s7client.WriteArea(area, dbNumber, start, amount, wordLen, buffer, function (err) {
    if (err) callback(err)
    callback(err, true)
  })
})

const sleep = ms => new Promise((resolve) => setTimeout(resolve, ms))

async function emitCards (eventEmitter, s7def, s7obj) {
  const buffer = await readArea(0x84, s7def.DB_CARDS, s7def.DB_CARDS_INIT, s7def.DB_CARDS_LEN, 0x02)
  const json = await updateCards(0, buffer, s7def.CARD_LEN, s7obj.cards)
  eventEmitter.emit('ch1', JSON.stringify({ cards: json }))
}

async function emitMap (eventEmitter, s7def, s7obj) {
  const buffer = await readArea(0x84, s7def.DB_MAP, s7def.DB_MAP_INIT, s7def.DB_MAP_LEN, 0x02)
  const stalls = await updateStalls(0, buffer, s7def.STALL_LEN, s7obj.stalls)
  updateStatistics(stalls, s7obj.map.statistics, s7def.StallStatus)
  eventEmitter.emit('ch1', JSON.stringify({ map: s7obj.map }))
}

async function emitData (eventEmitter, s7def, s7obj) {
  // const time = process.hrtime()
  const buffer = await readArea(0x84, s7def.DB_DATA, s7def.DB_DATA_INIT, s7def.DB_DATA_LEN, 0x02)
  updateData(buffer, s7def, s7obj).then(() => {
    // executionTime('emitData', process.hrtime(time))
    eventEmitter.emit('ch1', JSON.stringify({
      overview: s7obj.overview,
      racks: s7obj.racks
    }))
  })
}

export default async function startClient (s7def, s7obj, eventEmitter, logger) {
  const { PLC } = s7def
  connectTo(PLC).then((isOnline) => {
    // let time = process.hrtime()
    logger.warn(`PLC ${PLC.ip} is online ${isOnline}`)
    PLC.isOnline = isOnline
    emitCards(eventEmitter, s7def, s7obj).catch((error) => s7Error(error, PLC, logger))
    // executionTime('emitCards', process.hrtime(time))
    emitMap(eventEmitter, s7def, s7obj).catch((error) => s7Error(error, PLC, logger))
    // executionTime('emitMap', process.hrtime(time))
    forever((next) => {
      // time = process.hrtime()
      sleep(PLC.polling_time).then(() => {
        // executionTime('forever', process.hrtime(time))
        eventEmitter.emit('ch2', JSON.stringify({ comm: PLC }))
        if (PLC.isOnline) {
          emitData(eventEmitter, s7def, s7obj).catch((error) => s7Error(error, PLC, logger))
        } else {
          PLC.isOnline = s7client.Connect()
          if (PLC.isOnline) logger.warn(`PLC ${PLC.ip} is online`)
        }
        next()
      })
    })
    // plc update
    eventEmitter.on('plc-update', function (log) {
      const { device, operation } = log
      switch (operation) {
        case 1: // alarm in
        case 2: // alarm out
          ;
          break
        case 4: // edit card
          emitCards(eventEmitter, s7def, s7obj).catch((error) => s7Error(error, PLC, logger))
          break
        case 5: // in
        case 6: // out
        case 7: // shuffle in
        case 8: // shuffle out
        case 9: // reserve
          emitMap(eventEmitter, s7def, s7obj).catch((error) => s7Error(error, PLC, logger))
          break
      }
    })
    // plc diagnostic
    eventEmitter.on('plc-update-diagnostic', async function (id) {
      const results = await Promise.all([
        readArea(0x84, s7def.DB_DATA, s7def.DB_DATA_INIT, s7def.DB_DATA_LEN, 0x02),
        readArea(0x84, s7def.DB_MAP, s7def.DB_MAP_INIT, s7def.DB_MAP_LEN, 0x02)
      ])
      eventEmitter.emit('diagnostic', id, results[0], results[1])
    })
    // plc write
    eventEmitter.on('plc-write', function (area, dbNumber, start, amount, wordLen, buffer) {
      writeArea(area, dbNumber, start, amount, wordLen, buffer)
        .then(success => logger.info(`written ${success}`))
        .catch((error) => s7Error(error, PLC, logger))
    })
  }).catch((error) => {
    s7Error(error, PLC, logger)
  })
}
