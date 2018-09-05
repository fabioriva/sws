import net from 'net'
import Log from './Log'
import { EventEmitter } from 'events'

class LogEmitter extends EventEmitter {}
export const logEmitter = new LogEmitter()

const dev = process.env.NODE_ENV !== 'production'
const HOST = dev ? process.env.BACKEND_URL : '192.168.20.2'
const PORT = 49000
const LOG_LEN = 32

const server = net.createServer((socket) => {
  let client = `${socket.remoteAddress}:${socket.remotePort}`
  socket.on('error', (e) => {
    logEmitter.emit('close', client, e)
  })
  socket.on('close', () => {
    logEmitter.emit('close', client)
  })
  socket.on('end', () => {
    logEmitter.emit('end', client)
  })
  socket.on('data', (data) => {
    const buffer = Buffer.alloc(LOG_LEN, data)
    if (buffer.length === LOG_LEN) {
      const log = new Log(buffer)
      logEmitter.emit('data', client, buffer, log)
    }
  })
})
server.listen(PORT, HOST)
