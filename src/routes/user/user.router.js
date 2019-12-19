const express = require('express');
const UserController = require('./user.controller');

const router = express.Router();

// /users/
router.get('/', UserController.getAll);
router.post('/', UserController.register);
router.delete('/', UserController.delete);
router.put('/', UserController.update);
// /users/login
router.post('/login', UserController.login);

module.exports = router;
