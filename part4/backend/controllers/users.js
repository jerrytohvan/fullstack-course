const userRouter = require('express').Router();

const User = require('../models/user');
const bcrypt = require('bcrypt');

userRouter.post('/', async (request, response) => {
  const { username, password, name } = request.body;
  if(!password) throw new Error('Password is missing');
  if(password.length < 3) throw new Error('Password must be at least 3 characters');

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const newUser = new User({
    username,
    name,
    passwordHash
  });
  await newUser
    .save();

  response.status(201).json(newUser);
});

userRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs', { url: 1, title: 1, author: 1 });
  response.status(200).json(users);
});


module.exports = userRouter;
