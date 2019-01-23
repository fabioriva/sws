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
const aps = require('./routes/aps')
const auth = require('./routes/auth')

const options = {
  autoIndex: dev,
  useCreateIndex: true,
  useNewUrlParser: true
}
const mongodbUri = 'mongodb://localhost:27017/sws' // 'mongodb://webservice:h0savP6L.@localhost:27017/sws'

mongoose.connect(mongodbUri, options)
var db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function () {
  app.prepare().then(() => {
    const server = express()
    server.use(bodyParser.json())
    server.use(compression())
    server.use(cors())
    server.use('/', auth)
    aps('/bassano', server, app)
    aps('/muse', server, app)
    aps('/nyu', server, app)
    aps('/trumpeldor', server, app)
    server.get('*', (req, res) => {
      return handle(req, res)
    })
    server.listen(port, (err) => {
      if (err) throw err
      console.log(`> Ready on http://localhost:${port}`)
    })
  })
})
