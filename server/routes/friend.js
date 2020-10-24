const express = require('express')
const router = express.Router()
const Friend = require('../models/friend')
const User = require('../models/user')

router.get('/', async (req, res) => {
  try {
    const found = await User.findOne({ username: req.username })
    if (!found) {
      res.status(400).json({ msg: 'USER_NOT_EXIST' })
      return
    }

    res.status(200).json(found.friends)
  } catch (error) {
    res.status(404).json(error)
  }
})

router.post('/:friendUsername', async (req, res) => {
  try {
    const foundUser = await User.findOne({ username: req.username })

    /** FRIEND ALREADY EXIST */
    if (foundUser.friends.find(i => i.username === req.params.friendUsername)) {
      res.status(400).json({ msg: 'FRIEND_EXIST' })
      return
    }

    const foundFriendUser = await User.findOne({ username: req.params.friendUsername })
    const newFriend = new Friend({
      username: foundFriendUser.username,
      name: foundFriendUser.name,
      profileStatus: foundFriendUser.profileStatus
    })
    foundUser.friends.push(newFriend)
    foundUser.save()

    res.status(200).json({ msg: 'FRIEND_ADDED' })
  } catch (error) {
    res.status(404).json(error)
  }
})

module.exports = router