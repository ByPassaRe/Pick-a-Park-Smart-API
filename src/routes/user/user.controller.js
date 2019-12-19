const UserRepository = require('./user.repository');
const logger = require('../../utils/logger');

exports.register = async (req, res) => {
  try {
    const savedUser = await UserRepository.saveUser(req.body);
    res.status(201).send(savedUser);
  } catch (err) {
    res.sendStatus(409);
  }
};

exports.getAll = async (req, res) => {
  res.send(await UserRepository.getAll());
};

exports.delete = async (req, res) => {
  try {
    await UserRepository.deleteUser(req.body.username);
    res.sendStatus(200);
  } catch (err) {
    res.sendStatus(404);
  }
};

exports.update = async (req, res) => {
  try {
    await UserRepository.updateUser(req.body);
    return res.sendStatus(200);
  } catch (err) {
    if (err.message === 'Invalid data provided') {
      return res.sendStatus(400);
    } if (err.message === 'User not found') {
      return res.sendStatus(404);
    }
    return res.sendStatus(500);
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    // Get user
    const user = await UserRepository.getUserByUsername(username);
    if (!user) {
      logger.info(`${username} login: Failed!- Wrong Username`);
      return res.status(401).send({ error: 'Username is not found!' });
    }
    // Check password
    const isPasswordCorrect = await UserRepository.isPasswordMatch(user.password, password);
    if (!isPasswordCorrect) {
      logger.info(`${username} login: Failed! - Wrong Password`);
      return res.status(401).send({ error: 'Password does not match!' });
    }
    // Token generation
    const token = await UserRepository.generateAuthToken(user);
    logger.info(`${username} login: Success!`);
    return res.send({ user, token });
  } catch (error) {
    return res.status(400).send(error);
  }
};
