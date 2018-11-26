// Script which populates our databases
const {
  sequelize,
  WishList,
  User,
  Bookmark,
  History
} = require('../src/models')

const Promise = require('bluebird')
const wishlists = require('./wishlists.json')
const users = require('./users.json')
const bookmarks = require('./bookmarks.json')
const histories = require('./histories.json')

sequelize.sync({force: true})
  .then(async function () {
    await Promise.all(
      users.map(user => {
        User.create(user)
      })
    )

    await Promise.all(
      wishlists.map(wishlist => {
        WishList.create(wishlist)
      })
    )

    await Promise.all(
      bookmarks.map(bookmark => {
        Bookmark.create(bookmark)
      })
    )

    await Promise.all(
      histories.map(history => {
        History.create(history)
      })
    )
   })
