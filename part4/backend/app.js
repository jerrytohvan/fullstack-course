const express = require('express');
require('express-async-errors');

const cors = require('cors');
const mongoose = require('mongoose');

const blogsRouter = require('./controllers/blogs');
const usersRouter = require('./controllers/users');

const middleware = require('./utils/middleware');
const config = require('./utils/config');
const logger = require('./utils/logger');

const app = express();
app.use(cors());
app.use(express.json());
// app.use(express.static("build"));

mongoose.set('strictQuery', false);

mongoose.connect(config.MONGODB_URI).then((result) => {
  logger.info('connected to MongoDB');
  return result;
});

app.use(middleware.requestLogger);
app.use('/api/users', usersRouter);
app.use('/api/blogs', blogsRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
