import moment from 'moment'

export const getAlarms = (query, history, callback) => {
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
    if (err) return callback(err)
    // console.log('Alarms Statistics:', result)
    const alarms = result.map((e) => {
      return {
        name: `Id ${e._id}`,
        total: e.total
      }
    })
    callback(null, alarms)
  })
}

export const getOperations = (query, history, callback) => {
  // const from = moment().subtract(1, 'months').startOf('month').hours(0).minutes(0).seconds(0).toDate() // transform to Date object for mongoose aggregate
  // const to = moment().subtract(1, 'months').endOf('month').hours(23).minutes(59).seconds(59).toDate() // transform to Date object for mongoose aggregate
  const { dateFrom, dateTo } = query
  // console.log(typeof dateFrom, dateFrom, typeof dateTo, dateTo)
  let from = new Date(dateFrom)
  let to = new Date(dateTo)
  // console.log(typeof from, from, typeof to, to)
  history.aggregate([
    { $match: { $and: [ { 'date': { $gte: from, $lt: to } }, { $or: [ { 'operation.id': 5 }, { 'operation.id': 6 } ] } ] } },
    // { $match: { 'date': { $gte: from, $lt: to } } },
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
    // { $project: {
    //   // _id: 0,
    //   // name: { $concat: [ { $toString: '$_id.year' }, '-', { $toString: '$_id.month' }, '-', { $toString: '$_id.year' } ] },
    //   entries: '$entries',
    //   exits: '$exits'
    // } },
    { $sort: { '_id': 1 } } // order by date ascending
  ], function (err, result) {
    if (err) return callback(err)
    // console.log('Statistics:', result)
    const operations = result.map((e) => {
      return {
        name: `${e._id.year}-${e._id.month}-${e._id.day}`,
        entries: e.entries,
        exits: e.exits,
        total: e.total
      }
    })
    callback(null, operations)
  })
}

export const dailyOperations = (day, history, callback) => {
  var start = moment(day).startOf('day').format('YYYY-MM-DD HH:mm')
  var end = moment(day).endOf('day').format('YYYY-MM-DD HH:mm')
  // console.log(typeof day, day)
  // console.log(start, end)
  history.aggregate([
    // { $match: { 'date': { $gte: new Date(dateFrom), $lt: new Date(dateTo) } } },
    { $match: {
      $and: [
        { 'date': { $gte: new Date(start), $lt: new Date(end) } },
        { $or: [ { 'operation.id': 5 }, { 'operation.id': 6 } ] }
      ] } },
    // { $project: {
    //   'y': { '$year': '$date' },
    //   'm': { '$month': '$date' },
    //   'd': { '$dayOfMonth': '$date' },
    //   'h': { '$hour': '$date' }
    // } },
    // { $group: {
    //   '_id': { 'year': '$y', 'month': '$m', 'day': '$d', 'hour': '$h' },
    //   'total': { $sum: 1 },
    //   'entries': { $sum: { $cond: [ { $eq: ['$operation.id', 5] }, 1, 0 ] } },
    //   'exits': { $sum: { $cond: [ { $eq: ['$operation.id', 6] }, 1, 0 ] } }
    // } }
    { $group: {
      '_id': {
        'year': { '$year': '$date' },
        'month': { '$month': '$date' },
        'day': { '$dayOfMonth': '$date' },
        'hour': { '$hour': '$date' }
      },
      'total': { $sum: 1 },
      'entries': { $sum: { $cond: [ { $eq: ['$operation.id', 5] }, 1, 0 ] } },
      'exits': { $sum: { $cond: [ { $eq: ['$operation.id', 6] }, 1, 0 ] } }
    } },
    { $sort: { '_id': 1 } } // order by date ascending
  ], function (err, result) {
    if (err) return callback(err)
    const statistics = result.map((e) => {
      return {
        name: `h ${e._id.hour}`,
        entries: e.entries,
        exits: e.exits,
        total: e.total
      }
    })
    const operations = {
      data: statistics,
      label: moment(day).startOf('day').format('YYYY-MM-DD'),
      title: 'Daily operations'
    }
    callback(null, operations)
  })
}

export const weeklyOperations = (start, end, history, callback) => {
  history.aggregate([
    { $match: {
      $and: [
        { 'date': { $gte: new Date(start), $lt: new Date(end) } },
        { $or: [ { 'operation.id': 5 }, { 'operation.id': 6 } ] }
      ] } },
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
    { $sort: { '_id': 1 } } // order by date ascending
  ], function (err, result) {
    if (err) return callback(err)
    const statistics = result.map((e) => {
      return {
        name: `${e._id.year}-${e._id.month}-${e._id.day}`,
        entries: e.entries,
        exits: e.exits,
        total: e.total
      }
    })
    const operations = {
      data: statistics,
      label: `From ${moment(start).startOf('day').format('YYYY-MM-DD')} To ${moment(end).startOf('day').format('YYYY-MM-DD')}`,
      title: 'Weekly operations'
    }
    callback(null, operations)
  })
}

export const monthlyOperations = (start, end, history, callback) => {
  history.aggregate([
    { $match: {
      $and: [
        { 'date': { $gte: new Date(start), $lt: new Date(end) } },
        { $or: [ { 'operation.id': 5 }, { 'operation.id': 6 } ] }
      ] } },
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
    { $sort: { '_id': 1 } } // order by date ascending
  ], function (err, result) {
    if (err) return callback(err)
    const statistics = result.map((e) => {
      return {
        name: `${e._id.year}-${e._id.month}-${e._id.day}`,
        entries: e.entries,
        exits: e.exits,
        total: e.total
      }
    })
    const operations = {
      data: statistics,
      label: `From ${moment(start).startOf('day').format('YYYY-MM-DD')} To ${moment(end).startOf('day').format('YYYY-MM-DD')}`,
      title: 'Monthly operations'
    }
    callback(null, operations)
  })
}

export const yearlyOperations = (start, end, history, callback) => {
  history.aggregate([
    { $match: {
      $and: [
        { 'date': { $gte: new Date(start), $lt: new Date(end) } },
        { $or: [ { 'operation.id': 5 }, { 'operation.id': 6 } ] }
      ] } },
    { $group: {
      '_id': {
        'year': { '$year': '$date' },
        'month': { '$month': '$date' }
      },
      'total': { $sum: 1 },
      'entries': { $sum: { $cond: [ { $eq: ['$operation.id', 5] }, 1, 0 ] } },
      'exits': { $sum: { $cond: [ { $eq: ['$operation.id', 6] }, 1, 0 ] } }
    } },
    { $sort: { '_id': 1 } } // order by date ascending
  ], function (err, result) {
    if (err) return callback(err)
    const statistics = result.map((e) => {
      return {
        name: `${e._id.year}-${e._id.month}`,
        entries: e.entries,
        exits: e.exits,
        total: e.total
      }
    })
    const operations = {
      data: statistics,
      label: `From ${moment(start).startOf('day').format('YYYY-MM-DD')} To ${moment(end).startOf('day').format('YYYY-MM-DD')}`,
      title: 'Yearly operations'
    }
    callback(null, operations)
  })
}
