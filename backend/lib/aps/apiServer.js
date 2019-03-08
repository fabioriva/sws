import micro, { send } from 'micro'
import moment from 'moment'
import { parse } from 'url'
import { series } from 'async'
import {
  updateData,
  updateMap
} from './utils'

module.exports = function startServer (diagnostic, history, s7def, s7obj) {
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
      case 'diagnostic':
        getDiagnostic(query, diagnostic, s7def, s7obj, function (err, s7obj) {
          if (err) return send(res, 500, '/diagnostic: Error query')
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
          if (err) return send(res, 500, '/history: Error query')
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
        // getAlarms(query, history, function (err, result) {
        //   if (err) return send(res, 500, `/statistics: Error aggregate: ${err}`)
        //   // send(res, 200, result)
        // })
        getOperations(query, history, function (err, result) {
          if (err) return send(res, 500, `/statistics: Error aggregate: ${err}`)
          const operations = result.map((e) => {
            return {
              name: `${e._id.year}-${e._id.month}-${e._id.day}`,
              entries: e.entries,
              exits: e.exits
            }
          })
          send(res, 200, operations)
        })
        break
      default:
        send(res, 500, 'Page not found')
    }
  })
  return server
}

function getAlarms (query, history, callback) {
  const { dateFrom, dateTo } = query
  history.aggregate([
    { $match: {
      $and: [ { 'date': { $gte: new Date(dateFrom), $lt: new Date(dateTo) } }, { 'operation.id': 1 } ] } },
    { $group: {
      // '_id': {
      //   'year': { '$year': '$date' },
      //   'month': { '$month': '$date' },
      //   'day': { '$dayOfMonth': '$date' }
      // },
      '_id': '$alarm.id',
      'total': { $sum: 1 }
    } },
    { $sort: { '_id': 1 } } // order by date ascending
  ], function (err, result) {
    console.log(err)
    if (err) return callback(err)
    console.log('Alarms Statistics:', result)
    callback(null, result)
  })
}

function getOperations (query, history, callback) {
  // const from = moment().subtract(1, 'months').startOf('month').hours(0).minutes(0).seconds(0).toDate() // transform to Date object for mongoose aggregate
  // const to = moment().subtract(1, 'months').endOf('month').hours(23).minutes(59).seconds(59).toDate() // transform to Date object for mongoose aggregate
  const { dateFrom, dateTo } = query
  // console.log(typeof dateFrom, dateFrom, typeof dateTo, dateTo)
  let from = new Date(dateFrom)
  let to = new Date(dateTo)
  // console.log(typeof from, from, typeof to, to)
  history.aggregate([
    // { $match: { $and: [ { 'date': { $gte: from, $lt: to } }, { $or: [ { 'operation.id': 5 }, { 'operation.id': 6 } ] } ] } },
    { $match: { 'date': { $gte: from, $lt: to } } },
    { $group: {
      '_id': {
        'year': { '$year': '$date' },
        'month': { '$month': '$date' },
        'day': { '$dayOfMonth': '$date' }
      },
      'total': { $sum: 1 },
      'entries': { $sum: { $cond: [ { $eq: ['$operation.id', 5] }, 1, 0 ] } },
      'exits': { $sum: { $cond: [ { $eq: ['$operation.id', 6] }, 1, 0 ] } }
    } },
    { $project: {
      // _id: 0,
      // name: { $concat: [ { $toString: '$_id.year' }, '-', { $toString: '$_id.month' }, '-', { $toString: '$_id.year' } ] },
      entries: '$entries',
      exits: '$exits'
    } },
    { $sort: { '_id': 1 } } // order by date ascending
  ], function (err, result) {
    console.log(err)
    if (err) return callback(err)
    // console.log('Statistics:', result)
    callback(null, result)
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
