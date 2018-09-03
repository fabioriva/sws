// import mongoose from 'mongoose'
// import {
//   BASSANO,
//   BOSTON,
//   DONINI,
//   MUSE
// } from 'lib/ws/aps/def'
// import * as muse from 'lib/ws/aps/muse/strings'

const mongoose = require('mongoose')

const LogSchema = mongoose.Schema({
  alarm: {
    id: Number,
    info: String
  },
  card: Number,
  date: {
    type: Date,
    default: Date.now
  },
  device: {
    id: Number,
    name: String
  },
  event: Number,
  mode: {
    id: Number,
    info: String
  },
  operation: {
    id: Number,
    info: String
  },
  size: Number,
  stall: Number,
  system: Number
}, { collection: 'history' })

module.exports = mongoose.model('Log', LogSchema)

// LogSchema.pre('save', function (next) {
//   const log = this
//   switch (log.system) {
//     case BOSTON:
//     case MUSE:
//       log.alarm.info = returnAlarm(muse.alarms, log.alarm.id, log.device.id)
//       log.device.name = returnString(muse.devices, log.device.id)
//       log.mode.info = returnString(muse.modes, log.mode.id)
//       log.operation.info = log.alarm.id !== 0 ? returnAlarm(muse.alarms, log.alarm.id, log.device.id) : returnString(muse.operations, log.operation.id)
//       break
//     case BASSANO:
//     case DONINI:
//       log.device = returnString(muse.devices, log.deviceId)
//       log.mode = returnString(muse.modes, log.modeId)
//       log.operation = log.alarm !== 0 ? returnAlarm(muse.alarms, log.alarm, log.deviceId) : returnString(muse.operations, log.operationId)
//       break
//   }
//   next()
// })

// let LogModel = mongoose.model('Log', LogSchema)
// export default LogModel

// function returnString (a, index) {
//   return (index) < a.length ? a[index] : '---'
// }

// function returnAlarm (alarms, index, device) {
//   // console.log(alarms, index, device)
//   switch (device) {
//     case 1:
//     case 2:
//       return `${alarms[index - 1].label} ${alarms[index - 1].info}`
//     case 3:
//     case 4:
//       return returnString(alarms[index + 64].label, index)
//   }
// }
