const mongoose = require('mongoose');

const ParkingSpotSchema = new mongoose.Schema({
  presence: Boolean,
  latitude: Number,
  longitude: Number,
  handicapped: Boolean,
});

module.exports = mongoose.model('ParkingSpot', ParkingSpotSchema);
