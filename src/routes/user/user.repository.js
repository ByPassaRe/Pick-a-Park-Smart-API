require('./user.model');
const jwt = require('jsonwebtoken');
const moongose = require('mongoose');
const argon2 = require('argon2');
const key = require('../../utils/key');

const User = moongose.model('User');

exports.saveUser = async (data) => {
  const user = new User(data);

  try {
    user.password = await argon2.hash(user.password);
  } catch (err) {
    throw new Error('Could not hash user password');
  }

  let savedUser;
  try {
    savedUser = await user.save();
  } catch (err) {
    throw new Error('Username with same username or email already exists');
  }
  return savedUser;
};

exports.getAll = async () => {
  const users = await User.find();
  return users;
};

exports.deleteUser = async (username) => {
  const result = await User.deleteOne({ username });
  if (result.deletedCount === 0) {
    throw new Error('User not found');
  }
};

exports.updateUser = async (data) => {
  let result;

  try {
    result = await User.updateOne({ username: data.username }, data, { runValidators: true });
  } catch (err) {
    throw new Error('Invalid data provided');
  }

  if (result.n === 0) {
    throw new Error('User not found');
  }
};


exports.generateAuthToken = async (user) => {
  const token = jwt.sign(
    {
      username: user.username,
    },
    key.TOKEN_KEY,
    {
      expiresIn: '24h',
    },
  );
  return token;
};

exports.getUserByUsername = async (username) => {
  const user = await User.findOne({ username });
  return user;
};

exports.isPasswordMatch = async (hashedPassword, plainPassword) => {
  const isPasswordMatch = await argon2.verify(hashedPassword, plainPassword);
  return isPasswordMatch;
};
