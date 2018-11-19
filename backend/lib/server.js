import cors from 'cors'
import express from 'express'
import mongoose from 'mongoose'
import history from './routes/history'
// import muse from './routes/muse'

const server = express()
const port = parseInt(process.env.PORT, 10) || 8049
const dev = process.env.NODE_ENV !== 'production'
const options = {
  autoIndex: dev,
  useNewUrlParser: true
}
const mongodbUri = dev ? process.env.MONGODB_URI : 'mongodb://localhost:27017/sws' // 'mongodb://webservice:h0savP6L.@localhost:27017/sws'

mongoose.connect(mongodbUri, options)
mongoose.Promise = global.Promise

function serverMiddleware (req, res, next) {
  console.log(`${Date.now()} > client: ${req.ip}, real ip: ${req.get('X-Real-IP')}`)
  res.setHeader('X-Powered-By', 'Sotefin Web Service')
  next()
}

const conn = mongoose.connection
conn.on('error', console.error.bind(console, 'connection error:'))
conn.once('open', function () {
  server.use(cors())
  server.use(serverMiddleware)
  server.use('/aps/history', history)
  // server.use('/aps/muse', muse)
  server.use(function (req, res) {
    res.status(404).send('<h2 style="color:red">Error 404: Not found</h2><a href="https://www.sotefinservice.com">https://www.sotefinservice.com</a>')
  })
  server.use(function (err, req, res, next) {
    console.error('500', err.stack)
    res.status(500).send('<h2 style="color:red">Error 500: Internal server error</h2><a href="https://www.sotefinservice.com">https://www.sotefinservice.com</a>')
  })
  server.listen(port, function (err) {
    if (err) throw err
    console.log(`> Sws backend ready on http://localhost:${port}`)
  })
})
