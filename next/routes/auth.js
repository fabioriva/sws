const express = require('express')
const cors = require('cors')
const crypto = require('crypto')
const fs = require('fs')
const jwt = require('jsonwebtoken')
const path = require('path')
const auth = require('../bin/auth.js')

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

// authentication
router.post('/authentication', cors(), (req, res) => {
  const { username, password } = req.body.values
  auth.login(username, password, function (err, user, info) {
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
        roles: user.roles,
        user: user.username,
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
const ROLES = {
  'admin': 0,
  'service': 1,
  'valet': 2,
  'user': 3
}

const PAGES = {
  'overview': ROLES.valet,
  'history': ROLES.service,
  'cards': ROLES.service,
  'alarms': ROLES.service,
  'plc': ROLES.service,
  'map': ROLES.valet
}

const checkRole = (roles, role) => {
  return roles !== undefined && roles.find(e => ROLES[e] <= PAGES[role] || e === 'admin')
  // return roles !== undefined && roles.find(e => ROLES[e] <= ROLES[role] || e === 'admin')
}

router.post('/authorization', cors(), (req, res) => {
  // const pathname = req.body.pathname
  // const role = 'service' // req.body.role
  const [apsPath, apsPage] = req.body.pathname.substring(1).split('/') // remove first slash with substring
  if (req.hasOwnProperty('headers') && req.headers.hasOwnProperty('authorization')) {
    const token = req.headers['authorization']
    try {
      var cert = fs.readFileSync(path.join(__dirname, '../bin/jwtRS256.key'))
      var decoded = jwt.verify(token, cert)
      const { aps, roles } = decoded
      // console.log('authorization check', ((aps.find(e => e === apsPath || e === 'admin')) && checkRole(roles, apsPage)))
      if ((aps.find(e => e === apsPath || e === 'admin')) && checkRole(roles, apsPage)) {
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

module.exports = router
