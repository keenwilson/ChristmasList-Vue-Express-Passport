import Api from '@/services/Api'

export default {
  index (params) {
    return Api().get('profile', {
      params: params
    })
  },
  post (profile) {
    return Api().post('profile', profile)
  },
  show (userId) {
    return Api().get(`profile/${userId}`)
  },
  put (profile) {
    return Api().put(`profile/${profile.id}`, profile)
  }
}
