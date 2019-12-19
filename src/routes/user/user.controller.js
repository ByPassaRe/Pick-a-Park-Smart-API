const UserRepository = require('./user.repository');

exports.register = async (req, res) => {
  try {
    const savedUser = await UserRepository.saveUser(req.body);
    res.send(savedUser);
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
