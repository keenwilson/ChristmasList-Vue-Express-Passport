const {
  SavedItem,
  WishList
} = require('../models')
const _ = require('lodash')

module.exports = {
  async index (req, res) {
    try {
      const userId = req.user.id
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
          savedItem.WishList,
          savedItem))
      res.send(savedItems)
    } catch (err) {
      res.status(500).send({
        error: 'An error has occured trying to fetch the savedItem for a particular item'
      })
    }
  },
  async post (req, res) {
    try {
      // req.user.id comes in from a jwt token that is proved to be valid
      const userId = req.user.id
      const { wishlistId } = req.body
      // Check if it is already in the database
      const savedItem = await SavedItem.findOne({
        where: {
          WishListId: wishlistId,
          UserId: userId
        }
      })
      // Send 400 error if the wish list item is already exists
      if (savedItem) {
        return res.status(400).send({
          error: 'you already have this set as the Christmas List saved item'
        })
      }
      // Otherwise, create a new booknmark
      const newSavedItem = await SavedItem.create({
        WishListId: wishlistId,
        UserId: userId
      })
      res.send(newSavedItem)
    } catch (err) {
      console.log(err)
      res.status(500).send({
        error: 'An error has occured trying to create the Christmas List saved item'
      })
    }
  },
  async delete (req, res) {
    try {
      const userId = req.user.id
      // Find the savedItem by Id, destroy it
      const { savedItemId } = req.params
      const savedItem = await SavedItem.findOne({
        where: {
          id: savedItemId,
          UserId: userId
        }
      })
      if (!savedItem) {
        return res.status(403).send({
          error: 'you do not have access to this saved item of the Christmas List'
        })
      }
      await savedItem.destroy()
      // and send the Christmas list item that was destroyed back to the user
      // if it is successful
      res.send(savedItem)
    } catch (err) {
      res.status(500).send({
        error: 'An error has occured trying to delete the Christmas List saved item'
      })
    }
  }
}
