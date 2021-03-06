const { json, send, createError, run } = require('micro')
const crypto = require('crypto')
const fs = require('fs')
const jwt = require('jsonwebtoken')
const path = require('path')
const User = require('./UserSchema')

const login = async (req, res) => {
  try {
    const { username, password } = await json(req)
    userCheck(username, password, function (err, user, info) {
      if (err) console.error(err)
      if (info) {
        console.log('/authentication', info)
        send(res, 401, { success: false, message: 'Authentication failed: ' + info })
      }
      if (user) {
        console.log('/authentication', user)
        var cert = fs.readFileSync(path.join(__dirname, '../../ssh-key/jwtRS256.key'))
        var token = jwt.sign({
          aps: user.aps,
          role: user.role,
          locale: user.locales[0],
          username: user.username,
          xsrfToken: crypto.createHash('md5').update(user.password).digest('hex')
        }, cert, {
          expiresIn: 24 * 60 * 60
        })
        send(res, 200, {
          success: true,
          message: 'User authenticated',
          token: token,
          aps: user.aps // used to select the aps after authentication
        })
      }
    })
  } catch (error) {
    throw createError(error.statusCode, error.statusText)
  }
}

module.exports = (req, res) => run(req, res, login)

function userCheck (username, password, fn) {
  if (arguments.length === 3) {
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
