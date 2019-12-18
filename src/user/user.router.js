const express = require('express');
const UserController = require('./user.controller');

const router = express.Router();

router.get('/', UserController.getAll);
router.post('/', UserController.register);
router.delete('/:username', UserController.delete);

module.exports = router;
