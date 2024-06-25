"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const whatsapp_1 = __importDefault(require("whatsapp"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const phoneNumberId = process.env.WA_PHONE_NUMBER_ID ? parseInt(process.env.WA_PHONE_NUMBER_ID, 10) : undefined;
if (!phoneNumberId) {
    throw new Error('WA_PHONE_NUMBER_ID is not defined or not a valid number');
}
const waClient = new whatsapp_1.default(phoneNumberId);
exports.default = waClient;
