import Api from '@/services/Api'

export default {
  // WishListService makes a get request to '/wishlists' endpoint
  index () {
    return Api().get('wishlists')
  },
  post (wishlist) {
    return Api().post('wishlists', wishlist)
  }
}
