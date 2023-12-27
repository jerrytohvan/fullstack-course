const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const helper = require('./test_helper');

const api = supertest(app);
const Blog = require('../models/blog');
const { createDbConnection } = require('../utils/dbClient');

beforeEach(async () => {
  await createDbConnection();
  await Blog.deleteMany({});

  const blogObjects = helper.initialBlogs.map((blog) => new Blog(blog));
  const promiseArray = blogObjects.map((blog) => blog.save());
  await Promise.all(promiseArray);
  mongoose.connection.close();
});

describe('/api/blogs', () => {
  test('blog list application returns the correct amount of blog posts in the JSON format', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  test('blog is added to database succesfully', async () => {
    await api
      .post('/api/blogs')
      .send(helper.newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const blogs = await helper.blogsInDb();
    expect(blogs).toHaveLength(helper.initialBlogs.length + 1);
  });

  test('blog post like is default to 1 if likes param is missing', async () => {
    await api
      .post('/api/blogs')
      .send({ ...helper.newBlog, likes: undefined })
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const blogs = await helper.blogsInDb();
    expect(blogs).toHaveLength(helper.initialBlogs.length + 1);
  });

  test('blog wont be added if title and url is missing', async () => {
    await api
      .post('/api/blogs')
      .send({ ...helper.newBlog, title: undefined, url: undefined })
      .expect(400);


    const blogs = await helper.blogsInDb();
    expect(blogs).toHaveLength(helper.initialBlogs.length);
  });
});

describe('/api/blogs/:id', () => {
  test('blog contains _id returned as id', async () => {
    const blogs = await helper.blogsInDb();

    const response = await api.get(`/api/blogs/${blogs[0].id}`);

    expect(response.body.id).toBeDefined();
  });
});

afterEach(async () => {
  await mongoose.connection.close();
});
