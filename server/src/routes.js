// Use controller to declare all endpoints associated with that controller
const AuthenticationController = require('./controllers/AuthenticationController')
const AuthenticationControllerPolicy = require('./policies/AuthenticationControllerPolicy')
const WishListsController = require('./controllers/WishListsController')
const WalmartController = require('./controllers/Walmart_Controller')
const UserController = require('./controllers/UserController')
const BookmarksController = require('./controllers/BookmarksController')
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
  app.get('/api/walmart/:id',
    WalmartController.update)
  
  app.get('/user/:user',
    UserController.userWishList)

  app.get('/bookmarks',
    // To view these bookmarks, the user has to be logged in, has a jwt token that needs to be valid, and be connected to the property userId
    isAuthenticated,
    BookmarksController.index)
  app.post('/bookmarks',
    isAuthenticated,
    BookmarksController.post)
  app.delete('/bookmarks/:bookmarkId',
    isAuthenticated,
    BookmarksController.delete)

  app.get('/histories',
    isAuthenticated,
    HistoriesController.index)
  app.post('/histories',
    isAuthenticated,
    HistoriesController.post)
}
