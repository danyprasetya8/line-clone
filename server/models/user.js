const mongoose = require('mongoose')
const Friend = require('../models/friend')
const Schema = mongoose.Schema
Schema.Types.String.checkRequired(v => v != null)

const user = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  profileStatus: {
    type: String,
    required: true
  },
  friends: {
    type: [Friend.Schema],
    required: true
  }
})

module.exports = mongoose.model('User', user)