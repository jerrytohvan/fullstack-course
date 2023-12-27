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
