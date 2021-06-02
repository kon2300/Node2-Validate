require('dotenv').config();
module.exports = {
  "development": {
    "username": "root",
    "password": "kon",
    "database": "db_mysql",
    "host": "db",
    "dialect": "mysql",
    "timezone": "+09:00"
  },
  "test": {
    "username": process.env.DB_USERNAME,
    "password": process.env.DB_PASSWORD,
    "database": process.env.DB_DATABASE,
    "host": process.env.DB_HOST,
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}