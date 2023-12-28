const userRouter = require('express').Router();

const User = require('../models/user');
const bcrypt = require('bcrypt');

userRouter.post('/', async (request, response) => {
  const body = request.body;
  if(!body.password) throw new Error('Password is missing');

  const saltRounds = 10;
  const passwordHash = bcrypt.hash(body.password, saltRounds);
  const newUser = new User({
    username: body.username,
    password: passwordHash,
    name: body.name
  });
  await newUser
    .save();

  response.status(201).json(newUser);
});

userRouter.get('/', async (request, response) => {
  const users = await User.find({});
  response.status(200).json(users);
});


module.exports = userRouter;
