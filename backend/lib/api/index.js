const { send } = require('micro')
const mongoose = require('mongoose')
const login = require('./login')
const profile = require('./profile')

const mongodbUri = 'mongodb://localhost:27017/sws'

const db = connect(mongodbUri)

db.on('error', console.log)
db.on('connected', () => console.log(mongodbUri))
db.on('disconnected', () => connect(mongodbUri))
// db.once('open', listen)

function connect (uri) {
  const options = {
    autoIndex: process.env.NODE_ENV !== 'production',
    useCreateIndex: true,
    useNewUrlParser: true
  }
  mongoose.connect(uri, options)
  return mongoose.connection
}

const dev = async (req, res) => {
  switch (req.url) {
    case '/api/profile.js':
      await profile(req, res)
      break
    case '/api/login.js':
      await login(req, res)
      break

    default:
      send(res, 404, '404. Not found.')
      break
  }
}

module.exports = dev
