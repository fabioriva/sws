import micro, { send } from 'micro'
import moment from 'moment'
import { parse } from 'url'

module.exports = function startServer (history, s7obj) {
  const server = micro(async (req, res) => {
    const parsedUrl = parse(req.url, true)
    const { pathname, query } = parsedUrl
    const page = pathname.split('/').pop()
    // console.log(pathname, query, page)
    switch (page) {
      case 'alarms':
        return s7obj.diag
      case 'cards':
        return s7obj.cards
      case 'history':
        queryHistory(query, history, function (err, json) {
          if (err) return send(res, 500, 'Error query')
          // console.log('query', json)
          // return JSON.stringify(json)
          send(res, 200, json)
        })
        break
      case 'map':
        return s7obj.map
      case 'overview':
        return s7obj.overview
      case 'racks':
        return s7obj.racks
      default:
        send(res, 500, 'Page not found')
    }
  })
  return server
}

function queryHistory (query, history, callback) {
  const { dateFrom, dateTo, filter } = query
  const from = dateFrom || moment().hours(0).minutes(0).seconds(0) // moment().subtract(1, 'days')
  const to = dateTo || moment().hours(23).minutes(59).seconds(59)
  const queryFilter = {
    'date': {
      $gte: from,
      $lt: to
    },
    'operation.id': filter === 'b' ? { $gte: 1, $lte: 2 } : { $ne: 0 }
  }
  history.countDocuments(queryFilter, function (err, count) {
    if (err) return callback(err)
    history.find(queryFilter).sort({ date: -1 }).exec(function (err, query) {
      if (err) return callback(err)
      callback(null, {
        count: count,
        dateFrom: from, // moment(from).format('YYYY-MM-DD HH:mm:ss'),
        dateTo: to, // moment(to).format('YYYY-MM-DD HH:mm:ss'),
        query: query
      })
    })
  })
}