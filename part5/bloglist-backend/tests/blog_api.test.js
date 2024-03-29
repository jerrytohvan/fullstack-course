const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const helper = require('./test_helper');

const api = supertest(app);
const Blog = require('../models/blog');
const User = require('../models/user');
const bcrypt = require('bcrypt');

beforeEach(async () => {
  await Blog.deleteMany({});
  await User.deleteMany({});

  const mockUser = helper.initialUser[0];
  const user = new User({
    ...mockUser,
    passwordHash: await bcrypt.hash(mockUser.password, 10),
  });
  await user.save();
  await Blog.insertMany(helper.initialBlogs.map((blog) => ({ ...blog, user: user.id })));
});

describe('GET /api/blogs', () => {
  test('blog list application returns the correct amount of blog posts in the JSON format', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });
});

describe('GET /api/blogs/:id', () => {
  test('blog contains _id returned as id', async () => {
    const blogs = await helper.blogsInDb();

    const response = await api.get(`/api/blogs/${blogs[0].id}`);

    expect(response.body.id).toBeDefined();
  });
});

describe('POST /api/blogs', () => {
  test('blog is added to database succesfully', async () => {
    const loginToken = await api.post('/api/login').send({
      username: helper.initialUser[0].username,
      password: helper.initialUser[0].password,
    });

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${loginToken.body.token}`)
      .send(helper.newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const blogs = await helper.blogsInDb();
    expect(blogs).toHaveLength(helper.initialBlogs.length + 1);
  });

  test('blog post like is default to 1 if likes param is missing', async () => {
    const loginToken = await api.post('/api/login').send({
      username: helper.initialUser[0].username,
      password: helper.initialUser[0].password,
    });

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${loginToken.body.token}`)
      .send({
        ...helper.newBlog,
        likes: undefined,
      })
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const blogs = await helper.blogsInDb();
    expect(blogs).toHaveLength(helper.initialBlogs.length + 1);
  });

  test('blog wont be added if title and url is missing', async () => {
    const loginToken = await api.post('/api/login').send({
      username: helper.initialUser[0].username,
      password: helper.initialUser[0].password,
    });

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${loginToken.body.token}`)
      .send({
        ...helper.newBlog,
        title: undefined,
        url: undefined,
      })
      .expect(400);

    const blogs = await helper.blogsInDb();
    expect(blogs).toHaveLength(helper.initialBlogs.length);
  });
});

describe('DELETE /api/blogs/:id', () => {
  test('succesfully deleted existing blog', async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToDelete = blogsAtStart[0];
    const loginToken = await api.post('/api/login').send({
      username: helper.initialUser[0].username,
      password: helper.initialUser[0].password,
    });

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', `Bearer ${loginToken.body.token}`)
      .expect(204);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1);

    const titles = blogsAtEnd.map((r) => r.title);
    expect(titles).not.toContain(blogToDelete.title);
  });
});

describe('PUT /api/blogs/:id', () => {
  test('succesfully update likes of an existing blog', async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToUpdate = blogsAtStart[0];
    const updatedBlog = await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send({ likes: blogToUpdate.likes + 1 });
    expect(updatedBlog.body.likes).toBe(blogToUpdate.likes + 1);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
