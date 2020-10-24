import config from '../config'
import axios from 'axios'

export default {
  userLogin (form) {
    return axios.post(config.api.user_login, form)
  },
  userRegistration (form) {
    return axios.post(config.api.users, form)
  },
  getAllUsers () {
    return axios.get(config.api.users)
  },
  getUserByUsername (username) {
    return axios.get(config.api.user(username))
  }
}