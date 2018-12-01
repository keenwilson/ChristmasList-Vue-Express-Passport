// Script which populates our databases
const {
  sequelize,
  WishList,
  User,
  SavedItem,
  History
} = require('../src/models')

const Promise = require('bluebird')
const wishlists = require('./wishlists.json')
const users = require('./users.json')
const savedItems = require('./saveditems.json')
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
      savedItems.map(savedItem => {
        SavedItem.create(savedItem)
      })
    )

    await Promise.all(
      histories.map(history => {
        History.create(history)
      })
    )
   })
