const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

require('dotenv').config();

const config = require('./config');
const logger = require('./logger');

const createDbConnection = async () => {
  return mongoose
    .connect(config.MONGODB_URI)
    .then((result) => {
      logger.info('connected to MongoDB');
      return result;
    })
    .catch((error) => {
      logger.error('error connecting to MongoDB:', error.message);
    });
};

module.exports = { createDbConnection };
