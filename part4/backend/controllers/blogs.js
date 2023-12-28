const blogsRouter = require('express').Router();

const Blog = require('../models/blog');
const User = require('../models/user');

const jwt = require('jsonwebtoken');

const config = require('../utils/config');

const getDecodedUserFromToken = (token) => {
  const decodedUser = jwt.verify(token, config.SECRET);
  if (!decodedUser.id) {
    return false;
  }
  return decodedUser;
};

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 });

  response.json(blogs);
});

blogsRouter.get('/:id', async (request, response) => {
  const blogs = await Blog.findById(request.params.id);

  if (blogs) {
    response.json(blogs);
  }
  response.status(404).end();
});

blogsRouter.post('/', async (request, response) => {
  const { title, author, url, likes = 0, token } = request.body;
  const decodedUser = getDecodedUserFromToken(token);
  if (!decodedUser) {
    return response.status(401).json({ error: 'token invalid' });
  }

  const user = await User.findById(decodedUser.id);

  const newBlog = new Blog({
    title,
    author,
    url,
    likes,
    user: user.id,
  });
  await newBlog.save();

  user.blogs = user.blogs.concat(newBlog.id);
  await user.save();

  response.status(201).json(newBlog);
});

blogsRouter.delete('/:id', async (request, response) => {
  const { id } = request.params;
  const { token } = request.body;

  const decodedUser = getDecodedUserFromToken(token);
  if (!decodedUser) {
    return response.status(401).json({ error: 'token invalid' });
  }

  const blog = await Blog.findById(id);

  if (!blog) {
    return response.status(404).json({ error: 'blog not found' });
  }

  if (`${blog.user}` !== decodedUser.id) {
    return response.status(401).json({ error: 'access limited to delete blog' });
  }
  await Blog.findByIdAndDelete(id);
  response.status(204).end();
});

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body;
  const blog = {
    likes: body.likes || 0,
  };
  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
    new: true,
  });
  response.json(updatedBlog);
});

module.exports = blogsRouter;
