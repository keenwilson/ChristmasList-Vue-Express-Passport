const { WishList } = require('../models')

module.exports = {
  // Find all wish lists in the dayabase
  async index (req, res) {
    try {
      // Set products to null so that we can assign it based on which path we take
      let wishlists = null
      const search = req.query.search
      // Check if search is set in a query string, do the search
      if (search) {
        // Find all the wishlist products which matches any of these cases
        wishlists = await WishList.findAll({
          where: {
            $or: [
              'itemName', 'price'
            ].map(key => ({
              // Create a giant array of objects
              [key]: {
                // Find anything
                $like: `%${search}%`
              }
            }))
          }
        })
      } else {
        wishlists = await WishList.findAll({
          limit: 10
        })
      }
      res.send(wishlists)
    } catch (err) {
      res.status(500).send({
        error: 'An error has occured trying to fetch the wishlist products'
      })
    }
  },
  async show (req, res) {
    try {
      const product = await WishList.findById(req.params.itemId)
      res.send(product)
    } catch (err) {
      res.status(500).send({
        error: 'An error has occured trying to show the product'
      })
    }
  },
  // A post method to create wish list
  async post (req, res) {
    try {
      console.log('wishlist controller receive req.body', req.body)
      const item = await WishList.create(req.body)
      res.send(item)
    } catch (err) {
      res.status(500).send({
        error: 'An error has occured trying to create the wish list'
      })
    }
  },
  async put (req, res) {
    try {
      console.log('server will put item id ' + req.params.itemId)
      await WishList.update(req.body, {
        where: {
          id: req.params.itemId
        }
      })
      // return the same item we uploaded
      res.send(req.body)
    } catch (err) {
      res.status(500).send({
        error: 'An error has occured trying to update the product'
      })
    }
  }
}
