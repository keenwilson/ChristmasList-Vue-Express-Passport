const Promise = require('bluebird')
const bcrypt = Promise.promisifyAll(require('bcrypt-nodejs'))

// A hashPassword method to call user's password, hash it, and save it again
function hashPassword (user, options) {
    const SALT_FACTOR = 8
    console.log('hashPassword')

    if (!user.changed('password')) {
      return
    }

    return bcrypt
      .genSaltAsync(SALT_FACTOR)
      .then(salt => bcrypt.hashAsync(user.password, salt, null))
      .then(hash => {
          user.setDataValue('password', hash)
      })
}
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
      email: {
          type: DataTypes.STRING,
          unique: true
      },
      password: DataTypes.STRING
  }, {
    // Add hooks to run before creating, updating, or saving the object
    // which we call hashPassword
    hooks: {
     /*  beforeCreate: hashPassword,
      beforeUpdate: hashPassword, */
      beforeSave: hashPassword
    }
  })

  // Add protoype.comparePassword so that any user can call .comparePassword method as needed
  User.prototype.comparePassword = function (password) {
      return bcrypt.compareAsync(password, this.password)
  }

  return User
}