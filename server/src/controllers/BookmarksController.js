const {
  Bookmark,
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
      const bookmarks = await Bookmark.findAll({
        where: where,
        include: [
          {
            model: WishList
          }
        ]
      })
        .map(bookmark => bookmark.toJSON())
        .map(bookmark => _.extend(
          {},
          bookmark.WishList,
          bookmark))
      res.send(bookmarks)
    } catch (err) {
      res.status(500).send({
        error: 'An error has occured trying to fetch the bookmark for a particular item'
      })
    }
  },
  async post (req, res) {
    try {
      // req.user.id comes in from a jwt token that is proved to be valid
      const userId = req.user.id
      const { wishlistId } = req.body
      // Check if it is already in the database
      const bookmark = await Bookmark.findOne({
        where: {
          WishListId: wishlistId,
          UserId: userId
        }
      })
      // Send 400 error if the wish list item is already exists
      if (bookmark) {
        return res.status(400).send({
          error: 'you already have this set as the Christmas bookmark'
        })
      }
      // Otherwise, create a new booknmark
      const newBookmark = await Bookmark.create({
        WishListId: wishlistId,
        UserId: userId
      })
      res.send(newBookmark)
    } catch (err) {
      console.log(err)
      res.status(500).send({
        error: 'An error has occured trying to create the Christmas bookmark'
      })
    }
  },
  async delete (req, res) {
    try {
      const userId = req.user.id
      // Find the bookmark by Id, destroy it
      const { bookmarkId } = req.params
      const bookmark = await Bookmark.findOne({
        where: {
          id: bookmarkId,
          UserId: userId
        }
      })
      if (!bookmark) {
        return res.status(403).send({
          error: 'you do not have access to this Christmas bookmark'
        })
      }
      await bookmark.destroy()
      // and send the Christmas list item that was destroyed back to the user
      // if it is successful
      res.send(bookmark)
    } catch (err) {
      res.status(500).send({
        error: 'An error has occured trying to delete the Christmas bookmark'
      })
    }
  }
}
