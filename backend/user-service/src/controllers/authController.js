const authService = require('../services/authService');

exports.register = async (req, res) => {
  try {
    await authService.register(req.body);
    res.status(200).send({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const token = await authService.authenticate(req.body.email, req.body.password);
    res.status(200).send({ token });
  } catch (error) {
    res.status(401).send({ message: error.message });
  }
};
