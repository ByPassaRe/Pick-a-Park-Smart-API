const mongoose = require('mongoose');

const ParkingSpotSchema = new mongoose.Schema({
  presence: Boolean,
  latitude: Number,
  longitude: Number,
  hadicapped: Boolean,
});

module.exports = mongoose.model('ParkingSpot', ParkingSpotSchema);
