module.exports = {
    port: process.env.PORT || 8081,
    db: {
      database: process.env.DB_NAME || 'tabtracker',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASS || 'mySuperSecretPassword',
      options: {
        dialect: process.env.DIALECT || 'sqlite',
        host: process.env.HOST || 'localhost',
        stroage: './tabtracker.sqlite'
      }
    },
    authentication: {
      jwtSecret: process.env.JWT_SECRET || 'secret'
    }
  }
  