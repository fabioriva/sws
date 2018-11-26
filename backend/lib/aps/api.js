import moment from 'moment'
import async from 'async'
import http from 'http'
import url from 'url'

export default (history, s7obj) => {
  const logger = require('pino-http')()
  const server = http.createServer((req, res) => {
    logger(req, res)
    const pathname = url.parse(req.url).pathname
    let page = pathname.split('/').pop() // req.url.split('/').pop()
    // let json
    switch (page) {
      case 'alarms':
        res.setHeader('Access-Control-Allow-Origin', '*')
        res.setHeader('X-Powered-By', 'sws')
        res.writeHead(200, { 'Content-Type': 'text/json' })
        res.end(JSON.stringify(s7obj.diag))
        break
      case 'cards':
        res.setHeader('Access-Control-Allow-Origin', '*')
        res.setHeader('X-Powered-By', 'sws')
        res.writeHead(200, { 'Content-Type': 'text/json' })
        res.end(JSON.stringify(s7obj.cards))
        break
      case 'history':
        var query = url.parse(req.url, true).query
        getHistory(query, history, function (err, json) {
          if (err) throw err
          res.setHeader('Access-Control-Allow-Origin', '*')
          res.setHeader('X-Powered-By', 'sws')
          res.writeHead(200, { 'Content-Type': 'text/json' })
          res.end(JSON.stringify(json))
        })
        break
      case 'map':
        res.setHeader('Access-Control-Allow-Origin', '*')
        res.setHeader('X-Powered-By', 'sws')
        res.writeHead(200, { 'Content-Type': 'text/json' })
        res.end(JSON.stringify(s7obj.map))
        break
      case 'overview':
        res.setHeader('Access-Control-Allow-Origin', '*')
        res.setHeader('X-Powered-By', 'sws')
        res.writeHead(200, { 'Content-Type': 'text/json' })
        res.end(JSON.stringify(s7obj.overview))
        break
      case 'racks':
        res.setHeader('Access-Control-Allow-Origin', '*')
        res.setHeader('X-Powered-By', 'sws')
        res.writeHead(200, { 'Content-Type': 'text/json' })
        res.end(JSON.stringify(s7obj.racks))
        break
      default:
        res.setHeader('Access-Control-Allow-Origin', '*')
        res.setHeader('X-Powered-By', 'sws')
        res.writeHead(404, { 'Content-Type': 'text/html' })
        res.write(`
        <h2 style="color:red">Error 404: Not found</h2>
        <a href="https://www.sotefinservice.com">https://www.sotefinservice.com</a>
        `)
        res.end()
    }
  })
  return server
}

function getHistory (query, history, cb) {
  var { system, dateFrom, dateTo, filter } = query
  // console.log('Query Filters', system, typeof dateFrom, dateFrom, typeof dateTo, dateTo, typeof filter, filter)
  var from = dateFrom || moment().hours(0).minutes(0).seconds(0) // moment().subtract(1, 'days')
  var to = dateTo || moment().hours(23).minutes(59).seconds(59)
  var queryFilter = {
    'system': system,
    'date': {
      $gte: from,
      $lt: to
    },
    'operation.id': filter === 'b' ? { $gte: 1, $lte: 2 } : { $ne: 0 }
  }
  console.log(queryFilter)
  async.series([
    function (callback) {
      history.countDocuments(queryFilter, function (err, count) {
        if (err) callback(err)
        console.log('count is', count)
        callback(null, count)
      })
    },
    function (callback) {
      history.find(queryFilter).bySystem(system).sort({ date: -1 }).lean().exec(function (err, query) {
        if (err) callback(err)
        callback(null, query)
      })
    }
  ],
  function (err, results) {
    if (err) return cb(err)
    cb(null, {
      count: results[0],
      dateFrom: from, // moment(from).format('YYYY-MM-DD HH:mm:ss'),
      dateTo: to, // moment(to).format('YYYY-MM-DD HH:mm:ss'),
      query: results[1]
    })
  })
}
