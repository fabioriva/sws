const fs = require('fs')
const mongoose = require('mongoose')
const path = require('path')
const readline = require('readline')
const User = require('./User')
// const {
//   ADMIN,
//   SERVICE,
//   VALET,
//   USER
// } = require('../src/constants/roles')

const FILE = path.resolve(__dirname, 'users.json')
const mongodbUri = 'mongodb://localhost:27017/sws'

const ADMIN = 0
const SERVICE = 1
const VALET = 2
const USER = 3

const options = {
  autoIndex: true,
  useCreateIndex: true,
  useNewUrlParser: true
}

mongoose.connect(mongodbUri, options)
var db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function () {
  (async () => {
    let json = {}
    let answer
    // username
    answer = await question('username? [username] ', 'username')
    console.log('answer:', answer)
    json.username = answer
    // password
    answer = await question('password? [password] ', 'password')
    console.log('answer:', answer)
    json.password = answer
    // aps
    answer = await question('aps? [aps] ', '')
    console.log('answer:', answer)
    json.aps = answer
    // role
    answer = await question('role? [0=ADMIN, 1=SERVICE, 2=VALET, 3=USER] ', ADMIN)
    console.log('answer:', answer)
    switch (parseInt(answer)) {
      case SERVICE:
        json.role = SERVICE
        break
      case VALET:
        json.role = VALET
        break
      case USER:
        json.role = USER
        break
      default:
        json.role = ADMIN
    }
    // role
    answer = await question('user locale? [0=en-US, 1=it-IT] ', 0)
    console.log('answer:', answer)
    switch (parseInt(answer)) {
      case 1:
        json.locales = ['it-IT']
        break
      default:
        json.locales = ['en-US']
    }

    console.log('user', json)
    answer = await question('confirm? [y]', 'y')
    if (answer === 'y') {
      let user = new User(json)
      user.save(function (err, user) {
        if (err) return console.error(err)
        console.log('saved')
        fs.appendFileSync(FILE, JSON.stringify(json))
        fs.appendFileSync(FILE, '\n\n')
        process.exit()
      })
    } else {
      console.log('not saved')
      process.exit()
    }
  })()
})

function question (question, defaultAnswer) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  })
  return new Promise((resolve, reject) => {
    rl.question(question, (answer) => {
      // Relinquished control over the input and output streams
      rl.close()
      if (answer.length === 0) {
        resolve(defaultAnswer)
      } else {
        resolve(answer)
      }
    })
  })
}
