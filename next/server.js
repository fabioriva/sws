const express = require('express')
const bodyParser = require('body-parser')
const compression = require('compression')
const cors = require('cors')
const mongoose = require('mongoose')
const next = require('next')
const port = parseInt(process.env.PORT, 10) || 8080
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
const auth = require('./routes/auth')

const options = {
  autoIndex: dev,
  useCreateIndex: true,
  useNewUrlParser: true
}
const mongodbUri = dev ? 'mongodb://localhost:27017/sws' : 'mongodb://localhost:27017/sws' // 'mongodb://webservice:h0savP6L.@localhost:27017/sws'

mongoose.connect(mongodbUri, options)
var db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function () {
  console.log('connected to MongoDB')
  app.prepare()
    .then(() => {
      const server = express()
      server.use(bodyParser.json())
      server.use(compression())
      server.use(cors())
      server.use('/', auth)
      server.get('*', (req, res) => {
        return handle(req, res)
      })
      server.listen(port, (err) => {
        if (err) throw err
        console.log(`> Ready on http://localhost:${port}`)
      })
    })
})

// function loggingMiddleware (req, res, next) {
//   console.log('ip:', req.ip)
//   next()
// }

// app.prepare()
//   .then(() => {
//     const server = express()
//     server.use(bodyParser.json())
//     server.use(cors())
//     // server.use(loggingMiddleware)
//     server.use('/', auth)
//     server.get('*', (req, res) => {
//       return handle(req, res)
//     })
//     server.listen(port, (err) => {
//       if (err) throw err
//       console.log(`> Ready on http://localhost:${port}`)
//     })
//   })
