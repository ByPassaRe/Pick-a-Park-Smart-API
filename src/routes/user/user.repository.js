require('./user.model');

const moongose = require('mongoose');
const argon2 = require('argon2');

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
