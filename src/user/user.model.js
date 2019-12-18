const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  username: {
    type: String,
    unique: true,
    index: true,
  },
  email: {
    type: String,
    unique: true,
    index: true,
  },
  password: String,
  balance: Number,
});

module.exports = mongoose.model('User', UserSchema);
