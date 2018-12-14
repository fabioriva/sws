const mongoose = require('mongoose')

const Schema = mongoose.Schema

const DiagSchema = Schema({
  alarmId: {
    type: Schema.Types.ObjectId,
    required: true
  },
  s7data: Buffer,
  s7map: Buffer

}, { collection: 'diagnostic' })

module.exports = DiagSchema
