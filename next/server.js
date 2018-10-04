const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const next = require('next')
const port = parseInt(process.env.PORT, 10) || 8080
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
const auth = require('./routes/auth')

function loggingMiddleware (req, res, next) {
  console.log('ip:', req.ip)
  next()
}

app.prepare()
  .then(() => {
    const server = express()
    server.use(bodyParser.json())
    server.use(cors())
    server.use(loggingMiddleware)
    server.use('/', auth)
    server.get('*', (req, res) => {
      return handle(req, res)
    })
    server.listen(port, (err) => {
      if (err) throw err
      console.log(`> Ready on http://localhost:${port}`)
    })
  })
