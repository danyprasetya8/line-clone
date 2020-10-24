const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSession = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  token: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('UserSession', userSession)