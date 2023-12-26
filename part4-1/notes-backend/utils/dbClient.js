const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

require('dotenv').config();

const config = require('./config');

const createDbConnection = async () => {
  return mongoose
    .connect(config.MONGODB_URI)
    .then((result) => {
      console.log('connected to MongoDB');
      return result;
    })
    .catch((error) => {
      console.log('error connecting to MongoDB:', error.message);
    });
};

module.exports = { createDbConnection };
