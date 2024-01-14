const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const helper = require('./test_helper');

const api = supertest(app);
const User = require('../models/user');

beforeEach(async () => {
  await User.deleteMany({});
  await User.insertMany(helper.initialUser);
});

describe('GET /api/user', () => {
  test('succesfully retrieved all created users', async () => {
    await api
      .get('/api/users')
      .expect(200)
      .expect('Content-Type', /application\/json/);

    const users = await helper.usersInDb();
    expect(users).toHaveLength(helper.initialUser.length);
  });
});

describe('POST /api/user', () => {
  test('succesfully created new unique user', async () => {
    const newUserObject = {
      username: 'testunique',
      password: 'unique',
      name: 'unique'
    };
    await api.post('/api/users').send(newUserObject).expect(201);

    const users = await helper.usersInDb();
    expect(users).toHaveLength(helper.initialUser.length + 1);
  });

  test('creating new user with existing username will fail', async () => {
    await api.post('/api/users').send(helper.initialUser).expect(400);

    const users = await helper.usersInDb();
    expect(users).toHaveLength(helper.initialUser.length);
  });

  test('creating new user with less than 3 characters password will fail', async () => {
    await api.post('/api/users').send({ ...helper.initialUser, password: 'aa' }).expect(400);

    const users = await helper.usersInDb();
    expect(users).toHaveLength(helper.initialUser.length);
  });

});

afterAll(async () => {
  await mongoose.connection.close();
});
