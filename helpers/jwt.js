const jwt = require('jsonwebtoken')


const SECRET = 'secret'
const signToken = (payload) => jwt.sign(payload, SECRET)
const verifyToken = (token) => jwt.verify(token, SECRET)

module.exports = {signToken, verifyToken}