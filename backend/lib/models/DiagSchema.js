const mongoose = require('mongoose')

const Schema = mongoose.Schema

const DiagSchema = Schema({
  alarmId: {
    type: Schema.Types.ObjectId,
    required: true
  },
  s7data: Buffer

}, { collection: 'diagnostic' })

module.exports = mongoose.model('Diag', DiagSchema)
