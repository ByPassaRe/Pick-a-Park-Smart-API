const mongoose = require('mongoose');

const ParkingSpotSchema = new mongoose.Schema({
  presence: {
    type: Boolean,
    required: true,
  },
  latitude: {
    type: Number,
    required: true,
    min: -90,
    max: 90,
  },
  longitude: {
    type: Number,
    required: true,
    min: -180,
    max: 180,
  },
  handicapped: {
    type: Boolean,
    required: true,
  },
});

module.exports = mongoose.model('ParkingSpot', ParkingSpotSchema);
