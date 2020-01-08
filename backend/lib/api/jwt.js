const fs = require('fs')
const path = require('path')
const jwt = require('jsonwebtoken')

const privateKey = fs.readFileSync(path.join(__dirname, '../../ssh-keys/sws.key'))
const publicKey = fs.readFileSync(path.join(__dirname, '../../ssh-keys/sws.key.pub'))

exports.sign = function (user) {
  const payload = {
    aps: user.aps,
    role: user.role,
    locale: user.locales[0],
    username: user.username
  }

  const token = jwt.sign(payload, privateKey, {
    algorithm: 'RS256',
    issuer: 'Sotefin SA',
    subject: user.username,
    audience: 'https://www.sotefinservice.com',
    expiresIn: 7 * 24 * 60 * 60 // 1 week
  })

  return token
}

exports.verifySync = function (token) {
  const decoded = jwt.verify(token, publicKey, { algorithms: ['RS256'] })
  return decoded
}

exports.verify = function (token, callback) {
  jwt.verify(token, publicKey, function (err, decoded) {
    if (err) return callback(err)
    callback(null, decoded)
  })
}
