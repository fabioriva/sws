const async = require('async')
const moment = require('moment')
const express = require('express')
const router = express.Router()
const History = require('lib/log/LogSchema')

router.get('/', function (req, res) {
  res
    .status(200)
    .set('Content-Type', 'text/html')
    .send('Sotefin Web Service MongoDB API')
})

router.get('/query', function (req, res) {
  var { system, dateFrom, dateTo, filter } = req.query
  console.log(system, typeof dateFrom, dateFrom, typeof dateTo, dateTo, typeof filter, filter)
  dateFrom = dateFrom ? moment(dateFrom) : moment().add(-1, 'days')
  dateTo = dateTo ? moment(dateTo) : moment()
  // console.log(from, to)
  var queryFilter = {
    system: system,
    date: {
      $gte: dateFrom ? moment(dateFrom) : moment().add(-1, 'days'),
      $lt: dateTo ? moment(dateTo) : moment()
    },
    operationId: filter === 'b' ? { $gte: 1, $lte: 2 } : { $ne: 0 }
  }
  async.series([
    function (callback) {
      History.countDocuments(queryFilter, function (err, count) {
        if (err) callback(err)
        callback(null, count)
      })
    },
    function (callback) {
      History.find(queryFilter).sort({ date: -1 }).lean().exec(function (err, query) {
      // LogSchema.find().or([{ system: 49 }, { system: 66 }]).sort({ date: -1 }).exec(function (err, query) {
        if (err) callback(err)
        callback(null, query)
      })
    }
  ],
  function (err, results) {
    if (err) res.status(404).send(err)
    res.status(200).json({
      count: results[0],
      dateFrom: dateFrom.format('YYYY-MM-DD HH:mm:ss'),
      dateTo: dateTo.format('YYYY-MM-DD HH:mm:ss'),
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
