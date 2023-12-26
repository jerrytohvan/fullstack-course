const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

require('dotenv').config();

const DATABASE_URL = process.env.DATABASE_URL;

const createDbConnection = async () => {
  return mongoose
    .connect(DATABASE_URL)
    .then((result) => {
      console.log('connected to MongoDB');
      return result;
    })
    .catch((error) => {
      console.log('error connecting to MongoDB:', error.message);
    });
};

module.exports = { createDbConnection };
