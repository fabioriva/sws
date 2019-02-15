import url from 'url'
import uuid from 'uuid/v4'
import WebSocket from 'ws'

module.exports = function startServer (wsPath, server, eventEmitter, logger) {
  const wss = new WebSocket.Server({
    path: wsPath,
    server: server
  })
  wss.broadcast = function broadcast (channel, data) {
    wss.clients.forEach(function each (client) {
      if (client.readyState === WebSocket.OPEN && client.channel === channel) {
        client.send(data)
      }
    })
  }
  wss.on('connection', function connection (ws, req) {
    const client = req.headers['x-forwarded-for'].split(/\s*,\s*/)[0]
    const { query: { channel } } = url.parse(req.url, true)
    ws.isAlive = true
    ws.id = uuid()
    ws.channel = channel
    ws.on('pong', heartbeat)
    ws.on('message', function incoming (message) {
      eventEmitter.emit('ws-event', client, message)
      logger.info('%s websocket event %s', client, message)
    })
    logger.info('%s websocket connect %s', client, `uuid: ${ws.id} channel: ${ws.channel} clients: ${wss.clients.size}`)
  })
  setInterval(function ping () {
    wss.clients.forEach((ws) => {
      if (ws.isAlive === false) {
        return ws.terminate()
      }
      ws.isAlive = false
      ws.ping(noop)
    })
  }, 3000)
  return wss
}

function heartbeat () {
  this.isAlive = true
}

function noop () {}
