const mongoose = require('mongoose')
const User = require('./User')
const dev = process.env.NODE_ENV !== 'production'
const mongodbUri = dev ? 'mongodb://localhost:27017/sws' : 'mongodb://webservice:h0savP6L.@localhost:27017/sws'
// const mongodbUri = 'mongodb://webservice:h0savP6L.@localhost:27017/sws'

mongoose.connect(mongodbUri)
var db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function () {
  console.log('connected to MongoDB')
  // var user = new User({
  //   email: 'valet@park1.com',
  //   name: { first: 'park1', last: 'one' },
  //   username: 'park1valet',
  //   password: '0987poiu.',
  //   roles: ['valet'],
  //   aps: ['muse']
  // })
  // var user = new User({
  //   email: 'gary.astrup@parkplusinc.com',
  //   name: { first: 'Gary', last: 'Astrup' },
  //   username: 'garyatmuse',
  //   password: 'Pplus*c5357',
  //   roles: ['service'],
  //   aps: ['muse']
  // })
  // var user = new User({
  //   email: 'philippe.besson@parkplusinc.com',
  //   name: { first: 'Philippe', last: 'Besson' },
  //   username: 'philippebesson',
  //   password: 'babouchka',
  //   roles: ['service'],
  //   aps: ['muse']
  // })
  // var user = new User({
  //   email: 'admin@sotefinservice.com',
  //   name: { first: 'Fabio', last: 'Riva' },
  //   username: 'swsadmin',
  //   password: 'h0savP6L.',
  //   roles: ['admin'],
  //   aps: ['demo', 'muse']
  // })
  // var user = new User({
  //   email: 'bassano@sotefinservice.com',
  //   name: { first: 'Fabio', last: 'Riva' },
  //   username: 'sotefin@bassano',
  //   password: 'h0savP6L.',
  //   roles: ['admin'],
  //   aps: ['bassano']
  // })
  var user = new User({
    email: 'nyu@sotefinservice.com',
    name: { first: 'Fabio', last: 'Riva' },
    username: 'sotefin@nyu',
    password: 'h0savP6L.',
    roles: ['admin'],
    aps: ['nyu']
  })
  user.save(function (err, user) {
    if (err) return console.error(err)
    console.log(user)

    // User.findOne({ username: 'demo' }, function (err, user) {
    //   if (err) throw err
    //   // test a matching password
    //   user.comparePassword('demo', function (err, isMatch) {
    //     if (err) throw err
    //     console.log('Password123:', isMatch) // -> Password123: true
    //   })
    // })

    // User.getAuthenticated('demo', 'demo', function (err, user, reason) {
    //   if (err) throw err

    //   // login was successful if we have a user
    //   if (user) {
    //     // handle login success
    //     console.log('success', user)
    //   }

    //   // otherwise we can determine why we failed
    //   var reasons = User.failedLogin
    //   switch (reason) {
    //     case reasons.NOT_FOUND:
    //     case reasons.PASSWORD_INCORRECT:
    //       // note: these cases are usually treated the same - don't tell
    //       // the user *why* the login failed, only that it did
    //       console.log('Wrong username or password.')
    //       break
    //     case reasons.MAX_ATTEMPTS:
    //       // send email or otherwise notify user that account is
    //       // temporarily locked
    //       console.log('Max attempts reached.')
    //       break
    //   }
    // })
  })
})
