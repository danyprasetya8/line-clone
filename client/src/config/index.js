const BASE_API = 'http://localhost:3001'

export default {
  api: {
    user_login: BASE_API + '/users/login',
    users: BASE_API + '/users',
    user (username) {
      return BASE_API + `/users/${username}`
    },
    friends (username) {
      return this.user(username) + '/friends'
    },
    friendsWithId (username, friendUsername) {
      return this.friends(username) + `/${friendUsername}`
    }
  },
  page: {
    login: '/login',
    registration: '/registration',
    home: '/home',
    messages: '/messages',
    add_friends: '/add-friends'
  }
}