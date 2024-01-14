const blogsRouter = require('express').Router();

const Blog = require('../models/blog');
const middleware = require('../utils/middleware');

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

blogsRouter.post('/', middleware.userExtractor, async (request, response) => {
  const { title, author, url, likes = 0 } = request.body;
  const user = request.user;
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

blogsRouter.delete(
  '/:id',
  middleware.userExtractor,
  async (request, response) => {
    const { id } = request.params;
    const user = request.user;

    const blog = await Blog.findById(id);

    if (!blog) {
      return response.status(404).json({ error: 'blog not found' });
    }

    if (`${blog.user}` !== user.id) {
      return response
        .status(401)
        .json({ error: 'access limited to delete blog' });
    }
    await Blog.findByIdAndDelete(id);
    response.status(204).end();
  }
);

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
