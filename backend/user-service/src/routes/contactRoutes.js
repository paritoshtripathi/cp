const express = require('express');
const contactController = require('../controllers/contactController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/upload', authMiddleware, contactController.uploadContacts);

module.exports = router;
