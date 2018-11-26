import Api from '@/services/Api'

export default {
  // WishListService makes a get request to '/wishlists' endpoint
  index () {
    return Api().get('wishlists')
  },
  show (wishlistId) {
    return Api().get(`wishlists/${wishlistId}`)
  },
  post (wishlist) {
    return Api().post('wishlists', wishlist)
  },
  put (wishlist) {
    return Api().put(`wishlists/${wishlist.id}`, wishlist)
  }
}
