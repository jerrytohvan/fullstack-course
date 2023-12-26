const blogsRouter = require('express').Router();

const { createDbConnection } = require('../utils/dbClient');
const Blog = require('../models/blog');
const mongoose = require('mongoose');

blogsRouter.get('/', async (request, response, next) => {
  await createDbConnection();
  Blog.find({})
    .then((blogs) => {
      response.json(blogs);
    })
    .catch((error) => {
      next(error);
    })
    .finally(() => {
      mongoose.connection.close();
    });
});

blogsRouter.post('/', async (request, response, next) => {
  await createDbConnection();
  const body = request.body;
  const newBlog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  });
  newBlog
    .save()
    .then((savedBlog) => {
      response.json(savedBlog);
    })
    .catch((error) => {
      next(error);
    })
    .finally(() => {
      mongoose.connection.close();
    });
});

module.exports = blogsRouter;
