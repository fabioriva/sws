import mongoose from 'mongoose'
import { logEmitter } from './log/logServer'
import LogSchema from './log/LogSchema'
import * as aps from './aps/def'
import * as bassano from './aps/bassano'
import * as muse from './aps/muse'
import * as nyu from './aps/nyu'

const dev = process.env.NODE_ENV !== 'production'
const options = {
  autoIndex: dev,
  useNewUrlParser: true
}
const mongodbUri = dev ? process.env.MONGODB_URI : 'mongodb://localhost:27017/sws' // 'mongodb://webservice:h0savP6L.@localhost:27017/sws'
mongoose.connect(mongodbUri, options)
mongoose.Promise = global.Promise

const conn = mongoose.connection
conn.on('error', console.error.bind(console, 'connection error:'))
conn.once('open', () => {
  /**
   * Aps.
   */
  bassano.createApplication()
  muse.createApplication()
  nyu.createApplication()
  /**
   * Log.
   */
  logEmitter.on('data', (log) => {
    const { system } = log
    switch (system) {
      case aps.BASSANO:
        bassano.s7log(log, (err, res) => {
          if (err) console.log(err)
          var document = new LogSchema(res)
          // var Log = mongoose.model('Log', LogSchema, 'bassano')
          // var document = new Log(res)
          document.save((err, doc) => {
            if (err) throw err
            console.log('log', doc)
          })
        })
        break
      case aps.BOSTON:
        break
      case aps.MUSE:
        muse.s7log(log, (err, res) => {
          if (err) console.log(err)
          var document = new LogSchema(res)
          document.save((err, doc) => {
            if (err) throw err
            console.log('log', doc)
          })
        })
        break
      case aps.NYU:
        nyu.s7log(log, (err, res) => {
          if (err) console.log(err)
          var document = new LogSchema(res)
          document.save((err, doc) => {
            if (err) throw err
            console.log('log', doc)
          })
        })
        break
    }
  })
})
