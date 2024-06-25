"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const sendMessage_1 = __importDefault(require("./routes/sendMessage"));
const webhook_1 = __importDefault(require("./routes/webhook"));
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
app.use(body_parser_1.default.json());
app.use('/sendMessage', sendMessage_1.default);
app.use('/webhook', webhook_1.default);
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
