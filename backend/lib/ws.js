import url from 'url'
import uuid from 'uuid/v4'
import WebSocket from 'ws'

module.exports = function startServer (wsPath, server, eventEmitter) {
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
    // const ip = req.headers['x-forwarded-for'].split(/\s*,\s*/)[0]
    const { query: { channel } } = url.parse(req.url, true)
    ws.isAlive = true
    ws.id = uuid()
    ws.channel = channel
    ws.on('pong', heartbeat)
    ws.on('message', function incoming (message) {
      // const { event, data } = JSON.parse(message)
      // eventEmitter.emit('logger', message, event, data)
      // handleEvent(event, data, eventEmitter)
      eventEmitter.emit('event', message)
    })
    // eventEmitter.emit('logger', `${ip}, ${ws.id}, ${ws.channel}, ${wss.clients.size}`)
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
  return wss.broadcast
}

function heartbeat () {
  this.isAlive = true
}

function noop () {}

// function handleEvent (event, data, s7Emitter) {
//   switch (event) {
//     case 'edit-stall':
//       const { stall, card } = data
//       const buffer = Buffer.alloc(4)
//       buffer.writeUInt16BE(stall, 0)
//       buffer.writeUInt16BE(card, 2)
//       s7Emitter.emit(event, buffer)
//       // if (s7plc.editStall(buffer)) console.log('done')
//       break
//     case 'overview-operation':
//       const { operation, value } = data
//       let s = s7obj.stalls.find(s => s.status === value)
//       switch (operation) {
//         case 1: // Entry 1
//           break
//         case 2: // Entry 2
//           break
//         default:
//           if (s) {
//             const buffer = Buffer.alloc(2)
//             buffer.writeUInt16BE(value, 0)
//             s7Emitter.emit(event, buffer)
//             // if (s7plc.requestOp(buffer)) console.log('done')
//           } else {
//             // error not found
//             console.log('overview-operation', 'card not found')
//           }
//       }
//       break
//   }
// }
