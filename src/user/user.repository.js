require('./user.model');

const moongose = require('mongoose');

const User = moongose.model('User');

exports.saveUser = async (data) => {
  const user = new User(data);
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
  await User.updateOne({ username: data.username }, data, { runValidators: true });
};
