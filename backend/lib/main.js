import mongoose from 'mongoose'
import { logEmitter } from './log/logServer'
import LogSchema from './log/LogSchema'
import winston from './winston'
import * as aps from './aps/def'
import * as muse from './aps/muse'

const dev = process.env.NODE_ENV !== 'production'
const options = {
  autoIndex: dev,
  useNewUrlParser: true
}
const mongodbUri = dev ? process.env.MONGODB_URI : 'mongodb://webservice:h0savP6L.@localhost:27017/sws'
mongoose.connect(mongodbUri, options)
mongoose.Promise = global.Promise

const conn = mongoose.connection
conn.on('error', console.error.bind(console, 'connection error:'))
conn.once('open', () => {
  /**
   * Aps.
   */
  muse.createApplication()
  /**
   * Log.
   */
  logEmitter.on('close', (client) => {
    winston.log('info', '%s socket close', client)
  })
  logEmitter.on('end', (client) => {
    winston.log('info', '%s socket end', client)
  })
  logEmitter.on('error', (client, e) => {
    winston.log('error', '%s socket error %s', client, e)
  })
  logEmitter.on('data', (client, buffer, log) => {
    winston.log('info', '%s %o', client, buffer)
    const { system } = log
    switch (system) {
      case aps.BASSANO:
        break
      case aps.DONINI:
        break
      case aps.BOSTON:
      case aps.MUSE:
        // muse.appEmitter.emit('s7log', JSON.stringify(log))
        muse.s7log(log, (err, res) => {
          if (err) console.log(err)
          var document = new LogSchema(res)
          document.save((err, doc) => {
            if (err) throw err
            console.log('s7log', log)
            console.log('log', doc)
            winston.log('info', '%o', doc)
          })
        })
        break
    }
  })
})
