const fs = require('fs')
const path = require('path')
const Sequelize = require('sequelize')
const config = require('../config/config')
const db = {}

const sequelize = new Sequelize(
  config.db.database,
  config.db.user,
  config.db.password,
  config.db.options
)

/* sequelize.authenticate().then(function() {
  console.log('Database connected and authenticated!');
  return true;
}).catch(function(err) {
  console.error('Failed to connect and authenticate', err);
  return false;
});
 */
fs
  .readdirSync(__dirname)
  .filter((file) => {
    return (file.indexOf('.') !== 0) && (file !== "index.js") && (file.slice(-3) === '.js');
  /* file !== 'index.js' */
  })
  .forEach((file) => {
    const model = sequelize.import(path.join(__dirname, file))
    console.log(model.name)
    db[model.name] = model
  })

  db.sequelize = sequelize
  db.Sequelize = Sequelize

module.exports = db