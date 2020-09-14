const BASE_API = 'http://localhost:3001'

export default {
  api: {
    user_login: BASE_API + '/users/login',
    users: BASE_API + '/users'
  },
  page: {
    login: '/login',
    registration: '/registration',
    home: '/home',
    messages: '/messages',
    add_friends: '/add-friends'
  }
}