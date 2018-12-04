const { WishList,
        SavedItem,
        User
      } = require('../models')
      const _ = require('lodash')

module.exports = {
  // Find all wish lists in the database
  async userWishList (req, res) {
    try {
      const userId = req.user.id
      console.log(req.params.user)
      const wishlist = await User.findAll({
        where: {
          userName: req.params.user,
          UserId: userId
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
  },
  async index (req, res) {
    try {
      const usersList = await User.findAll({attributes: ['userName', 'id']})
      res.send(usersList)
    } catch (err) {
      res.status(500).send({
        error: `No users found...`
      })
    }
  },
  async getUser (req, res) {
    try {
      const userId = req.params.user
      console.log(`\n ${userId} \n`)
      const user = await User.findOne({
        where: {
          id: userId
        },
        attributes: ['userName', 'id']
      })
      res.send(user)
    } catch (err) {
      res.status(500).send({
        error: `User not found.`
      })
    }
  },
  async usersSavedItems (req, res) {
    try {
      const userId = req.params.user
      const { wishlistId } = req.query
      const where = {
        UserId: userId
      }
      if (wishlistId) {
        where.WishListId = wishlistId
      }
      const savedItems = await SavedItem.findAll({
        where: where,
        include: [
          {
            model: WishList
          }
        ]
      })
        .map(savedItem => savedItem.toJSON())
        .map(savedItem => _.extend(
          {},
          savedItem.WishList))
      res.send(savedItems)
    } catch (err) {
      res.status(500).send({
        error: 'An error has occured trying to fetch the savedItem for a particular item'
      })
    }
  }
}
