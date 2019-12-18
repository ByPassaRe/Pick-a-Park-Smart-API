require('./user.model');

const moongose = require('mongoose');

const User = moongose.model('User');

const saveUser = (data) => {
  const user = new User(data);
  return user.save();
};

const getAll = () => {
  const users = User.find();
  return users;
};


module.exports = {
  saveUser,
  getAll,
};
