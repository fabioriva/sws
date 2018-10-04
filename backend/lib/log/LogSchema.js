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
}, { collection: 'history' })

LogSchema.pre('save', function (next) {
  this.logged = this.date ? moment(this.date).format('YYYY-MM-DD HH:mm:ss') : moment().format('YYYY-MM-DD HH:mm:ss')
  next()
})

LogSchema.query.bySystem = function (system, cb) {
  return this.find({ system: system }, cb)
}

module.exports = mongoose.model('Log', LogSchema)
