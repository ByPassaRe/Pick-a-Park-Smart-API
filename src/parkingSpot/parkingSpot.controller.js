const ParkingSpotRepository = require('./parkingSpot.repository');

exports.register = async (req, res) => {
  try {
    const savedParkingSpot = await ParkingSpotRepository.saveParkingSpot(req.body);
    res.send(savedParkingSpot);
  } catch (err) {
    res.sendStatus(409);
  }
};

exports.getAll = async (req, res) => {
  res.send(await ParkingSpotRepository.getAll());
};

exports.delete = async (req, res) => {
  try {
    await ParkingSpotRepository.deleteParkingSpot(req.params.id);
    res.sendStatus(200);
  } catch (err) {
    res.sendStatus(404);
  }
};

exports.update = async (req, res) => {
  try {
    await ParkingSpotRepository.updateParkingSpot(req.params.id, req.body);
    res.sendStatus(200);
  } catch (err) {
    res.sendStatus(500);
  }
};

exports.getNearest = async (req, res) => {
  res.sendStatus(501);
};
