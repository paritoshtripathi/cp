"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const errorHandler_1 = require("../utils/errorHandler");
const router = (0, express_1.Router)();
// Handle GET request for webhook verification
router.get('/', (req, res) => {
    const mode = req.query['hub.mode'];
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];
    if (token && token === '1234567890abcd') {
        res.status(200).send(challenge + '11');
    }
    else {
        res.status(403).send('Forbidden');
    }
});
// Handle POST request for webhook events
router.post('/', (req, res) => {
    try {
        const event = req.body;
        console.log('Received webhook event:', event);
        res.status(200).send('Webhook received');
    }
    catch (error) {
        (0, errorHandler_1.logErrorDetailsToFile)(error);
        const errorMessage = (0, errorHandler_1.getErrorMessage)(error);
        res.status(500).json({ status: 'error', error: errorMessage });
    }
});
exports.default = router;
