require('./user.model');

const moongose = require('mongoose');

const User = moongose.model('User');

const saveUser = (data) => {
  const user = new User(data);
  return user.save();
};

module.exports = {
  saveUser,
};
