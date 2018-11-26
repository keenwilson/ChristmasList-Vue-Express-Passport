const passport = require('passport')
const { User } = require('./models')

const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt

const config = require('./config/config')

passport.use(
  new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.authentication.jwtSecret
  }, async function (jwtPayload, done) {
    try {
      // check that the user exists in the database
      const user = await User.findOne({
        where: {
          id: jwtPayload.id
        }
      })
      // It the user doesn't exist, return an error
      if (!user) {
        return done(new Error(), false)
      }
      // Pass in user here and our custom callback authentication logic will set req.user for us
      return done(null, user)
    } catch (err) {
      return done(new Error(), false)
    }
  })
)

module.exports = null
