const express = require('express')
const cors = require('cors')
const crypto = require('crypto')
const fs = require('fs')
const jwt = require('jsonwebtoken')
const path = require('path')
// const auth = require('../bin/auth.js')
const User = require('../bin/User')
// const {
//   ADMIN,
//   SERVICE,
//   VALET,
//   USER
// } = require('../bin/roles')

const router = express.Router()

// function createToken (bytes, done) {
//   crypto.randomBytes(bytes, function (err, buffer) {
//     var token = buffer.toString('hex')
//     done(err, token)
//   })
// }

// middleware that is specific to this router
// router.use(function timeLog (req, res, next) {
//   console.log('Time: ', Date.now())
//   createToken(20, function (err, token) {
//     if (err) throw err
//     console.log('token:', token)
//   })
//   next()
// })

function login (username, password, fn) {
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

// password
router.post('/password', function (req, res) {
  const { username, oldPassword, newPassword, confirmPassword } = req.body.values
  User.changePassword(username, oldPassword, newPassword, confirmPassword, function (err, user, reason) {
    // console.log(err, user, reason)
    if (err) throw err
    if (user) console.log('/password user', user)
    if (reason) console.log('/password reason', reason)
  })
})

// authentication
router.post('/authentication', cors(), (req, res) => {
  const { username, password } = req.body.values
  login(username, password, function (err, user, info) {
    if (err) console.error(err)
    if (info) {
      console.log('/authentication', info)
      res.status(401).json({
        success: false,
        message: 'Authentication failed: ' + info
      })
    }
    if (user) {
      console.log('/authentication', user)
      var cert = fs.readFileSync(path.join(__dirname, '../bin/jwtRS256.key'))
      var token = jwt.sign({
        aps: user.aps,
        role: user.role,
        locale: user.locales[0],
        username: user.username,
        xsrfToken: crypto.createHash('md5').update(user.password).digest('hex')
      }, cert, {
        expiresIn: 24 * 60 * 60
      })
      res.status(200).json({
        success: true,
        message: 'User authenticated',
        token: token,
        aps: user.aps // used to select the aps after authentication
      })
    }
  })
})

// authorization
router.post('/authorization', cors(), (req, res) => {
  const [apsPath] = req.body.pathname.substring(1).split('/') // remove first slash with substring
  if (req.hasOwnProperty('headers') && req.headers.hasOwnProperty('authorization')) {
    const token = req.headers['authorization']
    try {
      var cert = fs.readFileSync(path.join(__dirname, '../bin/jwtRS256.key'))
      var decoded = jwt.verify(token, cert)
      const { aps } = decoded
      console.log(decoded, aps, apsPath)
      if (aps === apsPath) {
        res.status(200).json(decoded)
      } else {
        res.status(401).json({
          success: false,
          message: 'Authorization not valid'
        })
      }
    } catch (err) {
      res.status(401).json({
        success: false,
        message: 'Token not valid'
      })
    }
  } else {
    res.status(401).json({
      success: false,
      message: 'Token not present'
    })
  }
})

// const ROLES = {
//   'admin': 0,
//   'service': 1,
//   'valet': 2,
//   'user': 3
// }

// const PAGES = {
//   'overview': VALET,
//   'history': SERVICE,
//   'cards': SERVICE,
//   'alarms': SERVICE,
//   'plc': SERVICE,
//   'map': VALET
// }

// const checkRole = (roles, role) => {
//   console.log('user roles', roles, 'current page', role)
//   return roles !== undefined && roles.find(e => e <= PAGES[role] || e === 'admin')
//   // return roles !== undefined && roles.find(e => ROLES[e] <= PAGES[role] || e === 'admin')
//   // return roles !== undefined && roles.find(e => ROLES[e] <= ROLES[role] || e === 'admin')
// }

// router.post('/authorization', cors(), (req, res) => {
//   // const pathname = req.body.pathname
//   // const role = 'service' // req.body.role
//   const [apsPath, apsPage] = req.body.pathname.substring(1).split('/') // remove first slash with substring
//   if (req.hasOwnProperty('headers') && req.headers.hasOwnProperty('authorization')) {
//     const token = req.headers['authorization']
//     try {
//       var cert = fs.readFileSync(path.join(__dirname, '../bin/jwtRS256.key'))
//       var decoded = jwt.verify(token, cert)
//       const { aps, role } = decoded
//       // console.log('authorization check', ((aps.find(e => e === apsPath || e === 'admin')) && checkRole(roles, apsPage)))
//       // if ((aps.find(e => e === apsPath || e === 'admin')) && checkRole(roles, apsPage)) {
//       console.log('user roles', aps, apsPath) //, 'current page', role, PAGES[apsPage])
//       if (aps === apsPath && role <= PAGES[apsPage]) {
//         res.status(200).json(decoded)
//       } else {
//         res.status(401).json({
//           success: false,
//           message: 'Authorization not valid'
//         })
//       }
//     } catch (err) {
//       res.status(401).json({
//         success: false,
//         message: 'Token not valid'
//       })
//     }
//   } else {
//     res.status(401).json({
//       success: false,
//       message: 'Token not present'
//     })
//   }
// })

module.exports = router
