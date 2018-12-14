const moment = require('moment')
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
  logged: String,
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
}, {
  collection: 'history'
})

LogSchema.pre('save', function (next) {
  var s7log = this.$s7log
  var s7obj = this.$s7obj
  this.alarm.id = s7log.alarm
  this.alarm.info = s7log.alarm === 0 ? 'Ready' : s7obj.alarms[s7log.device - 1].find(a => a.id === s7log.alarm).info
  this.card = s7log.card
  this.date = s7log.date
  this.device.id = s7log.device
  this.device.name = s7log.device === 0 ? 'Operator' : s7obj.devices.find(d => d.id === s7log.device).name
  this.event = s7log.event
  this.logged = this.date ? moment(this.date).format('YYYY-MM-DD HH:mm:ss') : moment().format('YYYY-MM-DD HH:mm:ss')
  this.mode.id = s7log.mode
  this.mode.info = s7log.device === 0 ? '---' : s7obj.devices.find(d => d.id === s7log.device).mode.label
  this.operation.id = s7log.operation
  this.operation.info = s7obj.operations.find(o => o.id === s7log.operation).info
  this.size = s7log.size
  this.stall = s7log.stall
  this.system = s7log.system
  next()
})

// LogSchema.options.toObject = LogSchema.options.toObject || {}
LogSchema.options.toObject = {
  transform: function (doc, ret, options) {
    // ret.id = ret._id
    ret.alarm = doc.alarm.info
    ret.device = doc.device.name
    ret.mode = doc.mode.info
    ret.operation = doc.operation.info
    delete ret.date
    delete ret._id
    delete ret.__v
    return ret
  }
}

LogSchema.query.bySystem = function (system, cb) {
  return this.find({ system: system }, cb)
}

module.exports = LogSchema
