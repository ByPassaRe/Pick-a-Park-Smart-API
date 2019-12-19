const express = require('express');
const ParkingSpotController = require('./parkingSpot.controller');

const router = express.Router();

router.get('/', ParkingSpotController.getAll);
router.post('/', ParkingSpotController.register);
router.delete('/:id', ParkingSpotController.delete);
router.put('/:id', ParkingSpotController.update);
router.put('/:id/presence', ParkingSpotController.setPresence);
router.get('/nearest', ParkingSpotController.getNearest);
router.put('/:id/hourlyPrice', ParkingSpotController.setHourlyPrice);

module.exports = router;
