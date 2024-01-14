const express = require('express');
require('express-async-errors');

const cors = require('cors');
const mongoose = require('mongoose');

const blogsRouter = require('./controllers/blogs');
const usersRouter = require('./controllers/users');
const loginRouter = require('./controllers/login');

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
app.use(middleware.tokenExtractor);
// EXAMPLE MIDDLEWARE APPLICATION ALL ROUTE: app.use(middleware.userExtractor);

app.use('/api/login', loginRouter);
app.use('/api/users', usersRouter);
// EXAMPLE MIDDLEWARE APPLICATION SPECIFIC ROUTE: app.use('/api/blogs', middleware.userExtractor, blogsRouter);
app.use('/api/blogs', blogsRouter);

if (process.env.NODE_ENV === 'test') {
  const testingRouter = require('./controllers/testing');
  app.use('/api/testing', testingRouter);
}

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
