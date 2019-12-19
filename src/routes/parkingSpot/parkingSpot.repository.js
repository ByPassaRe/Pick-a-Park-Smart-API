require('./parkingSpot.model');

const moongose = require('mongoose');

const ParkingSpot = moongose.model('ParkingSpot');

exports.saveParkingSpot = async (data) => {
  const parkingSpot = new ParkingSpot(data);
  let savedParkingSpot;
  try {
    savedParkingSpot = await parkingSpot.save();
  } catch (err) {
    throw new Error('Error while saving parking spot');
  }
  return savedParkingSpot;
};

exports.getAll = async () => {
  const parkingSpots = await ParkingSpot.find();
  return parkingSpots;
};

exports.deleteParkingSpot = async (id) => {
  const result = await ParkingSpot.findByIdAndDelete(id);
  if (result.deletedCount === 0) {
    throw new Error('ParkingSpot not found');
  }
};

exports.updateParkingSpot = async (id, data) => {
  await ParkingSpot.findByIdAndUpdate(id, data);
};
