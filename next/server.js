const express = require('express')
const httpProxy = require('http-proxy')
const bodyParser = require('body-parser')
const compression = require('compression')
// const cors = require('cors')
const next = require('next')
const port = parseInt(process.env.PORT, 10) || 8080
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

const aps = require('./routes/aps')

const proxy = httpProxy.createProxyServer()
const target = 'http://localhost:3001'

app.prepare().then(() => {
  const server = express()
  // Move the proxy stuff to the very front because of body parser
  server.all('/api/login.js', (req, res) => proxy.web(req, res, { target }, error => console.log('Error!', error)))
  server.all('/api/profile.js', (req, res) => proxy.web(req, res, { target }, error => console.log('Error!', error)))
  server.use(bodyParser.json())
  server.use(compression())
  // server.use(cors())
  // server.use('/', auth)
  aps('/bassano', server, app)
  aps('/longmatan', server, app)
  aps('/muse', server, app)
  aps('/nyu', server, app)
  // aps('/trumpeldor', server, app)
  server.get('*', (req, res) => {
    return handle(req, res)
  })
  server.listen(port, (err) => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})
