"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const whatsappClient_1 = __importDefault(require("../utils/whatsappClient"));
const errorHandler_1 = require("../utils/errorHandler");
const router = (0, express_1.Router)();
router.post('/', (req, result) => __awaiter(void 0, void 0, void 0, function* () {
    const { recipient_number, message_body } = req.body;
    // try {
    //     const sentTextMessage = await waClient.messages.text({ body: message_body }, recipient_number);
    //     logErrorDetailsToFile(sentTextMessage)
    //     res.json({ status: 'success', data: sentTextMessage.rawResponse() });
    // } catch (error: unknown) {
    //     logErrorDetailsToFile(error); // Log detailed error information to a file
    //     const errorMessage = getErrorMessage(error); // Get a simplified error message
    //     res.status(500).json({ status: 'error', error: errorMessage }); // Send simplified error message to client
    // }
    try {
        const sent_text_message = whatsappClient_1.default.messages.text({ "body": message_body }, recipient_number);
        yield sent_text_message.then((res) => {
            (0, errorHandler_1.logErrorDetailsToFile)(res.rawResponse());
            result.status(200).json({ status: "success", data: res.statusCode });
        });
    }
    catch (e) {
        console.log(JSON.stringify(e));
        (0, errorHandler_1.logErrorDetailsToFile)(e);
    }
}));
exports.default = router;
