import micro, { send, json } from 'micro'
import fetch from 'isomorphic-unfetch'
import moment from 'moment'
// import url from 'url'
import { URL } from 'url'
import { series } from 'async'
import {
  getAlarms,

  dailyOperations,
  weeklyOperations,
  monthlyOperations,
  yearlyOperations
} from './statistics'
import {
  updateData,
  updateMap
} from './utils'

const cors = require('micro-cors')({ origin: '*' })

module.exports = function startServer (diagnostic, history, s7def, s7obj) {
  const handler = async (req, res) => {
    if (!('authorization' in req.headers)) {
      return send(res, 401, { success: false, message: 'Authorization header missing' })
    }

    const auth = await req.headers.authorization
    const url = 'http://localhost:3001/api/profile.js'
    try {
      const { token } = JSON.parse(auth)
      const response = await fetch(url, {
        credentials: 'include',
        headers: {
          Authorization: JSON.stringify({ token })
        }
      })
      if (response.ok) {
        const myURL = new URL(req.url, 'https://www.sotefinservice.com/')
        const page = myURL.pathname.split('/').pop()
        const query = myURL.searchParams // .get('dateString')
        console.log(page, query)
        // const parsedUrl = url.parse(req.url, true)
        // const { pathname, query } = parsedUrl
        // const page = pathname.split('/').pop()

        switch (page) {
          case 'alarms': {
            const { dateString } = query
            const date = moment(dateString) // query.date)
            const yearEnd = date.clone().subtract(1, 'months').endOf('month').format('YYYY-MM-DD HH:mm')
            const yearStart = moment(yearEnd).clone().subtract(1, 'years').startOf('month').format('YYYY-MM-DD HH:mm')
            const tasks = []
            for (let i = 0; i < s7obj.overview.devices.length; i++) {
              tasks.push(
                function (cb) {
                  getAlarms(yearStart, yearEnd, (i + 1), history, function (err, result) {
                    if (err) cb(err)
                    cb(null, result)
                  })
                }
              )
            }
            series(tasks, function (err, results) {
              if (err) return send(res, 500, `/alarms: Error ${err}`)
              send(res, 200, {
                diag: s7obj.diag,
                stat: results
              })
            })
            break
          }
          // return s7obj.diag

          // getAlarms(yearStart, yearEnd, 1, history, function (err, result) {
          //   if (err) return send(res, 500, `/alarms: Error ${err}`)
          //   console.log('(2)', result)
          //   send(res, 200, {
          //     diag: s7obj.diag,
          //     stat: result
          //   })
          // })
          // send(res, 200, s7obj.diag)
          // break
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
      } else {
        const error = new Error(response.statusText)
        error.response = response
        throw error
      }
    } catch (error) {
      const { response } = error
      return response
        ? res.status(response.status).json({ message: response.statusText })
        : res.status(400).json({ message: error.message })
    }
  }
  const server = micro(cors(handler))
  return server
}

function getStatistics (query, history, callback) {
  // const { dateString } = query
  const dateString = query.get('dateString')
  const date = moment(dateString) // query.date)
  console.log(dateString, date)
  const day = date.format('YYYY-MM-DD HH:mm')
  const weekStart = date.clone().subtract(1, 'weeks').startOf('week').format('YYYY-MM-DD HH:mm')
  const weekEnd = date.clone().subtract(1, 'weeks').endOf('week').format('YYYY-MM-DD HH:mm')
  const monthStart = date.clone().subtract(1, 'months').startOf('month').format('YYYY-MM-DD HH:mm')
  const monthEnd = date.clone().subtract(1, 'months').endOf('month').format('YYYY-MM-DD HH:mm')
  // const yearStart = date.clone().subtract(1, 'years').startOf('year').format('YYYY-MM-DD HH:mm')
  // const yearEnd = date.clone().subtract(1, 'years').endOf('year').format('YYYY-MM-DD HH:mm')
  const yearEnd = date.clone().subtract(1, 'months').endOf('month').format('YYYY-MM-DD HH:mm')
  const yearStart = moment(yearEnd).clone().subtract(1, 'years').startOf('month').format('YYYY-MM-DD HH:mm')
  console.log(day)
  console.log(weekStart, weekEnd)
  console.log(monthStart, monthEnd)
  console.log(yearStart, yearEnd)
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
  // const { id } = query
  const id = query.get('id')
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
  // const { dateFrom, dateTo, filter, device, number } = query
  const dateFrom = query.get('dateFrom')
  const dateTo = query.get('dateTo')
  const filter = query.get('filter')
  const device = query.get('device')
  const number = query.get('number')
  const from = dateFrom || moment().hours(0).minutes(0).seconds(0) // moment().subtract(1, 'days')
  const to = dateTo || moment().hours(23).minutes(59).seconds(59)
  const queryFilter = {
    date: {
      $gte: from,
      $lt: to
    },
    'device.id': device === undefined ? { $ne: 0 } : device !== '0' ? { $eq: device } : { $gte: 0 },
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
