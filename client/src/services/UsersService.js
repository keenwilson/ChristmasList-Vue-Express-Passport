import Api from '@/services/Api'

export default {
  // UsersService makes a get request to '/users' endpoint
  index () {
    return Api().get('users')
  },
  usersSavedItems (user) {
    return Api().get(`user/${user}`)
  },
  getUser (user) {
    return Api().get(`getUser/${user}`)
  }
}
