const express = require('express')
const router = express.Router()
const User = require('../models/users')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

router.get('/', async (req, res) => {
  try {
    const users = await User.find()
    res.status(200).json(users)
  } catch (error) {
    res.status(200).json(error)
  }
})

router.post('/', async (req, res) => {
  try {
    const isExistUser = await User.findOne({ username: req.body.username })
    console.log(req.body.username);
    console.log(isExistUser);
    if (isExistUser) {
      return res.status(401).json({ msg: 'USER_ALREADY_EXIST' })
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
      address: req.body.address
    })
    const newUser = await user.save()
    res.status(201).json(newUser)
  } catch (error) {
    res.status(400).send({ msg: error.message })
  }
})

const getUser = async (req, res, next) => {
  let userByEmail = await User.findOne({ email: req.body.username })
  if (!userByEmail) {
    let userById = await User.findOne({ id: req.body.username })
    if (!userById) {
      return res.status(404).json({ msg: 'USER_NOT_EXIST' })
    }
    res.user = userById
  }
  res.user = userByEmail
  next()
}

router.post('/login', getUser, async (req, res) => {
  try {
    if (await bcrypt.compare(req.body.password, res.user.password)) {
      return res.status(200).json({ msg: 'SIGNED_IN' }) 
    }
  
    res.status(401).json({ msg: 'WRONG_CREDENTIALS' })
  } catch (error) {
    res.status(500).json({ msg: error.message })
  }
})

module.exports = router
