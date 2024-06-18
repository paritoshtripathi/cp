const express = require('express');
const contactController = require('../controllers/contactController');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

router.post('/upload', authMiddleware, contactController.uploadContacts);

module.exports = router;
