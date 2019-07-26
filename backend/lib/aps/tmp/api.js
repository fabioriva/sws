import moment from 'moment'
import async from 'async'
import http from 'http'
import path from 'path'
import url from 'url'
import fs from 'fs'
import XLSX from 'xlsx'
import {
  updateData,
  updateMap
} from './utils'
import pino from 'pino-http'

export default (diagnostic, history, s7def, s7obj) => {
  const logger = pino({
    prettyPrint: {
      colorize: true,
      translateTime: 'yyyy-mm-dd HH:MM:ss.l o'
    }
  })
  const server = http.createServer((req, res) => {
    logger(req, res)
    const pathname = url.parse(req.url).pathname
    let page = pathname.split('/').pop() // req.url.split('/').pop()
    let query = url.parse(req.url, true).query
    switch (page) {
      case 'alarms':
        response('text/json', 200, res).end(JSON.stringify(s7obj.diag))
        break
      case 'cards':
        response('text/json', 200, res).end(JSON.stringify(s7obj.cards))
        break
      case 'diagnostic':
        console.log('diagnostic', pathname, query)
        diagnostic.findOne({ alarmId: query.id }).exec(function (err, query) {
          if (err) response('text/json', 404, res).end('404')
          if (query) {
            async.series([
              function (cb) {
                updateData(query.s7data, s7def, s7obj, function (err, results) {
                  if (err) cb(err)
                  cb(null, results)
                })
              },
              function (cb) {
                updateMap(0, query.s7map, s7def, s7obj.stalls, s7obj.map.statistics, function (res) {
                  console.log('updateMap', res)
                  cb(null, res)
                })
              }
            ],
            function (err, results) {
              if (err) response('text/json', 404, res).end('404')
              response('text/json', 200, res).end(JSON.stringify({
                overview: s7obj.overview,
                racks: s7obj.racks,
                map: s7obj.map
              }))
            })
          } else {
            response('text/json', 200, res).end(JSON.stringify({
              overview: s7obj.overview,
              racks: s7obj.racks,
              map: s7obj.map
            }))
          }
        })
        break
      case 'download':
        queryHistory(query, history, function (err, json) {
          if (err) response('text/json', 404, res).end('404')
          const data = json.query.map(record => record.toObject()) // schema options toObject() transform
          /* make the worksheet */
          var ws = XLSX.utils.json_to_sheet(data)
          /* add to workbook */
          var wb = XLSX.utils.book_new()
          XLSX.utils.book_append_sheet(wb, ws, 'History')
          /* write workbook */
          // var buf = XLSX.write(wb, { bookType: 'xlsx', type: 'buffer' }) // generate a nodejs buffer
          // var str = XLSX.write(wb, { bookType: 'xlsx', type: 'binary' }) // generate a binary string in web browser
          // console.log(buf)
          /* generate an XLSX file */
          const FILE = path.resolve(__dirname, 'history.xlsx')
          XLSX.writeFile(wb, FILE)
          fs.readFile(FILE, function (err, data) {
            if (err) throw err
            res.setHeader('Content-disposition', 'attachment; filename=history.xlsx')
            res.end(data)
          })
        })
        break
      case 'history':
        queryHistory(query, history, function (err, json) {
          if (err) response('text/json', 404, res).end('404')
          response('text/json', 200, res).end(JSON.stringify(json))
        })
        break
      case 'map':
        response('text/json', 200, res).end(JSON.stringify(s7obj.map))
        break
      case 'overview':
        response('text/json', 200, res).end(JSON.stringify(s7obj.overview))
        break
      case 'racks':
        response('text/json', 200, res).end(JSON.stringify(s7obj.racks))
        break
      default:
        res.setHeader('Access-Control-Allow-Origin', '*')
        res.setHeader('X-Powered-By', 'sws')
        res.writeHead(404, { 'Content-Type': 'text/html' })
        res.write(`
        <h2 style='color:red'>Error 404: Not found</h2>
        <a href='https://www.sotefinservice.com'>https://www.sotefinservice.com</a>
        `)
        res.end()
    }
  })
  return server
}

function queryHistory (query, history, cb) {
  var { system, dateFrom, dateTo, filter } = query
  // console.log('Query Filters', system, typeof dateFrom, dateFrom, typeof dateTo, dateTo, typeof filter, filter)
  var from = dateFrom || moment().hours(0).minutes(0).seconds(0) // moment().subtract(1, 'days')
  var to = dateTo || moment().hours(23).minutes(59).seconds(59)
  var queryFilter = {
    // 'system': system,
    'date': {
      $gte: from,
      $lt: to
    },
    'operation.id': filter === 'b' ? { $gte: 1, $lte: 2 } : { $ne: 0 }
  }
  async.series([
    function (callback) {
      history.countDocuments(queryFilter, function (err, count) {
        if (err) return callback(err)
        callback(null, count)
      })
    },
    function (callback) {
      history.find(queryFilter).sort({ date: -1 }).exec(function (err, query) {
        if (err) return callback(err)
        callback(null, query)
      })
    }
  ],
  function (err, results) {
    if (err) return cb(err)
    // console.log('Query results: ', queryFilter, results)
    cb(null, {
      count: results[0],
      dateFrom: from, // moment(from).format('YYYY-MM-DD HH:mm:ss'),
      dateTo: to, // moment(to).format('YYYY-MM-DD HH:mm:ss'),
      query: results[1]
    })
  })
}

function response (contentType, status, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('X-Powered-By', 'sws')
  res.writeHead(status, { 'Content-Type': contentType })
  return res
}
