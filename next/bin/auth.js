// const mongoose = require('mongoose')
const User = require('./User')
// const dev = process.env.NODE_ENV !== 'production'
// const options = {
//   autoIndex: dev,
//   useNewUrlParser: true
// }
// const mongodbUri = dev ? 'mongodb://localhost:27017/sws' : 'mongodb://webservice:h0savP6L.@localhost:27017/sws'

// mongoose.connect(mongodbUri, options)
// var db = mongoose.connection
// db.on('error', console.error.bind(console, 'connection error:'))
// db.once('open', function () {
//   console.log('connected to MongoDB')
// })

exports.login = function (username, password, fn) {
  if (arguments.length === 3) {
    // var options = {
    //   username: username
    // }
    // User.findOne(options, function (err, user) {
    //   if (err) return err
    //   if (!user) return fn(null, false, 'User not found.')
    //   user.comparePassword(password, function (err, isMatch) {
    //     if (err) throw err
    //     if (!isMatch) return fn(null, false, 'Password does not match.')
    //     fn(null, user.toObject())
    //   })
    // })
    User.getAuthenticated(username, password, function (err, user, reason) {
      if (err) throw err

      // login was successful if we have a user
      if (user) {
        // handle login success
        fn(null, user.toObject())
      }

      // otherwise we can determine why we failed
      var reasons = User.failedLogin
      switch (reason) {
        case reasons.NOT_FOUND:
        case reasons.PASSWORD_INCORRECT:
          // note: these cases are usually treated the same - don't tell
          // the user *why* the login failed, only that it did
          return fn(null, false, 'Wrong username or password.')
          // break
        case reasons.MAX_ATTEMPTS:
          // send email or otherwise notify user that account is
          // temporarily locked
          return fn(null, false, 'Max attempts reached.')
          // break
      }
    })
  }
}
