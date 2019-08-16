import micro, { send, json } from 'micro'
// import fetch from 'isomorphic-unfetch'
import moment from 'moment'
import url, { URL } from 'url'
import { series } from 'async'
import {
  dailyOperations,
  weeklyOperations,
  monthlyOperations,
  yearlyOperations
} from './statistics'
import {
  updateData,
  updateMap
} from './utils'

module.exports = function startServer (diagnostic, history, s7def, s7obj) {
  const server = micro(async (req, res) => {
    const parsedUrl = url.parse(req.url, true)
    const { pathname, query } = parsedUrl
    const page = pathname.split('/').pop()

    // const myURL = new URL(req.url, 'https://www.sotefinservice.com/')
    // const page = myURL.pathname.split('/').pop()
    // const query = myURL.searchParams // .get('dateString')

    // const { method, url } = req
    // console.log(method, url)

    // switch (method) {
    //   case 'GET':
    //     console.log('method is GET', parsedUrl.query)
    //     break
    //   case 'POST':
    //     const { query } = await json(req)
    //     console.log('method is POST', query)
    //     break
    //   default:
    //     console.log('hhhhh')
    // }

    // if (!('authorization' in req.headers)) {
    //   // throw createError(401, 'Authorization header missing')
    //   return send(res, 401, { success: false, message: 'Authorization header missing' })
    // }

    // const auth = await req.headers.authorization
    // const { token } = JSON.parse(auth)

    // const { query } = await json(req)
    // console.log('!!!!?', pathname, page, query)//, token !== undefined ? token : 'Authorization header missing')

    // const apiUrl = `localhost:3001/api/profile.js`
    // const response = await fetch(apiUrl, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Authorization': JSON.stringify({ token }) // 'Authorization': token
    //   },
    //   body: JSON.stringify({ pathname }) // body: JSON.stringify({ pathname: getUrl(ctx) })
    // })
    // const user = await response.json()
    // console.log('rrrrrrrrrrrrrrrrres', user)

    switch (page) {
      case 'alarms':
        return s7obj.diag
      case 'cards':
        return s7obj.cards
      case 'diagnostic':
        getDiagnostic(query, diagnostic, s7def, s7obj, function (err, s7obj) {
          if (err) return send(res, 500, `/diagnostic: Error ${err}`)
          const json = {
            overview: s7obj.overview,
            racks: s7obj.racks,
            map: s7obj.map
          }
          send(res, 200, json)
        })
        break
      case 'history':
        getHistory(query, history, function (err, json) {
          if (err) return send(res, 500, `/history: Error ${err}`)
          send(res, 200, json)
        })
        break
      case 'map':
        return s7obj.map
      case 'overview':
        return s7obj.overview
      case 'racks':
        return s7obj.racks
      case 'statistics':
        getStatistics(query, history, function (err, results) {
          if (err) return send(res, 500, `/statistics: Error ${err}`)
          send(res, 200, results)
        })
        break
      default:
        send(res, 500, 'Page not found')
    }
  })
  return server
}

function getStatistics (query, history, callback) {
  const { dateString } = query
  const date = moment(dateString) // query.date)
  const day = date.format('YYYY-MM-DD HH:mm')
  const weekStart = date.clone().subtract(1, 'weeks').startOf('week').format('YYYY-MM-DD HH:mm')
  const weekEnd = date.clone().subtract(1, 'weeks').endOf('week').format('YYYY-MM-DD HH:mm')
  const monthStart = date.clone().subtract(1, 'months').startOf('month').format('YYYY-MM-DD HH:mm')
  const monthEnd = date.clone().subtract(1, 'months').endOf('month').format('YYYY-MM-DD HH:mm')
  // const yearStart = date.clone().subtract(1, 'years').startOf('year').format('YYYY-MM-DD HH:mm')
  // const yearEnd = date.clone().subtract(1, 'years').endOf('year').format('YYYY-MM-DD HH:mm')
  const yearEnd = date.clone().subtract(1, 'months').endOf('month').format('YYYY-MM-DD HH:mm')
  const yearStart = moment(yearEnd).clone().subtract(1, 'years').startOf('month').format('YYYY-MM-DD HH:mm')
  // console.log(day)
  // console.log(weekStart, weekEnd)
  // console.log(monthStart, monthEnd)
  // console.log(yearStart, yearEnd)
  series([
    function (cb) {
      dailyOperations(day, history, function (err, result) {
        if (err) cb(err)
        cb(null, result)
      })
    },
    function (cb) {
      weeklyOperations(weekStart, weekEnd, history, function (err, result) {
        if (err) cb(err)
        cb(null, result)
      })
    },
    function (cb) {
      monthlyOperations(monthStart, monthEnd, history, function (err, result) {
        if (err) cb(err)
        cb(null, result)
      })
    },
    function (cb) {
      yearlyOperations(yearStart, yearEnd, history, function (err, result) {
        if (err) cb(err)
        cb(null, result)
      })
    }
  ],
  function (err, results) {
    if (err) return callback(err)
    // console.log('daily operations:\n', results[0])
    // console.log('weekly operations:\n', results[1])
    // console.log('monthly operations:\n', results[2])
    // console.log('yearly operations:\n', results[3])
    // console.log('Alarms:', results[1])
    callback(null, results)
  })
}

function getDiagnostic (query, diagnostic, s7def, s7obj, callback) {
  const { id } = query
  diagnostic.findOne({ alarmId: id }).exec(function (err, data) {
    if (err) return callback(err)
    if (!data) return callback(null, s7obj)
    series([
      function (cb) {
        updateData(data.s7data, s7def, s7obj, function (err, res) {
          if (err) cb(err)
          cb(null, res)
        })
      },
      function (cb) {
        updateMap(0, data.s7map, s7def, s7obj.stalls, s7obj.map.statistics, function (res) {
          cb(null, res)
        })
      }
    ],
    function (err, results) {
      if (err) return callback(err)
      // console.log('Diagnostic data:', results, s7obj)
      callback(null, s7obj)
    })
  })
}

function getHistory (query, history, callback) {
  const { dateFrom, dateTo, filter, device, number } = query
  console.log(query)
  const from = dateFrom || moment().hours(0).minutes(0).seconds(0) // moment().subtract(1, 'days')
  const to = dateTo || moment().hours(23).minutes(59).seconds(59)
  const queryFilter = {
    date: {
      $gte: from,
      $lt: to
    },
    'device.id': device === undefined ? { $ne: 0 } : device !== '0' ? { $eq: device } : { $ne: 0 },
    'operation.id': filter === 'b' ? { $gte: 1, $lte: 2 } : { $ne: 0 },
    card: filter === 'c' ? { $eq: number } : { $gte: 0 },
    stall: filter === 'd' ? { $eq: number } : { $gte: 0 },
    'alarm.id': filter === 'e' ? { $eq: number } : { $gte: 0 }
  }
  history.countDocuments(queryFilter, function (err, count) {
    if (err) return callback(err)
    history.find(queryFilter).sort({ date: -1 }).exec(function (err, data) {
      if (err) return callback(err)
      callback(null, {
        count: count,
        dateFrom: from, // moment(from).format('YYYY-MM-DD HH:mm:ss'),
        dateTo: to, // moment(to).format('YYYY-MM-DD HH:mm:ss'),
        query: data
      })
    })
  })
}
