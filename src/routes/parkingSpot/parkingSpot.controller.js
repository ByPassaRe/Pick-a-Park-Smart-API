const geolib = require('geolib');

const ParkingSpotRepository = require('./parkingSpot.repository');

exports.register = async (req, res) => {
  try {
    const savedParkingSpot = await ParkingSpotRepository.saveParkingSpot(req.body);
    res.status(201).send(savedParkingSpot);
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
    const updated = await ParkingSpotRepository.updateParkingSpot(req.params.id, req.body);
    if (updated) {
      res.sendStatus(200);
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    res.sendStatus(500);
  }
};

exports.getNearest = async (req, res) => {
  const targetPosition = {
    latitude: req.body.latitude,
    longitude: req.body.longitude,
  };

  const parkingSpots = await ParkingSpotRepository.getAll();

  const nearestParkingSpot = parkingSpots.map((parkingSpot) => {
    const parkingSpotLocation = {
      latitude: parkingSpot.latitude,
      longitude: parkingSpot.longitude,
    };

    const distance = geolib.getDistance(targetPosition, parkingSpotLocation);

    return { distance, parkingSpot };
  }).reduce((nearest, current) => (nearest.distance < current.distance ? nearest : current));


  return res.send(nearestParkingSpot);
};

exports.setPresence = async (req, res) => {
  const updateRequest = {
    presence: req.body.presence,
  };

  try {
    await ParkingSpotRepository.updateParkingSpot(req.params.id, updateRequest);
    res.sendStatus(200);
  } catch (err) {
    res.sendStatus(500);
  }
};

exports.setHourlyPrice = async (req, res) => {
  const updateRequest = {
    hourlyPrice: req.body.hourlyPrice,
  };

  try {
    await ParkingSpotRepository.updateParkingSpot(req.params.id, updateRequest);
    res.sendStatus(200);
  } catch (err) {
    res.sendStatus(500);
  }
};
