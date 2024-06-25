import WhatsApp from 'whatsapp';
import dotenv from 'dotenv';

dotenv.config();

const phoneNumberId = process.env.WA_PHONE_NUMBER_ID ? parseInt(process.env.WA_PHONE_NUMBER_ID, 10) : undefined;

if (!phoneNumberId) {
    throw new Error('WA_PHONE_NUMBER_ID is not defined or not a valid number');
}

const waClient = new WhatsApp(phoneNumberId);

export default waClient;
