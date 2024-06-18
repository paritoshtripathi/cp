const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const config = require('../config');

exports.register = async (userData) => {
  const hashedPassword = await bcrypt.hash(userData.password, 8);
  const user = new User({ email: userData.email, password: hashedPassword });
  await user.save();
};

exports.authenticate = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error('User not found');
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error('Invalid password');
  }
  const token = jwt.sign({ id: user._id, email: user.email }, config.secret, {
    expiresIn: 86400 // expires in 24 hours
  });
  return token;
};
