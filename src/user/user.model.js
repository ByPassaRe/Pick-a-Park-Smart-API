const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  username: String,
  email: String,
  password: String,
  balance: Number,
});

module.exports = mongoose.model('User', UserSchema);
