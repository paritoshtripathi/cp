const express = require('express');
const bodyParser = require('body-parser');
const WhatsAppCloudAPI = require('whatsappcloudapi_wrapper');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());

const whatsapp = new WhatsAppCloudAPI({
    accessToken: process.env.WHATSAPP_API_TOKEN,
    senderPhoneNumberId: process.env.WHATSAPP_PHONE_NUMBER_ID,
});

app.post('/send_message', async (req, res) => {
    const { to, content } = req.body;
    try {
        const response = await whatsapp.sendText({
            recipientPhone: to,
            message: content,
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/send_otp', async (req, res) => {
    const { to, otp } = req.body;
    const content = `Your OTP is ${otp}`;
    try {
        const response = await whatsapp.sendText({
            recipientPhone: to,
            message: content,
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

const PORT = process.env.PORT || 8082;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
