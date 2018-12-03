import Api from '@/services/Api'

export default {
  // UsersService makes a get request to '/users' endpoint
  index () {
    return Api().get('api/users')
  },
  usersSavedItems (user) {
    return Api().get(`api/user/${user}`)
  },
  getUser (user) {
    return Api().get(`api/getUser/${user}`)
  }
}
