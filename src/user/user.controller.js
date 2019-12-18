const UserRepository = require('./user.repository');

exports.register = async (req, res) => {
  try {
    const savedUser = await UserRepository.saveUser(req.body);
    res.send(savedUser);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};
