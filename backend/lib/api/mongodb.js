const MongoClient = require('mongodb').MongoClient
const assert = require('assert')
const bcrypt = require('bcrypt')
import crypto from 'crypto'
import fs from 'fs'
import jwt from 'jsonwebtoken'
import path from 'path'

const SALT_WORK_FACTOR = 10
const MAX_LOGIN_ATTEMPTS = 5
const LOCK_TIME = 1 * 60 * 60 * 1000
const reasons = {
  NOT_FOUND: 0,
  PASSWORD_INCORRECT: 1,
  MAX_ATTEMPTS: 2
}

// Connection URL
const url = 'mongodb://localhost:27017'

// Database Name
const dbName = 'sws'

// Create a new MongoClient
const client = new MongoClient(url, { useNewUrlParser: true })

export const getAuthenticated = function (username, password, cb) {
  // Use connect method to connect to the Server
  client.connect(function (err) {
    assert.strictEqual(null, err)
    console.log('Connected successfully to server')

    const db = client.db(dbName)

    findUser(db, username, password, function (user) {
      
      if (!user) return cb(null, null, reasons.NOT_FOUND)
      // check if locked

      comparePassword(password, user.password, function (err, isMatch) {
        if (err) return cb(err)
        // check if the password was a match
        
        if (isMatch) {
          var cert = fs.readFileSync(path.join(__dirname, '/jwtRS256.key'))
          var token = jwt.sign({
            aps: user.aps,
            role: user.role,
            locale: user.locales[0],
            username: user.username,
            xsrfToken: crypto.createHash('md5').update(user.password).digest('hex')
          }, cert, {
            expiresIn: 24 * 60 * 60
          })
          return cb(null, { token: token, aps: user.aps })
        }
        return cb(null, null, reasons.PASSWORD_INCORRECT)
      })
      client.close()
    })
  })
}

const comparePassword = function (candidatePassword, password, cb) {
  bcrypt.compare(candidatePassword, password, (err, isMatch) => {
    if (err) return cb(err)
    cb(null, isMatch)
  })
}

const findUser = (db, username, password, callback) => {
  // Get the documents collection
  const collection = db.collection('users')
  // Find some documents
  collection.findOne({ username: username }, function (err, user) {
    assert.strictEqual(err, null)
    callback(user)
  })
}

// getAuthenticated('sotefin@muse', 'h0savP6L.', function (err, user, reason) {
//   if (err) console.log('err', err)
//   if (user) console.log('user', user)
//   if (reason) console.log('reason', reason)
// })
