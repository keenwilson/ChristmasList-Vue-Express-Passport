const { WishList } = require('../models')
const { User } = require('../models')

module.exports = {
  // Find all wish lists in the dayabase
  async userWishList (req, res) {
    try {
      console.log(req.params.user)
      const wishlist = await User.findAll({
        where: {
          userName: req.params.user
        },
        include: [WishList]
      })
      console.log(wishlist)
      res.send(wishlist)
    } catch (err) {
      res.status(500).send({
        error: 'An error has occured trying to fetch the wish lists'
      })
    }
  }
}
