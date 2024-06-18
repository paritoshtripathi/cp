const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET || 'your_jwt_secret';
const authenticateToken = require('../middleware/auth');

router.post('/register', (req, res) => {
  // Register user logic here
  const token = jwt.sign({ username: req.body.username }, secret);
  res.json({ token });
});

router.post('/login', (req, res) => {
  // Authenticate user logic here
  const token = jwt.sign({ username: req.body.username }, secret);
  res.json({ token });
});

router.get('/profile', authenticateToken, (req, res) => {
  res.json({ username: req.user.username });
});

module.exports = router;
