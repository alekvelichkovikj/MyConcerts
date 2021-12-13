const jwt = require('express-jwt')
const jwtToken = require('jsonwebtoken')

const isAuthenticated = jwt({
  secret: process.env.JWT_SECRET,
  algorithms: ['HS256'],
  requestProperty: 'payload',
  getToken: getTokenFromHeaders,
})

function getTokenFromHeaders(req) {
  if (
    req.headers.authorization &&
    req.headers.authorization.split(' ')[0] === 'Bearer'
  ) {
    const token = req.headers.authorization.split(' ')[1]
    return token
  }
  return null
}

const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization

  if (authHeader) {
    const token = authHeader.split(' ')[1]

    jwtToken.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        return res.sendStatus(403)
      }

      req.user = user
      next()
    })
  } else {
    res.sendStatus(401)
  }
}

module.exports = {
  isAuthenticated,
  authenticateJWT,
}
