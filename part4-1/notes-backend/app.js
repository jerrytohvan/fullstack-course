const express = require('express');
require('express-async-errors');

const app = express();
const cors = require('cors');
const notesRouter = require('./controllers/notes');
const middleware = require('./utils/middleware');

app.use(cors());
app.use(express.json());
app.use(express.static('build'));

app.use(middleware.requestLogger);
app.use('/api/notes', notesRouter);
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
