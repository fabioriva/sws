import net from 'net'
import Log from './Log'
import winston from './winston'
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
    winston.log('error', '%s socket error %s', client, e)
  })
  socket.on('close', () => {
    winston.log('info', '%s socket close', client)
  })
  socket.on('end', () => {
    winston.log('info', '%s socket end', client)
  })
  socket.on('data', (data) => {
    const buffer = Buffer.alloc(LOG_LEN, data)
    winston.log('info', '%s %o', client, buffer)
    if (buffer.length === LOG_LEN) {
      const log = new Log(buffer)
      logEmitter.emit('data', log)
    }
  })
})
server.listen(PORT, HOST)
