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
  balance: {
    type: Number,
    default: 0.0,
  },
});

module.exports = mongoose.model('User', UserSchema);
