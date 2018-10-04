const async = require('async')
const moment = require('moment')
const express = require('express')
const History = require('lib/log/LogSchema')

const router = express.Router()

router.get('/', function (req, res) {
  res
    .status(200)
    .set('Content-Type', 'text/html')
    .send('Sotefin Web Service MongoDB API')
})

router.get('/query', function (req, res) {
  var { system, dateFrom, dateTo, filter } = req.query
  console.log('Query Filters', system, typeof dateFrom, dateFrom, typeof dateTo, dateTo, typeof filter, filter)
  var from = dateFrom || moment().startOf('day') // moment().subtract(1, 'days')
  var to = dateTo || moment().endOf('day')
  var queryFilter = {
    // system: system,
    date: {
      $gte: from,
      $lt: to
    },
    operationId: filter === 'b' ? { $gte: 1, $lte: 2 } : { $ne: 0 }
  }
  console.log(queryFilter)
  async.series([
    function (callback) {
      History.countDocuments(queryFilter, function (err, count) {
        if (err) callback(err)
        callback(null, count)
      })
    },
    function (callback) {
      History.find(queryFilter).bySystem(system).sort({ date: -1 }).lean().exec(function (err, query) {
        if (err) callback(err)
        // query.map((o) => {
        //   o.date = moment(o.date).format('YYYY-MM-DD HH:mm:ss')
        //   // console.log(moment(o.date).format('YYYY-MM-DD HH:mm:ss'))
        // })
        // console.log(query)
        callback(null, query)
      })
    }
  ],
  function (err, results) {
    if (err) res.status(404).send(err)
    res.status(200).json({
      count: results[0],
      dateFrom: from, // moment(from).format('YYYY-MM-DD HH:mm:ss'),
      dateTo: to, // moment(to).format('YYYY-MM-DD HH:mm:ss'),
      query: results[1]
    })
  })
})
// alarms
// router.get('/query/alarms', function (req, res) {
//   // console.log(req.hostname, req.ip, req.url, req.originalUrl, req.query)
//   LogSchema.find({ alarm: { $ne: 0 } }, function (err, logs) {
//     if (err) res.status(404).send(err)
//     res.status(200).json(logs)
//   })
// })

module.exports = router
