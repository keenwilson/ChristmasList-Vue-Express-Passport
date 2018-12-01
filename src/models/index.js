const fs = require('fs')
const path = require('path')
const Sequelize = require('sequelize')
const config = require('../config/config')
const db = {}

if (cprocess.env.JAWSDB_URL) {
  const sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
  const sequelize = new Sequelize(
    config.db.database,
    config.db.user,
    config.db.password,
    config.db.options
  )
}

sequelize.authenticate().then(function () {
  console.log('Database connected and authenticated!')
  return true
}).catch(function (err) {
  console.error('Failed to connect and authenticate', err)
  return false
})

fs
  .readdirSync(__dirname)
  .filter((file) => {
    return (file.indexOf('.') !== 0) && (file !== 'index.js') && (file.slice(-3) === '.js')
  /* file !== 'index.js' */
  })
  .forEach((file) => {
    const model = sequelize.import(path.join(__dirname, file))
    console.log(model.name)
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
