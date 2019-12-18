const express = require('express');
const UserController = require('./user.controller');

const router = express.Router();

router.get('/', UserController.getAll);
router.post('/', UserController.register);

module.exports = router;
