const express = require('express')
const router = express.Router()

const User = require('../models/user')
const UserSession = require('../models/user-session')

const userMiddleware = require('../middleware/user')

const friendRoutes = require('../routes/friend')

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const crpyto = require('crypto')

require('dotenv/config')

router.use('/:username/friends', (req, res , next) => {
  req.username = req.params.username
  next()
}, friendRoutes)

router.get('/', async (req, res) => {
  try {
    const users = await User.find()
    res.status(200).json(users)
  } catch (error) {
    res.status(400).json(error)
  }
})

router.get('/:username', async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username })
    const resUser = {
      username: user.username,
      name: user.name
    }
    res.status(200).json(resUser)
  } catch (error) {
    res.status(400).json({ msg: 'USER_NOT_EXIST' })
  }
})

router.post('/', async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    const user = new User({
      username: req.body.username,
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
      address: req.body.address,
      profileStatus: '',
    })
    const newUser = await user.save()
    res.status(201).json(newUser)
  } catch (error) {
    res.status(400).send({ msg: error.message })
  }
})

router.post('/login', userMiddleware.getUserRequestBody, async (req, res) => {
  try {
    if (await bcrypt.compare(req.body.password, res.user.password)) {
      // const accessToken = generateAccessToken(res.user)
      // const secretRefreshToken = crpyto.randomBytes(64).toString('hex')
      // const refreshToken = jwt.sign(res.user, secretRefreshToken)

      // const userSession = new UserSession({
      //   username: req.body.username,
      //   token: refreshToken
      // })
      // const newUserSession = await userSession.save()
      return res.status(200).json(res.user)
    }
  
    res.status(401).json({ msg: 'WRONG_CREDENTIALS' })
  } catch (error) {
    res.status(500).json({ msg: error.message })
  }
})

const generateAccessToken = user => {
  jwt.sign(user, proccess.env.ACCESS_TOKEN, { expiresIn: '10s' })
}

module.exports = router
