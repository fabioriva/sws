const { send, createError, run, json } = require('micro')
const fs = require('fs')
const jwt = require('jsonwebtoken')
const path = require('path')

const profile = async (req, res) => {
  if (!('authorization' in req.headers)) {
    // throw createError(401, 'Authorization header missing')
    send(res, 401, { success: false, message: 'Authorization header missing' })
  }

  const auth = await req.headers.authorization
  const { token } = JSON.parse(auth)

  const { pathname } = await json(req)
  const [apsPath] = pathname.substring(1).split('/')

  console.log('(0)', auth, token, pathname, apsPath)

  try {
    const cert = fs.readFileSync(path.join(__dirname, '../../ssh-key/jwtRS256.key'))
    const decoded = jwt.verify(token, cert)
    const { aps } = decoded
    console.log('(1)', decoded)
    if (aps === apsPath) {
      send(res, 200, JSON.stringify(decoded))
    } else {
      // throw createError(401, { success: false, message: 'Token not valid' })
      send(res, 401, { success: false, message: 'Token not valid' })
    }
  } catch (error) {
    console.log(error)
    throw createError(401, error.statusText)
    // send(res, 401, { success: false, message: 'Token not present' })
  }
}
module.exports = (req, res) => run(req, res, profile)
