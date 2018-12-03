const fs = require('fs')
const path = require('path')
var basename = path.basename(module.filename)
const Sequelize = require('sequelize')
var env = process.env.NODE_ENV || 'development'
var config = require(__dirname + '/../config/config.json')[env]
var configLocal = require("../config/config")
var db = {}

if (config.use_env_variable) {
  var sequelize = new Sequelize(process.env[config.use_env_variable])
} else {
  var sequelize = new Sequelize(
    configLocal.db.database,
    configLocal.db.user,
    configLocal.db.password,
    configLocal.db.options
  )
  
}

sequelize.authenticate().then(function () {
  console.log('Database connected and authenticated!')
  return true
}).catch(function (err) {
  console.error('Failed to connect and authenticate', err)
  return false
})

fs.readdirSync(__dirname)
  .filter(function (file) {
    return (
      file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
    )
  })
  .forEach(function (file) {
    var model = sequelize.import(path.join(__dirname, file))
    db[model.name] = model
  })

Object.keys(db).forEach(function (modelName) {
  // For each model, check if it has 'associate' method
  if (db[modelName].associate) {
    // If it has, call db[modelName].associate() and pass the db object
    db[modelName].associate(db)
  }
})

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db
