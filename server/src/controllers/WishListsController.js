const { WishList } = require('../models')

module.exports = {
  // Find all wish lists in the dayabase
  async index (req, res) {
    try {
      const wishlists = await WishList.findAll({
        limit: 10
      })
      res.send(wishlists)
    } catch (err) {
      res.status(500).send({
        error: 'An error has occured trying to fetch the wish lists'
      })
    }
  },
  // A post method to create song
  async post (req, res) {
    try {
      console.log(req.body)
      const wishlist = await WishList.create(req.body)
      res.send(wishlist)
    } catch (err) {
      res.status(500).send({
        error: 'An error has occured trying to create the wish list'
      })
    }
  }
}
