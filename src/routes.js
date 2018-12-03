// Use controller to declare all endpoints associated with that controller
const AuthenticationController = require('./controllers/AuthenticationController')
const AuthenticationControllerPolicy = require('./policies/AuthenticationControllerPolicy')
const WishListsController = require('./controllers/WishListsController')
const WalmartController = require('./controllers/Walmart_Controller')
const UserController = require('./controllers/UserController')
const SavedItemsController = require('./controllers/SavedItemsController')
const HistoriesController = require('./controllers/HistoriesController')
const isAuthenticated = require('./policies/isAuthenticated')

module.exports = (app) => {
  app.post('/register',
    AuthenticationControllerPolicy.register,
    AuthenticationController.register)
  // A login endpoint which calls the AuthenticationController.login method
  app.post('/login',
    AuthenticationController.login)

  app.get('/wishlists',
    WishListsController.index)
  app.get('/wishlists/:itemId',
    WishListsController.show)
  app.put('/wishlists/:itemId',
    WishListsController.put)
  app.post('/wishlists',
    WishListsController.post)

  app.post('/api/walmart/:search',
    WalmartController.search)
  app.post('/api/walmart/:id',
    WalmartController.update)

  app.get('/user/:user',
    UserController.usersSavedItems)
  app.get('/users',
    UserController.index)
  app.get('/getUser/:id',
    UserController.getUser)

  app.get('/saveditems',
    // To view these saved items, the user has to be logged in, has a jwt token that needs to be valid, and be connected to the property userId
    isAuthenticated,
    SavedItemsController.index)
  app.post('/saveditems',
    isAuthenticated,
    SavedItemsController.post)
  app.delete('/saveditems/:savedItemId',
    isAuthenticated,
    SavedItemsController.delete)

  app.get('/histories',
    isAuthenticated,
    HistoriesController.index)
  app.post('/histories',
    isAuthenticated,
    HistoriesController.post)
}
