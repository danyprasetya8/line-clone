const User = require('../models/user')

const getUserRequestBody = async (req, res, next) => {
  const userByEmail = await User.findOne({ email: req.body.email })
  if (!userByEmail) {
    const userById = await User.findOne({ username: req.body.username })
    if (!userById) {
      return res.status(404).json({ msg: 'USER_NOT_EXIST' })
    }
    res.user = userById
    next()
    return
  }
  res.user = userByEmail
  next()
}

module.exports.getUserRequestBody = getUserRequestBody

const getUserRequestParam = async (req, res, next) => {
  const userByEmail = await User.findOne({ email: req.params.email })
  if (!userByEmail) {
    const userById = await User.findOne({ username: req.params.username })
    if (!userById) {
      return res.status(404).json({ msg: 'USER_NOT_EXIST' })
    }
    res.user = userById
    next()
    return
  }
  res.user = userByEmail
  next()
}

module.exports.getUserRequestParam = getUserRequestParam