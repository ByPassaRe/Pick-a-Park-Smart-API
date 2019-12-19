const express = require('express');
const ParkingSpotController = require('./parkingSpot.controller');

const router = express.Router();

router.get('/', ParkingSpotController.getAll);
router.post('/', ParkingSpotController.register);
router.delete('/:id', ParkingSpotController.delete);
router.put('/:id', ParkingSpotController.update);

module.exports = router;
