import config from '../config'
import axios from 'axios'

export default {
  getFriend (username) {
    return axios.get(config.api.friends(username))
  },
  addFriend (username, friendUsername) {
    return axios.post(config.api.friendsWithId(username, friendUsername))
  }
}