const options = require('./swagger.config'),
      logger = require('./logger.config');

require('dotenv').config();

const { DB_URI, PORT, PRIVATE_KEY } = process.env;

const api = {
  port: PORT || 8081,
  jwtSecretKey: PRIVATE_KEY,
  dbUri: DB_URI,
  prefix: "/api",
  specs: "/docs",
}


module.exports = {options, logger, api};