require('dotenv').config()
module.exports = {
  port: process.env.PORT || 8081,
  db: {
    database: process.env.DB_NAME || 'christmaswishlist',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASS,
    options: {
      dialect: process.env.DIALECT || 'mysql',
      host: process.env.HOST || 'localhost'
    }
  },
  authentication: {
    jwtSecret: process.env.JWT_SECRET || 'secret',
    walmartApi: process.env.WALMART_APIKEY
  }
}
