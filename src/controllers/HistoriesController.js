const {
  History,
  WishList
} = require('../models')

// Require lodash for mapping
const _ = require('lodash')

module.exports = {
  async index (req, res) {
    try {
      const userId = req.user.id
      const histories = await History.findAll({
        where: {
          UserId: userId
        },
        include: [
          {
            model: WishList
          }
        ],
        order: [
          ['createdAt', 'DESC']
        ]
      })
        .map(history => history.toJSON())
        .map(history => _.extend(
          {},
          history.WishList,
          history))
      res.send(_.uniqBy(histories, history => history.ItemId))
    } catch (err) {
      res.status(500).send({
        error: 'An error has occured trying to fetch the history'
      })
    }
  },
  async post (req, res) {
    try {
      const userId = req.user.id
      const { itemId } = req.body
      // Check if it is already in the database
      const history = await History.create({
        ItemId: itemId,
        UserId: userId
      })
      res.send(history)
    } catch (err) {
      console.log(err)
      res.status(500).send({
        error: 'An error has occured trying to create the history object'
      })
    }
  }
}
