// Use controller to declare all endpoints associated with that controller
const AuthenticationController = require('./controllers/AuthenticationController')
const AuthenticationControllerPolicy = require('./policies/AuthenticationControllerPolicy')
const WishListsController = require('./controllers/WishListsController')
const WalmartController = require('./controllers/Walmart_Controller')
const UserController = require('./controllers/UserController')

module.exports = (app) => {
  app.post('/register',
    AuthenticationControllerPolicy.register,
    AuthenticationController.register)
  // A login endpoint which calls the AuthenticationController.login method
  app.post('/login',
    AuthenticationController.login)

  app.get('/wishlists',
    WishListsController.index)

  app.post('/wishlists',
    WishListsController.post)

  app.post('/api/walmart/:search',
    WalmartController.search)

  app.get('/user/:user',
    UserController.userWishList)
}
