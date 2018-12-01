import Api from '@/services/Api'

export default {
  index (savedItem) {
    return Api().get('savedItems', {
      params: savedItem
    })
  },
  post (savedItem) {
    return Api().post('savedItems', savedItem)
  },
  delete (savedItemId) {
    return Api().delete(`savedItems/${savedItemId}`)
  }
}
