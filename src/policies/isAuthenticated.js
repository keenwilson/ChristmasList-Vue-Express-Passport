// Customized authentication logic to create a pure REST JSON API
const passport = require('passport')

module.exports = function (req, res, next) {
  passport.authenticate('jwt', function (err, user) {
    if (err || !user) {
      // If there is an error or if it is not true or undefined, send an error
      res.status(403).send({
        error: 'you do not have access to this resource'
      })
    } else {
      // User exists in the database
      // and the token they use are validated against our secret that was defined in a config file
      req.user = user
      // call nexxt
      next()
    }
  })(req, res, next)
}
