const mongoose = require('mongoose')
const Schema = mongoose.Schema
Schema.Types.String.checkRequired(v => v != null)

const friend = new Schema({
  username: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  profileStatus: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('Friend', friend)