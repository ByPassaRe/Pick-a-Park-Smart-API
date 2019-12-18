const UserRepository = require('./user.repository');

exports.register = async (req, res) => {
  try {
    const savedUser = await UserRepository.saveUser(req.body);
    res.send(savedUser);
  } catch (err) {
    res.sendStatus(500);
  }
};

exports.getAll = async (req, res) => {
  res.send(await UserRepository.getAll());
};
