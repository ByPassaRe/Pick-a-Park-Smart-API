const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    unique: true,
    index: true,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    index: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  balance: {
    type: Number,
    default: 0.0,
  },
  role: {
    type: String,
    enum: ['DRIVER', 'MUNICIPALLY', 'MUNICIPALLY_POLICE', 'PARKING_COMPANY'],
    default: 'DRIVER',
  },
});

module.exports = mongoose.model('User', UserSchema);
