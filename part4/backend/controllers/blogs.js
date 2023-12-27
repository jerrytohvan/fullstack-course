const blogsRouter = require('express').Router();

const { createDbConnection } = require('../utils/dbClient');
const Blog = require('../models/blog');
const mongoose = require('mongoose');

blogsRouter.get('/', async (request, response) => {
  await createDbConnection();
  const blogs = await  Blog.find({}).finally(() => {
    mongoose.connection.close();
  });

  response.json(blogs);
});

blogsRouter.get('/:id', async (request, response) => {
  await createDbConnection();
  const blogs = await Blog.findById(request.params.id).finally(() => {
    mongoose.connection.close();
  });

  if(blogs){
    response.json(blogs);
  }
  response.status(404).end();
});

blogsRouter.post('/', async (request, response) => {
  await createDbConnection();
  const body = request.body;
  const newBlog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
  });
  await newBlog
    .save()
    .finally(() => {
      mongoose.connection.close();
    });
  response.status(201).json(newBlog);
});

module.exports = blogsRouter;
